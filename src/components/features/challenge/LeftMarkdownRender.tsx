"use client";

import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/atom-one-dark.min.css";
import { TagIcon } from "@phosphor-icons/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BadgeAdditional } from "@/components/ui/badge-2";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TProblemTotalData } from "@/types/problem";

const difficultyVariantMap: Record<
  string,
  | "destructive"
  | "info"
  | "outline"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
> = {
  easy: "success",
  medium: "warning",
  hard: "destructive",
};

const LeftMarkdownRender = ({ data }: { data: TProblemTotalData }) => {
  return (
    <div className="w-full h-full p-4 pt-0">
      <ScrollArea className="h-full w-full flex flex-col bg-secondary rounded-md border">
        <div className="px-4 pt-6 flex flex-col gap-2">
          <p className="text-2xl font-mono font-bold">
            {data?.title?.trim() || ""}
          </p>
          <div className="flex gap-3 items-center">
            <div className="flex items-center">
              <Avatar size="sm">
                <AvatarImage src={data?.creator.avatar_url} />
              </Avatar>
              <span className="ml-2 text-sm font-serif">
                {data?.creator.name}
              </span>
            </div>
            <BadgeAdditional
              size={"sm"}
              appearance={"outline"}
              variant={
                difficultyVariantMap[data?.difficulty?.toLowerCase() || "easy"]
              }
            >
              <TagIcon weight="duotone" />
              {data?.difficulty}
            </BadgeAdditional>
          </div>
        </div>
        <div className="w-full h-full px-4 py-2 wrap-break-words font-serif">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: (componentProps) => (
                <h1
                  className="text-lg font-bold mt-4 mb-3 text-foreground wrap-break-words tracking-tighter"
                  {...componentProps}
                />
              ),
              h2: (componentProps) => (
                <h2
                  className="text-lg font-bold mt-4 mb-3 text-foreground wrap-break-words"
                  {...componentProps}
                />
              ),
              h3: (componentProps) => (
                <h3
                  className="text-lg font-bold mt-3 mb-2 text-foreground wrap-break-words"
                  {...componentProps}
                />
              ),

              // biome-ignore lint/style/useNamingConvention: <>
              p: (componentProps) => (
                <p
                  className="my-2 leading-relaxed wrap-break-words"
                  {...componentProps}
                />
              ),
              ul: (componentProps) => (
                <ul
                  className="list-disc list-inside my-2 space-y-1 wrap-break-words"
                  {...componentProps}
                />
              ),
              ol: (componentProps) => (
                <ol
                  className="list-decimal list-inside my-2 space-y-1 wrap-break-words"
                  {...componentProps}
                />
              ),
              li: (componentProps) => (
                <li
                  className="ml-1 wrap-break-words"
                  {...componentProps}
                />
              ),
              code: ({ className, children, ...componentProps }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code
                      className="bg-muted-foreground/10 rounded-lg px-1 py-0.5 text-sm font-mono"
                      {...componentProps}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <code
                    className={`${className} bg-transparent! font-mono text-foreground! p-0!`}
                    {...componentProps}
                  >
                    {children}
                  </code>
                );
              },
              pre: (componentProps) => (
                <pre
                  className="border border-dashed rounded-md px-3 py-2 text-foreground bg-card"
                  {...componentProps}
                />
              ),
              blockquote: (componentProps) => (
                <blockquote
                  className="border-l-4 border-muted-foreground pl-3 my-3 italic wrap-break-words"
                  {...componentProps}
                />
              ),
              hr: (componentProps) => (
                <hr
                  className="my-4 border-border/60"
                  {...componentProps}
                />
              ),
              table: (componentProps) => (
                <div className="overflow-x-auto max-w-full my-4">
                  <table
                    className="w-full border-collapse text-sm"
                    {...componentProps}
                  />
                </div>
              ),
              thead: (componentProps) => (
                <thead
                  className="bg-muted border-b border-border"
                  {...componentProps}
                />
              ),
              tbody: (componentProps) => <tbody {...componentProps} />,
              tr: (componentProps) => (
                <tr
                  className="border-b border-border"
                  {...componentProps}
                />
              ),
              th: (componentProps) => (
                <th
                  className="px-3 py-2 text-left font-semibold text-foreground"
                  {...componentProps}
                />
              ),
              td: (componentProps) => (
                <td
                  className="px-3 py-2"
                  {...componentProps}
                />
              ),
            }}
          >
            {data?.description?.trim() || ""}
          </Markdown>
        </div>
      </ScrollArea>
    </div>
  );
};

export default LeftMarkdownRender;
