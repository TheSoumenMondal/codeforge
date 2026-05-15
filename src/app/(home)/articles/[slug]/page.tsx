"use client";

import { CircleNotchIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { getArticleBySlug } from "@/api/services/article.service";
import MarkdownRenderer from "@/components/features/article/MarkdownRenderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const estimateReadTime = (content: string) =>
  Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));

const ArticlePage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = React.use(params);

  const {
    data: article,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => getArticleBySlug(slug),
  });

  if (isPending) {
    return (
      <div className="flex h-[calc(100vh-57px)] items-center justify-center">
        <CircleNotchIcon className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="flex h-[calc(100vh-57px)] flex-col items-center justify-center gap-3 text-muted-foreground">
        <p className="text-lg font-medium">Article not found</p>
        <Link
          href="/articles"
          className="text-sm text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          ← Back to articles
        </Link>
      </div>
    );
  }

  const readTime = estimateReadTime(article.content);
  const authorName = article.author?.name ?? "Unknown Author";
  const publishDate = article.published_at ?? article.created_at;

  return (
    <ScrollArea className="h-[calc(100vh-57px)]">
      <article className="max-w-3xl mx-auto px-6 py-10">
        {/* Cover image */}
        {article.cover_image && (
          // biome-ignore lint/performance/noImgElement: cover image URL is author-provided
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full rounded-2xl object-cover mb-8 max-h-96"
          />
        )}

        {/* Category / status badge + date + read time */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
          <Badge
            variant="secondary"
            className="capitalize"
          >
            {article.status}
          </Badge>
          <span>{formatDate(publishDate)}</span>
          <span>·</span>
          <span>{readTime} min read</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold font-instrumental-serif tracking-tight leading-tight mt-6 mb-4">
          {article.title}
        </h1>

        {/* Author row */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Avatar className="size-8">
            <AvatarImage
              src={article.author?.avatar_url}
              alt={authorName}
            />
            <AvatarFallback>
              {authorName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">{authorName}</span>
          <span>·</span>
          <span>{formatDate(publishDate)}</span>
          <span>·</span>
          <span>{readTime} min read</span>
          <span>·</span>
          <span>
            {article.views} {article.views === 1 ? "view" : "views"}
          </span>
        </div>

        <hr className="mb-8 border-border" />

        {/* Markdown content */}
        <div className="min-w-0">
          <MarkdownRenderer content={article.content} />
        </div>
      </article>
    </ScrollArea>
  );
};

export default ArticlePage;
