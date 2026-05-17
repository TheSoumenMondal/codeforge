"use client";

import { CircleNotchIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getAllPosts } from "@/api/services/post.service";
import CreatePostCard from "@/components/features/explore/CreatePostCard";
import ExploreRight from "@/components/features/explore/ExploreRight";
import PostCard from "@/components/features/explore/PostCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = () => {
  const searchParams = useSearchParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

  const selectedTag = searchParams.get("tag") ?? "all";
  const sortOrder = searchParams.get("sort") === "oldest" ? "oldest" : "newest";
  const filteredPosts =
    selectedTag === "all"
      ? (data ?? [])
      : (data ?? []).filter((post) => post.tags?.includes(selectedTag));
  const orderedPosts =
    sortOrder === "newest" ? [...filteredPosts].reverse() : filteredPosts;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <CircleNotchIcon
          size={32}
          weight="duotone"
          className="animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error loading problems</div>;
  }

  return (
    <div className="w-full grid grid-cols-12 h-[calc(100vh-57px)]">
      <div className="col-span-8 border-r">
        <div className=" w-full h-24 ">
          <CreatePostCard />
        </div>
        <div className="w-full h-full max-h-[calc(100vh-153px)]">
          <ScrollArea className="w-full h-full">
            <div className="flex flex-col gap-4 p-4">
              {orderedPosts.map((postData) => (
                <PostCard
                  content={postData.content}
                  createdAt={postData.createdAt}
                  id={postData.id}
                  images={postData.images}
                  tags={postData.tags}
                  title={postData.title}
                  updatedAt={postData.updatedAt}
                  userId={postData.userId}
                  userName={postData.userName}
                  userProfileImage={postData.userProfileImage}
                  key={postData.id}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="col-span-4">
        <ExploreRight />
      </div>
    </div>
  );
};

export default page;
