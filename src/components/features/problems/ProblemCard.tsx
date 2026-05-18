import { PencilLineIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import type { TProblemDataType } from "@/types/problem";
import { mdToPlainText } from "@/utils/markdown";

const ProblemCard = (questionData: TProblemDataType) => {
  const router = useRouter();

  const handleGoToProblem = () => {
    router.push(`/challenges/${questionData.id}`);
  };

  function getDifficultyBadgeClass(difficulty: TProblemDataType["difficulty"]) {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-300";
      case "medium":
        return "bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-300";
      case "hard":
        return "bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-300";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  }

  return (
    <Card className="w-full flex flex-col gap-0 py-0 cursor-pointer">
      <CardHeader className="w-full bg-secondary py-4">
        <h2 className="text-lg font-semibold font-instrumental-serif tracking-wide">
          {questionData.title}
        </h2>
        <p>{mdToPlainText(questionData.description).slice(0, 80)}...</p>
      </CardHeader>
      <CardFooter
        background
        className="flex justify-between items-center gap-2 flex-wrap mb-0"
      >
        <div className="flex gap-2 items-end">
          <Avatar className="size-6">
            <AvatarImage
              src={
                questionData.creator.avatar_url?.trim() ||
                "/images/avatar/default_dp.png"
              }
            />
            <AvatarFallback>
              {questionData.creator.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="font-serif">{questionData.creator.name}</span>
        </div>

        <div className="flex gap-2 items-center">
          <Badge className={getDifficultyBadgeClass(questionData.difficulty)}>
            {questionData.difficulty}
          </Badge>
          <Button
            onClick={handleGoToProblem}
            animation="none"
            size="sm"
          >
            Solve{" "}
            <PencilLineIcon
              size={32}
              weight="duotone"
            />{" "}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;
