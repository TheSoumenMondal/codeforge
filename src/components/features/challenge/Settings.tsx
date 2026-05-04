import { WrenchIcon } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const EditorSettings = () => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({ size: "lg", variant: "default" }))}
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
        <Card>
          <div className="w-40 aspect-square bg-black" />
          <div className="w-40 aspect-square bg-pink-500" />
        </Card>
      </DialogPopup>
    </Dialog>
  );
};

export default EditorSettings;
