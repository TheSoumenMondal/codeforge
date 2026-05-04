import { BellIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import FireComponent from "@/components/lottie/Fire";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const ExploreRightNav = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="w-full h-full flex items-center justify-end px-4">
      <div className="flex gap-2 items-center">
        {isAuthenticated ? (
          <>
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
            <Image
              src={user?.avatar_url || "/images/avatar/default_dp.png"}
              alt="Profile"
              width={26}
              height={26}
              className="cursor-pointer rounded-full object-cover"
            />
          </>
        ) : (
          <Link
            href="/login"
            passHref
          >
            <Button
              size="lg"
              variant="warning"
            >
              Log in
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ExploreRightNav;
