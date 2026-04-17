import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import type { IQuestionData } from "../../../../temp/data";

const ProblemCard = (questionData: IQuestionData) => {
  function truncateDescription(description: string, maxWords = 15) {
    const words = description.trim().split(/\s+/);

    if (words.length <= maxWords) {
      return description;
    }

    return `${words.slice(0, maxWords).join(" ")}...`;
  }

  function getDifficultyBadgeClass(difficulty: IQuestionData["difficulty"]) {
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
        <p>{truncateDescription(questionData.description, 15)}</p>
      </CardHeader>
      <CardFooter
        background
        className="flex justify-between items-center gap-2 flex-wrap mb-0"
      >
        <Badge className={getDifficultyBadgeClass(questionData.difficulty)}>
          {questionData.difficulty}
        </Badge>

        <div className="flex items-center gap-1 flex-wrap">
          {questionData.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-sky-500/10 text-sky-700 border-sky-500/25 dark:text-sky-300"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <p>{questionData.acceptanceRate}%</p>
        <p>{questionData.totalSubmissions}</p>

        <Badge
          variant="outline"
          className={
            questionData.solved
              ? "border-emerald-500/40 text-emerald-700 bg-emerald-500/10 dark:text-emerald-300"
              : "border-zinc-400/40 text-zinc-700 bg-zinc-500/10 dark:text-zinc-300"
          }
        >
          {questionData.solved ? "Solved" : "Unsolved"}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default ProblemCard;
