import Card6 from "@/components/ui/card-6";
import { ScrollArea } from "@/components/ui/scroll-area";
import { collectionCardData } from "../../../../temp/collection-card";

const PageRight = () => {
  return (
    <ScrollArea className="w-full h-full max-h-[calc(100vh-57px)] p-4">
      <div className="flex flex-col gap-4">
        {collectionCardData.map((collection) => {
          return (
            <Card6
              key={collection.title}
              bgImage={collection.bgImage}
              description={collection.description}
              title={collection.title}
            />
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default PageRight;
