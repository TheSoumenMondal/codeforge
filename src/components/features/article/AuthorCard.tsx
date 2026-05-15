import { ArticleIcon } from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { TTopAuthor } from "@/types/article";

const AuthorCard = ({ data }: { data: TTopAuthor }) => {
  const initials = data.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      decorations
      className="mb-3 w-full last:mb-0 rounded-none border"
    >
      <CardContent className="flex items-center justify-between gap-3 py-0">
        <div className="min-w-0 flex items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage
              src={data.avatar_url}
              alt={data.name}
            />
            <AvatarFallback className="text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight text-foreground">
              {data.name}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Top contributor
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-border/50 pt-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ArticleIcon
            size={14}
            weight="duotone"
            className="text-foreground/60"
          />
          <span className="text-sm font-semibold text-foreground tabular-nums">
            {data.article_count}
          </span>
          articles published
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthorCard;
