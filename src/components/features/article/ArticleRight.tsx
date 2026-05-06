"use client";

import { CircleNotchIcon, TagIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { getTopAuthors } from "@/api/services/article.service";
import { BadgeAdditional } from "@/components/ui/badge-2";
import { ScrollArea } from "@/components/ui/scroll-area";
import AuthorCard from "./AuthorCard";

const ArticleRight = () => {
  const topics = [
    "AI",
    "Web Development",
    "Mobile Apps",
    "Data Science",
    "Cloud Computing",
    "Cybersecurity",
    "Open Source",
    "Programming Languages",
    "DevOps",
    "Software Architecture",
    "Ciber Attack",
    "Machine Learning",
  ];

  const { error, data, isLoading } = useQuery({
    queryKey: ["top-authors"],
    queryFn: getTopAuthors,
  });

  if (isLoading) {
    return (
      <CircleNotchIcon
        className="animate-spin"
        size={32}
        weight="duotone"
      />
    );
  }

  if (error) {
    return (
      <p>{error instanceof Error ? error.message : "An error occurred"}</p>
    );
  }

  return (
    <div className="w-full h-full max-h-[calc(100vh-57px)] flex flex-col">
      <div className="w-full p-4 h-70 grid row-span-12">
        <p className="font-instrumental-serif text-lg tracking-wide font-semibold row-span-1">
          Trending Today
        </p>
        <div className="w-full h-full row-span-11 gap-2 flex flex-wrap items-start rounded pt-4">
          {topics.map((topic) => (
            <BadgeAdditional
              key={topic}
              variant="warning"
              appearance={"outline"}
            >
              <TagIcon />
              {topic}
            </BadgeAdditional>
          ))}
        </div>
      </div>
      <div className="w-full h-full max-h-[calc(100vh-337px)] px-4">
        <p className="font-instrumental-serif text-lg tracking-wide font-semibold h-10">
          Worth following
        </p>
        <ScrollArea className="w-full h-full max-h-[calc(100vh-377px)] px-4 pt-4">
          {data?.map((author) => (
            <AuthorCard
              key={author.id}
              data={author}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default ArticleRight;
