"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ArticleLeftNavbar from "../article/ArticleLeftNavbar";
import ArticleRightNavbar from "../article/ArticleRightNavbar";
import ExploreLeftNav from "../explore/ExploreLeftNav";
import ExploreRightNav from "../explore/ExploreRightNav";
import CreateProblemNavbarLeft from "../problems/create/CreateProblemNavbarLeft";
import CreateProblemNavbarRight from "../problems/create/CreateProblemNavbarRight";
import ProblemLeftNav from "../problems/ProblemLeftNav";
import ProblemRightNav from "../problems/ProblemRightNav";

const ArticleReaderNav = () => {
  const router = useRouter();
  return (
    <div className="w-full flex items-center h-full px-4 gap-3">
      <Button
        animation="none"
        size="sm"
        variant="ghost"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon
          size={18}
          weight="duotone"
        />
        Articles
      </Button>
    </div>
  );
};

const Navbar = () => {
  const pathname = usePathname();

  let leftNav: React.ReactNode = <p>Default Navbar</p>;
  let rightNav: React.ReactNode = <p>Default Right Nav</p>;

  if (pathname === "/explore") {
    leftNav = <ExploreLeftNav />;
    rightNav = <ExploreRightNav />;
  } else if (pathname === "/problems") {
    leftNav = <ProblemLeftNav />;
    rightNav = <ProblemRightNav />;
  } else if (pathname === "/articles") {
    leftNav = <ArticleLeftNavbar />;
    rightNav = <ArticleRightNavbar />;
  } else if (pathname.startsWith("/articles/")) {
    leftNav = <ArticleReaderNav />;
    rightNav = null;
  } else if (pathname === "/problems/create") {
    leftNav = <CreateProblemNavbarLeft />;
    rightNav = <CreateProblemNavbarRight />;
  } else if (pathname.startsWith("/profile")) {
    leftNav = (
      <p className="text-xl font-medium h-full flex items-center pl-4 font-instrumental-serif tracking-wide">
        Profile
      </p>
    );
    rightNav = null;
  }

  return (
    <div className="w-full grid grid-cols-12 h-full">
      <div className="col-span-8 border-r h-full">{leftNav}</div>
      <div className="col-span-4 h-full">{rightNav}</div>
    </div>
  );
};

export default Navbar;
