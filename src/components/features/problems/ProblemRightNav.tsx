import { BellIcon } from "@phosphor-icons/react";
import Link from "next/link";
import FireComponent from "@/components/lottie/Fire";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const ProblemRightNav = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="w-full h-full flex items-center justify-end px-4">
      {isAuthenticated ? (
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
          <Avatar>
            <AvatarImage
              src={user?.avatar_url || "/images/avatar/default_dp.png"}
            />
          </Avatar>
        </div>
      ) : (
        <Link
          href="/login"
          passHref
        >
          <Button
            animation="none"
            size="lg"
            variant="warning"
          >
            Log in
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProblemRightNav;
