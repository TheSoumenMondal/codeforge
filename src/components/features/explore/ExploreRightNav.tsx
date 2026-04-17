import { BellIcon, UserCircleIcon } from "@phosphor-icons/react";
import FireComponent from "@/components/lottie/Fire";
import { Button } from "@/components/ui/button";

const ExploreRightNav = () => {
  return (
    <div className="w-full h-full flex items-center justify-end px-4">
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          type="button"
        >
          <FireComponent className="w-5" />
          <p className="font-bold">100</p>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="p-0"
        >
          <BellIcon
            className="size-5!"
            weight="duotone"
            size={30}
          />
        </Button>
        <UserCircleIcon
          className="cursor-pointer"
          weight="duotone"
          size={26}
        />
      </div>
    </div>
  );
};

export default ExploreRightNav;
