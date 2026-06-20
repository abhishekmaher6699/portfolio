import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags: string[];
  readingTime: string;
  draft: boolean;
  coAuthors?: string[];
};

export type PostDetail = PostSummary & {
  content: string;
};

function estimateReadingTime(text: string) {
  const words = String(text).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

export async function getPosts(limit?: number): Promise<PostSummary[]> {
  try {
    const postsDir = path.join(process.cwd(), "content", "posts");
    const files = await fs.readdir(postsDir);
    const posts: PostSummary[] = [];

    for (const file of files) {
      if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
      const full = path.join(postsDir, file);
      const raw = await fs.readFile(full, "utf-8");
      const { data, content } = matter(raw);

      const slug =
        data.slug ||
        file
          .replace(/\.mdx?$|^\d+-|\s+/g, "")
          .replace(/[^a-z0-9-]/gi, "-")
          .toLowerCase();

      posts.push({
        id: data.id || slug,
        slug,
        title: data.title || slug,
        summary: data.summary || "",
        image: data.image || "",
        publishedAt: data.publishedAt || data.date || undefined,
        updatedAt: data.updatedAt || undefined,
        tags: Array.isArray(data.tags)
          ? data.tags
          : data.tags
            ? String(data.tags)
                .split(",")
                .map((t: string) => t.trim())
            : [],
        readingTime: data.readingTime || estimateReadingTime(content),
        draft: Boolean(data.draft),
        coAuthors: Array.isArray(data.coAuthors) ? data.coAuthors : undefined,
      });
    }

    // Sort by publishedAt desc when available
    posts.sort((a, b) => {
      const ta = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const tb = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return tb - ta;
    });

    return limit ? posts.slice(0, limit) : posts;
  } catch (err) {
    console.error("Error reading local posts:", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    const postsDir = path.join(process.cwd(), "content", "posts");
    const files = await fs.readdir(postsDir);

    for (const file of files) {
      if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
      const full = path.join(postsDir, file);
      const raw = await fs.readFile(full, "utf-8");
      const { data, content } = matter(raw);

      const fileSlug =
        data.slug ||
        file
          .replace(/\.mdx?$|^\d+-|\s+/g, "")
          .replace(/[^a-z0-9-]/gi, "-")
          .toLowerCase();
      if (fileSlug === slug) {
        return {
          id: data.id || fileSlug,
          slug: fileSlug,
          title: data.title || fileSlug,
          summary: data.summary || "",
          image: data.image || "",
          publishedAt: data.publishedAt || data.date || undefined,
          updatedAt: data.updatedAt || undefined,
          tags: Array.isArray(data.tags)
            ? data.tags
            : data.tags
              ? String(data.tags)
                  .split(",")
                  .map((t: string) => t.trim())
              : [],
          readingTime: data.readingTime || estimateReadingTime(content),
          draft: Boolean(data.draft),
          coAuthors: Array.isArray(data.coAuthors) ? data.coAuthors : undefined,
          content,
        };
      }
    }

    return null;
  } catch (err) {
    console.error("Error reading local post:", err);
    return null;
  }
}
