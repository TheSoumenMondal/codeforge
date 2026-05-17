"use client";

import {
  ChartLineUpIcon,
  HandshakeIcon,
  PowerIcon,
  ShareNetworkIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

type TItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  disabled: boolean;
};

const SidebarItem = ({
  icon,
  title,
  description,
  onClick,
  disabled,
}: TItemProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`w-full flex items-start gap-3 px-4 py-3 rounded-md transition-colors text-left
        ${
          disabled
            ? "cursor-not-allowed opacity-50 bg-muted/30 text-muted-foreground"
            : "cursor-pointer hover:bg-muted/60 active:bg-muted/80"
        }`}
    >
      <div
        className={`mt-1 ${disabled ? "text-muted-foreground/70" : "text-muted-foreground"}`}
      >
        {icon}
      </div>

      <div className="flex flex-col text-left">
        <span
          className={`text-sm font-semibold leading-none ${disabled ? "text-muted-foreground" : ""}`}
        >
          {title}
        </span>
        <span className="text-xs text-muted-foreground mt-1">
          {description}
        </span>
      </div>
    </button>
  );
};

const RightPage = () => {
  const { logout } = useAuth();

  return (
    <div className="h-full max-h-[calc(100vh-57px)] flex flex-col justify-between pt-4">
      <div className="w-full flex flex-col">
        <SidebarItem
          icon={
            <ShareNetworkIcon
              size={22}
              weight="duotone"
            />
          }
          title="Invite Friends"
          description="Share your referral link and grow your network"
          disabled={false}
        />

        <SidebarItem
          icon={
            <WrenchIcon
              size={22}
              weight="duotone"
            />
          }
          title="Tools"
          description="Access utilities to improve your workflow"
          disabled={false}
        />

        <SidebarItem
          icon={
            <ChartLineUpIcon
              size={22}
              weight="duotone"
            />
          }
          title="Analytics"
          description="Track your progress and performance insights"
          disabled={false}
        />

        <SidebarItem
          icon={
            <HandshakeIcon
              size={22}
              weight="duotone"
            />
          }
          title="Help & Support"
          description="Get assistance or contact support"
          disabled={false}
        />
      </div>

      <div className="w-full p-4">
        <Button
          className="w-full text-red-600 flex items-center gap-2"
          size="lg"
          variant="secondary"
          animation="none"
          onClick={logout}
        >
          <PowerIcon
            size={18}
            weight="duotone"
          />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default RightPage;
