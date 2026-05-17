"use client";

import { SlidersIcon } from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const ExploreLeftNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag") ?? "all";
  const sortOrder = searchParams.get("sort") === "oldest" ? "oldest" : "newest";

  const setSortOrder = (nextSortOrder: "newest" | "oldest") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", nextSortOrder);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const setSelectedTag = (nextTag: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextTag === "all") {
      params.delete("tag");
    } else {
      params.set("tag", nextTag);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex justify-between items-center h-full px-4">
      <p className="font-semibold text-lg font-instrumental-serif tracking-wide">
        Explore
      </p>
      <div>
        <ButtonGroup>
          <Button
            size="lg"
            animation="none"
            variant={sortOrder === "newest" ? "warning" : "warning"}
            onClick={() => setSortOrder("newest")}
          >
            Newest
          </Button>
          <Button
            size="lg"
            animation="none"
            variant={sortOrder === "oldest" ? "warning" : "warning"}
            onClick={() => setSortOrder("oldest")}
          >
            Oldest
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <Select
          value={selectedTag}
          onValueChange={(value) => setSelectedTag(value ?? "all")}
        >
          <SelectTrigger
            variant="secondary"
            size="default"
            icon={<SlidersIcon weight="duotone" />}
          >
            <span className="capitalize">
              {selectedTag === "all" ? "All" : selectedTag}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="#interview">#Interview</SelectItem>
              <SelectItem value="#general">#General</SelectItem>
              <SelectItem value="#problem">#Problem</SelectItem>
              <SelectItem value="#discussion">#Discussion</SelectItem>
              <SelectItem value="#ask">#ask</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ExploreLeftNav;
