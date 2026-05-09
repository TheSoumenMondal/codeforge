"use client";

import { CircleNotchIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { getAllProblems } from "@/api/services/sheet.service";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateCollection from "./CreateCollection";
import CreatePageRight from "./create/CreatePageRight";
import SheetCard from "./SheetCard";

const PageRight = () => {
  const pathname = usePathname();
  const { data, isLoading, error } = useQuery({
    queryKey: ["sheets"],
    queryFn: () => getAllProblems(),
  });

  if (pathname === "/problems/create") {
    return <CreatePageRight />;
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CircleNotchIcon
          weight="duotone"
          className="animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-15 p-4 flex items-center justify-end">
        <CreateCollection />
      </div>
      <ScrollArea className="w-full h-full max-h-[calc(100vh-117px)] p-4">
        <div className="h-full w-full flex flex-col gap-3">
          {data?.map((sheet, index) => {
            return (
              <SheetCard
                key={sheet.id || index}
                sheet={sheet}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PageRight;
