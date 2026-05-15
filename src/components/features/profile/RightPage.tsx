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
};

const SidebarItem = ({ icon, title, description, onClick }: TItemProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full flex items-start gap-3 px-4 py-3 rounded-md hover:bg-muted/60 transition-colors cursor-pointer"
    >
      <div className="mt-1 text-muted-foreground">{icon}</div>

      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold leading-none">{title}</span>
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
