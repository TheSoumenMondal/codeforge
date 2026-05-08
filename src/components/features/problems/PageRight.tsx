"use client";

import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreatePageRight from "./create/CreatePageRight";

const PageRight = () => {
  const pathname = usePathname();

  if (pathname === "/problems/create") {
    return <CreatePageRight />;
  }

  return (
    <ScrollArea className="w-full h-full max-h-[calc(100vh-57px)] p-4">
      <div className="h-full w-full">Right Side card to be implemented</div>
    </ScrollArea>
  );
};

export default PageRight;
