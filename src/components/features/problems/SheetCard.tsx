import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeAdditional } from "@/components/ui/badge-2";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { TSheet } from "@/types/sheet";

const SheetCard = ({ sheet }: { sheet: TSheet }) => {
  return (
    <div className="w-full select-none p-3 border rounded-2xl border-dashed cursor-pointer">
      <Card className="w-full pt-0 select-none">
        <CardContent className="relative h-20 p-0 select-none">
          <Image
            className="z-0"
            src="/images/problem-collections/graph.jpg"
            alt="coverimg"
            height={300}
            width={400}
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center gap-2">
            {sheet.categories.length > 0 &&
              sheet.categories.map((category, index) => (
                <BadgeAdditional
                  appearance={"default"}
                  variant={"info"}
                  key={index}
                >
                  {category}
                </BadgeAdditional>
              ))}
          </div>
        </CardContent>
        <CardFooter
          background
          className="text-lg flex justify-between items-center"
        >
          <span className="flex gap-1.5 items-center">
            <Avatar size="default">
              <AvatarImage src={sheet.creator.avatar} />
              <AvatarFallback>{sheet.creator.name[0]}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-serif">
              {sheet.creator.name.split(" ")[0]}
            </p>
          </span>
          <p className="font-instrumental-serif text-lg font-semibold tracking-wide">
            {sheet.title}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SheetCard;
