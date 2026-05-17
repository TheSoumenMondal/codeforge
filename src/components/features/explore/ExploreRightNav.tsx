import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const ExploreRightNav = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="w-full h-full flex items-center justify-end px-4">
      <div className="flex gap-2 items-center">
        {isAuthenticated ? (
          <Image
            src={user?.avatar_url || "/images/avatar/default_dp.png"}
            alt="Profile"
            width={26}
            height={26}
            className="cursor-pointer rounded-full object-cover"
          />
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
