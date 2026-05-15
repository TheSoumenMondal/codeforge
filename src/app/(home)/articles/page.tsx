import ArticleLeft from "@/components/features/article/ArticleLeft";
import ArticleRight from "@/components/features/article/ArticleRight";

const page = () => {
  return (
    <div className="w-full grid-cols-12 h-[calc(100vh-57px)] grid">
      <div className="col-span-8 border-r">
        <ArticleLeft />
      </div>
      <div className="col-span-4">
        <ArticleRight />
      </div>
    </div>
  );
};

export default page;
