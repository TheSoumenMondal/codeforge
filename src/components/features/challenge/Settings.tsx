import { WrenchIcon } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { cn } from "@/lib/utils";

const EditorSettings = () => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ size: "icon-lg", variant: "default" }))}
      >
        <WrenchIcon
          size={32}
          weight="duotone"
        />
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle className="font-instrumental-serif text-xl">
            Editor Settings
          </DialogTitle>
          <DialogDescription>Adjust your editor preferences.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme</span>
            <ToggleTheme />
          </div>
        </div>
      </DialogPopup>
    </Dialog>
  );
};

export default EditorSettings;
