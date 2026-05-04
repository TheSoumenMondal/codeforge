"use client";

import { usePathname } from "next/navigation";
import ExploreLeftNav from "../explore/ExploreLeftNav";
import ExploreRightNav from "../explore/ExploreRightNav";
import ProblemLeftNav from "../problems/ProblemLeftNav";
import ProblemRightNav from "../problems/ProblemRightNav";

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
  }

  return (
    <div className="w-full grid grid-cols-12 h-full">
      <div className="col-span-8 border-r h-full">{leftNav}</div>
      <div className="col-span-4 h-full">{rightNav}</div>
    </div>
  );
};

export default Navbar;
