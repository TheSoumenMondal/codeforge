"use client";

import { TagIcon, UserPlusIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { getTopAuthors } from "@/api/services/article.service";
import { getAllPosts } from "@/api/services/post.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeAdditional } from "@/components/ui/badge-2";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const AuthorRowSkeleton = () => (
  <div className="flex items-center gap-3 px-1 py-2">
    <Skeleton className="size-9 rounded-full shrink-0" />
    <div className="flex flex-col gap-1.5 flex-1">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-2.5 w-20" />
    </div>
  </div>
);

const ExploreRight = () => {
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    staleTime: 60_000,
  });

  const { data: authors, isLoading: authorsLoading } = useQuery({
    queryKey: ["top-authors"],
    queryFn: getTopAuthors,
  });

  const trendingTags = Array.from(
    (posts ?? [])
      .flatMap((post) => post.tags ?? [])
      .reduce((acc, tag) => {
        acc.set(tag, (acc.get(tag) ?? 0) + 1);
        return acc;
      }, new Map<string, number>()),
  )
    .sort((tagA, tagB) => tagB[1] - tagA[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  return (
    <ScrollArea className="h-[calc(100vh-57px)]">
      <div className="flex flex-col gap-6 px-4 py-5">
        <section>
          <p className="font-instrumental-serif text-base font-semibold tracking-wide mb-3">
            Trending Topics
          </p>
          {trendingTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <BadgeAdditional
                  key={tag}
                  variant="warning"
                  appearance="outline"
                >
                  <TagIcon />
                  {tag}
                </BadgeAdditional>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {[
                "#interview",
                "#general",
                "#problem",
                "#discussion",
                "#ask",
              ].map((tag) => (
                <BadgeAdditional
                  key={tag}
                  variant="warning"
                  appearance="outline"
                >
                  <TagIcon />
                  {tag}
                </BadgeAdditional>
              ))}
            </div>
          )}
        </section>

        <Separator />

        <section>
          <p className="font-instrumental-serif text-base font-semibold tracking-wide mb-3">
            Who to Follow
          </p>

          <div className="flex flex-col gap-1">
            {authorsLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <AuthorRowSkeleton key={idx} />
                ))
              : (authors ?? []).slice(0, 6).map((author) => {
                  const initials = author.name
                    .split(" ")
                    .filter(Boolean)
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <Card
                      key={author.id}
                      className="mb-2 last:mb-0 py-3"
                    >
                      <CardContent className="flex items-center justify-between gap-3 py-0 px-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar className="size-9 shrink-0">
                            <AvatarImage
                              src={author.avatar_url}
                              alt={author.name}
                            />
                            <AvatarFallback className="text-xs font-semibold">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold truncate leading-tight">
                              {author.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {author.article_count}{" "}
                              {author.article_count === 1
                                ? "article"
                                : "articles"}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`Follow ${author.name}`}
                        >
                          <UserPlusIcon
                            size={18}
                            weight="duotone"
                          />
                        </button>
                      </CardContent>
                    </Card>
                  );
                })}
          </div>
        </section>
      </div>
    </ScrollArea>
  );
};

export default ExploreRight;
