import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const ProblemRightNav = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <div className="w-full h-full flex items-center justify-end px-4">
      {isAuthenticated ? (
        <div className="flex gap-2 items-center">
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
