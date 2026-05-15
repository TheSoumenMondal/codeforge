"use client";

import { useRouter } from "next/navigation";
import type { TArticle } from "@/types/article";

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
};

const estimateReadTime = (content: string) => {
  const words = content?.trim().split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / 100));
};

const ArticleCard = ({ data }: { data: TArticle }) => {
  const router = useRouter();
  const readTime = estimateReadTime(data.content);
  const authorName = data.author?.name ?? "Unknown Author";

  return (
    <button
      type="button"
      className="group flex gap-4 border-b border-border py-6 cursor-pointer w-full text-left"
      onClick={() => router.push(`/articles/${data.slug}`)}
    >
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          {data.author?.avatar_url ? (
            // biome-ignore lint/performance/noImgElement: user avatar, hostname varies
            <img
              src={data.author.avatar_url}
              alt={authorName}
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="h-6 w-6 rounded-full bg-muted" />
          )}

          <span className="truncate">{authorName}</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-semibold leading-snug line-clamp-2 group-hover:opacity-90 transition-opacity">
            {data.title}
          </h2>

          {data.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {data.excerpt}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
          <span>{formatDate(data.published_at ?? data.created_at)}</span>
          <span>·</span>
          <span>{readTime} min read</span>
          <span>
            {data.views}
            {data.views === 1 ? " view" : " views"}
          </span>
        </div>
      </div>

      {data.cover_image && (
        <div className="relative hidden sm:block w-28 h-28 md:w-36 md:h-36 shrink-0 overflow-hidden rounded-md">
          {/* biome-ignore lint/performance/noImgElement: cover URL is user-provided, hostname is unknown */}
          <img
            src={data.cover_image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </button>
  );
};

export default ArticleCard;
