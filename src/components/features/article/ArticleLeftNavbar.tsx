import CreateArticleDialog from "./CreateArticleDialog";

const ArticleLeftNavbar = () => {
  return (
    <div className="w-full flex items-center flex-row h-full px-4 justify-between">
      <p className="font-instrumental-serif text-xl font-bold">Articles</p>
      <CreateArticleDialog />
    </div>
  );
};

export default ArticleLeftNavbar;
