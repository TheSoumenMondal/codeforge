"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "@/api/services/article.service";
import { ScrollArea } from "@/components/ui/scroll-area";
import ArticleCard from "./ArticleCard";

const ArticleCardSkeleton = () => (
  <div className="border-b border-border py-5 animate-pulse">
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-3">
        <div className="h-4 w-4/5 rounded bg-muted" />
        <div className="h-4 w-3/5 rounded bg-muted" />

        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-2/3 rounded bg-muted" />

        <div className="flex items-center gap-3 pt-1">
          <div className="h-3 w-16 rounded bg-muted" />
          <div className="h-3 w-12 rounded bg-muted" />
          <div className="h-3 w-14 rounded bg-muted" />
        </div>
      </div>

      <div className="h-24 w-32 rounded-md bg-muted shrink-0" />
    </div>
  </div>
);

const ArticleLeft = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: getAllArticles,
  });

  return (
    <ScrollArea className="h-full max-h-[calc(100vh-57px)] w-full">
      <div className="px-6">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}

        {error && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-muted-foreground">
            <p className="text-sm font-medium">Failed to load articles</p>
            <p className="text-xs">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        )}

        <div className="flex flex-col">
          {data?.map((article) => (
            <ArticleCard
              data={article}
              key={article.id}
            />
          ))}
        </div>

        {!isLoading && !error && data?.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No articles yet.
          </p>
        )}
      </div>
    </ScrollArea>
  );
};

export default ArticleLeft;
