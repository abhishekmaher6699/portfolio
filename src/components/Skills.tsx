import data from "@/data/skills.json";
import { skillsSchema } from "@/lib/schemas";
import Icon from "@/components/Icon";

const skillIcons: Record<string, string> = {
  "AI Agents & LangChain": "bot",
  "RAG & LLMs": "sparkles",
  "Computer Vision (MTCNN)": "scaneye",
  "MLOps (MLflow, DVC)": "activity",
  Python: "python",
  SQL: "sql",
  JavaScript: "javascript",
  "React.js": "react",
  "Express.js": "expressjs",
  Django: "django",
  PostgreSQL: "postgresql",
  Supabase: "supabase",
  Github: "github",
  "GitHub Actions": "githubactions",
  Docker: "docker",
  Render: "globe",
  Vercel: "vercel",
};

export default function Skills() {
  const categories = skillsSchema.parse(data).categories;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="title text-2xl sm:text-3xl">skills</h2>
      <div className="border-border border-t">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="border-border grid items-start gap-y-2 border-b py-4 last:border-none sm:grid-cols-[10rem_1fr]"
          >
            {/* Category Name & Number */}
            <div className="text-muted-foreground flex items-center gap-2 font-mono text-sm sm:pl-2">
              <span
                className="text-muted-foreground/40 select-none"
                aria-hidden="true"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              {category.name}
            </div>

            {/* List of Skills */}
            <ul className="flex flex-wrap gap-1.5 sm:px-4">
              {category.skills.map((skill) => (
                <li key={skill} className="flex">
                  <span className="border-border bg-secondary/50 hover:bg-secondary/80 text-foreground flex cursor-default items-center rounded-md border px-2 py-0.5 font-mono text-xs transition-colors">
                    {skillIcons[skill] && (
                      <Icon
                        name={skillIcons[skill]}
                        className="text-muted-foreground/80 mr-1.5 size-3.5 shrink-0"
                      />
                    )}
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
