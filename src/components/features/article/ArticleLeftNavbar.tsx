import { PencilCircleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const ArticleLeftNavbar = () => {
  return (
    <div className="w-full flex items-center flex-row h-full px-4 justify-between">
      <p className="font-instrumental-serif text-xl font-bold">Articles</p>
      <div className="">
        <Button
          animation="none"
          size="lg"
          variant="warning"
        >
          <PencilCircleIcon
            size={32}
            weight="duotone"
          />
          Create Article
        </Button>
      </div>
    </div>
  );
};

export default ArticleLeftNavbar;
