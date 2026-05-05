import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { TPost } from "@/types/post";

const formatTimeAgo = (date: string) => {
  const now = Date.now();
  const past = new Date(date).getTime();
  const diff = Math.max(0, now - past);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const PostCard = (data: TPost) => {
  const images = data.images?.slice(0, 3) ?? [];
  const imageCount = images.length;

  return (
    <Card className="w-full rounded-xl border bg-background p-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-11 w-11 ring-2 ring-border">
          <AvatarImage
            src={data.userProfileImage}
            alt={data.userName}
          />
          <AvatarFallback>{getInitials(data.userName)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold truncate">{data.userName}</p>
            <span className="text-muted-foreground text-sm">•</span>
            <p className="text-sm text-muted-foreground">
              {formatTimeAgo(data.createdAt)}
            </p>
          </div>

          <h3 className="mt-1 text-lg font-semibold">{data.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
            {data.content}
          </p>
        </div>
      </div>

      {imageCount > 0 && (
        <div className="mt-4 overflow-hidden rounded-xl">
          {imageCount === 1 && (
            <div className="relative w-full aspect-16/10">
              <Image
                loading="eager"
                src={images[0]}
                alt="Post image"
                fill
                className="object-cover rounded-xl"
              />
            </div>
          )}

          {imageCount === 2 && (
            <div className="grid grid-cols-2 gap-2">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square"
                >
                  <Image
                    src={img}
                    alt={`Post image ${data.id}`}
                    loading="eager"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          )}

          {imageCount === 3 && (
            <div className="grid grid-cols-2 gap-2">
              <div className="relative row-span-2">
                <Image
                  src={images[0]}
                  alt="Post image 1"
                  fill
                  loading="eager"
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="relative aspect-square">
                <Image
                  src={images[1]}
                  alt="Post image 2"
                  fill
                  className="object-cover rounded-xl"
                  loading="eager"
                />
              </div>
              <div className="relative aspect-square">
                <Image
                  src={images[2]}
                  alt="Post image 3"
                  fill
                  className="object-cover rounded-xl"
                  loading="eager"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default PostCard;
