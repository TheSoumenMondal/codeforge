import ProblemCard from "@/components/features/problems/ProblemCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { questionData } from "../../../../temp/data";

const page = () => {
  return (
    <ScrollArea className="h-[calc(100vh-57px)]">
      <div className="w-full p-4 gap-4 flex flex-col">
        {questionData.map((question) => {
          return (
            <ProblemCard
              key={question.id}
              id={question.id}
              title={question.title}
              acceptanceRate={question.acceptanceRate}
              description={question.description}
              difficulty={question.difficulty}
              tags={question.tags}
              totalSubmissions={question.totalSubmissions}
              solved={question.solved}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default page;
