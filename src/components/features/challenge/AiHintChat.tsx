import { GolfIcon, QuestionIcon, XCircleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AiHintChat = () => {
  return (
    <div className="w-full h-full">
      <Dialog>
        <DialogTrigger
          render={
            <Button
              animation="none"
              variant="outline"
              size="icon-lg"
            >
              <GolfIcon weight="duotone" />
            </Button>
          }
        />
        <DialogPopup>
          <DialogHeader>
            <DialogTitle className={"font-instrumental-serif tracking-wide"}>
              Hints
            </DialogTitle>
            <DialogDescription className={"font-geist-sans"}>
              If you're ever stuck, feel free to ask for help.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-full">
            <div className="font-ubuntu-mono">
              <p>This feature is not available yet</p>
            </div>
          </div>
          <DialogFooter className="flex justify-end">
            <Button
              animation="colors"
              type="button"
              size="lg"
              variant="info"
            >
              <QuestionIcon weight="duotone" />
              Get Hint
            </Button>
            <Button
              animation="colors"
              type="button"
              size="lg"
              variant="warning"
            >
              <XCircleIcon weight="duotone" />
              Close
            </Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </div>
  );
};

export default AiHintChat;
