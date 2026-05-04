import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TCollectionCardType = {
  title: string;
  bgImage: string;
  description: string;
};

type TCard6Props = Pick<
  TCollectionCardType,
  "title" | "bgImage" | "description"
> & {
  className?: string;
};

const Card6 = ({ title, className, bgImage, description }: TCard6Props) => {
  const fallbackImage = `https://picsum.photos/seed/${encodeURIComponent(title)}/1200/900`;
  const cardBackground = bgImage
    ? bgImage.startsWith("url(")
      ? bgImage
      : `url(${bgImage})`
    : `url(${fallbackImage})`;

  return (
    <Card
      className={cn(
        "relative isolate aspect-4/2 w-full max-w-md overflow-hidden rounded-sm py-0 text-white shadow-[0_24px_80px_-30px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: cardBackground,
        }}
      />

      <div className="absolute inset-0 bg-linear-to-br from-black/45 via-black/60 to-black/85" />
      <div className="z-10 flex h-full w-full flex-col justify-between px-4 py-3">
        <div className="w-full px-0.5 py-0.5">
          <p className="text-xl font-bold font-instrumental-serif tracking-wide [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
            {title}
          </p>
          <p className="line-clamp-1 text-sm font-geist-sans text-white/95 [text-shadow:0_1px_6px_rgba(0,0,0,0.75)]">
            {description}
          </p>
        </div>
        <div className="w-full">
          <Button
            animation="none"
            variant="success"
            className="w-full"
          >
            Solve Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Card6;
