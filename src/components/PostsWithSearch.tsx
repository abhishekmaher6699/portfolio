"use client";

import { PostSummary } from "@/lib/posts";
import { ArrowUpDown, Delete } from "lucide-react";
import { useState } from "react";
import Posts from "./Posts";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";

interface Props {
  posts: PostSummary[];
}

type SortOption = "newest" | "oldest" | "title";

export default function PostsWithSearch({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [showDrafts, setShowDrafts] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filtered = posts
    .filter((post) => {
      // Filter out drafts if toggle is off
      if (!showDrafts && post.draft) {
        return false;
      }

      // Search filter: split into individual lowercase words/terms
      const haystack = [post.title, post.summary, ...(post.tags || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
      return terms.every((term) => haystack.includes(term));
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest": {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        }
        case "oldest": {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateA - dateB;
        }
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const resetFilter = () => setQuery("");

  const draftCount = posts.filter((post) => post.draft).length;

  return (
    <div className="flex flex-col gap-12">
      <div className="space-y-4">
        {/* Search row */}
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button
            size="sm"
            variant="secondary"
            onClick={resetFilter}
            disabled={query.length === 0}
          >
            Clear
            <Delete className="ml-2 size-4" />
          </Button>
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Draft toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              id="show-drafts"
              checked={showDrafts}
              onCheckedChange={setShowDrafts}
              disabled={draftCount === 0}
            />
            <Label
              htmlFor="show-drafts"
              className={`text-sm whitespace-nowrap ${
                draftCount === 0 ? "text-muted-foreground" : "cursor-pointer"
              }`}
            >
              Show drafts ({draftCount})
            </Label>
          </div>

          {/* Sort control */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="text-muted-foreground h-4 w-4" />
            <Label className="text-muted-foreground text-sm">Sort:</Label>
            <Select
              value={sortBy}
              onValueChange={(value: SortOption) => setSortBy(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="title">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <Posts posts={filtered} />
      ) : (
        <div className="border-border border-muted-foreground/20 flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
          <p className="text-muted-foreground text-sm">
            No posts found matching &ldquo;{query}&rdquo;
          </p>
          <Button
            variant="link"
            onClick={resetFilter}
            className="mt-2 text-xs font-semibold"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}
