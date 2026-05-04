"use client";

import {
  BooksIcon,
  BrainIcon,
  CompassIcon,
  GearIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";

type TSidebarItemType = {
  id: number;
  title: string;
  icon: React.ReactNode;
  link: string;
};

const sidebarItems: TSidebarItemType[] = [
  {
    id: 1,
    title: "Explore",
    icon: (
      <CompassIcon
        className="w-full h-full"
        weight="duotone"
      />
    ),
    link: "/explore",
  },
  {
    id: 2,
    title: "Problems",
    icon: (
      <BrainIcon
        className="w-full h-full"
        weight="duotone"
      />
    ),
    link: "/problems",
  },
  {
    id: 3,
    title: "Articles",
    icon: (
      <BooksIcon
        className="w-full h-full"
        weight="duotone"
      />
    ),
    link: "/articles",
  },
  {
    id: 4,
    title: "Search",
    icon: (
      <MagnifyingGlassIcon
        className="w-full h-full"
        weight="duotone"
      />
    ),
    link: "/search",
  },
  {
    id: 5,
    title: "Settings",
    icon: (
      <GearIcon
        className="w-full h-full"
        weight="duotone"
      />
    ),
    link: "/settings",
  },
];

const LeftSidebar = () => {
  const { user, isAuthenticated } = useAuth();

  const router = useRouter();
  const handleSidebarItemClick = (link: string) => {
    router.push(link);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <div className="w-full flex flex-col">
        <div className="w-full h-15 flex items-center">codeforge_logo</div>
        <div className="w-full h-full flex flex-col mt-10 gap-4 font-alef">
          {sidebarItems.map((item) => (
            <button
              type="button"
              key={item.id}
              className="w-full flex items-center cursor-pointer"
              onClick={() => handleSidebarItemClick(item.link)}
            >
              <div className="w-7 aspect-square mr-2">{item.icon}</div>
              <span className="text-[0.95rem] font-semibold font-geist-sans">
                {item.title}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-4">
          <div className="w-full flex items-center gap-2">
            {isAuthenticated && (
              <>
                <div>
                  <Avatar>
                    <AvatarImage
                      src={user?.avatar_url || "/images/avatar/default_dp.png"}
                    />
                  </Avatar>
                </div>
                <div>
                  <p className="font-geist-sans font-semibold">
                    {user?.name?.split(" ")[0]}
                  </p>
                  <p className="text-xs">Newbie</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="pb-6">
        <div className="">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-fit">
                <ToggleTheme />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change Theme</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
