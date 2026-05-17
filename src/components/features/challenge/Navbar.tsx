"use client";

import { FlowerIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import AiHintChat from "./AiHintChat";
import ComplexityAnalyzer from "./ComplexityAnalyzer";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="w-full h-14 flex items-center justify-between px-4">
      <div className="font-serif flex items-center gap-1 text-lg">
        <FlowerIcon
          weight="duotone"
          size={22}
        />
        codeforge
      </div>
      <div className="flex gap-2 items-center">
        <AiHintChat />
        <ComplexityAnalyzer />
      </div>
      <div>
        {isAuthenticated ? (
          <div className="w-full flex items-center">
            <Avatar>
              <AvatarImage
                src={user?.avatar_url || "/images/avatar/default_dp.png"}
              />
            </Avatar>
          </div>
        ) : (
          <Link href={"/login"}>
            <Button
              size="lg"
              variant="warning"
              animation="none"
            >
              Log in
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
