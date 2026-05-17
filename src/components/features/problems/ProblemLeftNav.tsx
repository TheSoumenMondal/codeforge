"use client";

import { PencilCircleIcon } from "@phosphor-icons/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

const ProblemLeftNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedDifficulty = searchParams.get("difficulty") ?? "all";

  const handleNavigateToCreate = () => {
    router.push("/problems/create");
  };

  const setDifficulty = (nextDifficulty: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextDifficulty === "all") {
      params.delete("difficulty");
    } else {
      params.set("difficulty", nextDifficulty);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex justify-between items-center h-full px-4">
      <p className="font-semibold text-lg font-instrumental-serif tracking-wider">
        Problems
      </p>
      <div className="flex gap-3 items-center">
        <ButtonGroup>
          <Button
            size="lg"
            animation="none"
            variant={selectedDifficulty === "all" ? "warning" : "warning"}
            onClick={() => setDifficulty("all")}
          >
            All
          </Button>
          <Button
            size="lg"
            animation="none"
            variant={selectedDifficulty === "easy" ? "warning" : "warning"}
            onClick={() => setDifficulty("easy")}
          >
            Easy
          </Button>
          <Button
            size="lg"
            animation="none"
            variant={selectedDifficulty === "medium" ? "warning" : "warning"}
            onClick={() => setDifficulty("medium")}
          >
            Medium
          </Button>
          <Button
            size="lg"
            animation="none"
            variant={selectedDifficulty === "hard" ? "warning" : "warning"}
            onClick={() => setDifficulty("hard")}
          >
            Hard
          </Button>
        </ButtonGroup>

        <Button
          size="lg"
          animation="none"
          onClick={handleNavigateToCreate}
        >
          <PencilCircleIcon
            size={32}
            weight="duotone"
          />
          Contribute
        </Button>
      </div>
    </div>
  );
};

export default ProblemLeftNav;
