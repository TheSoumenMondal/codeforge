import CreatePostCard from "@/components/features/explore/CreatePostCard";

const page = () => {
  return (
    <div className="w-full grid grid-cols-12 h-[calc(100vh-57px)]">
      <div className="col-span-8 border-r">
        <CreatePostCard />
      </div>
      <div className="col-span-4">bye</div>
    </div>
  );
};

export default page;
