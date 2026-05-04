"use client";

import { CircleNotchIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { getAllProblems } from "@/api/problem.service";
import ProblemCard from "@/components/features/problems/ProblemCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { TProblemDataType } from "@/types/problem";
import { mdToPlainText } from "@/utils/markdown";

const Page = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["problems"],
    queryFn: getAllProblems,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <CircleNotchIcon
          size={32}
          weight="duotone"
          className="animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error loading problems</div>;
  }

  return (
    <ScrollArea className="h-[calc(100vh-57px)]">
      <div className="w-full p-4 gap-4 flex flex-col">
        {data.map((problem: TProblemDataType) => (
          <ProblemCard
            id={problem.id}
            title={problem.title}
            description={`${mdToPlainText(problem.description).slice(0, 200)}...`}
            difficulty={problem.difficulty}
            created_at={problem.created_at}
            updated_at={problem.updated_at}
            creator={problem.creator}
            key={problem.id}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default Page;
