"use client";

import {
  ImageIcon,
  QueueIcon,
  SmileyWinkIcon,
  UserCircleIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const CreatePostCard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger className="w-full h-24 bg-accent">
        <div className="w-full flex flex-col h-full">
          <div className="h-4/7 flex items-center px-4 gap-3">
            <UserCircleIcon size={34} />
            <p className="text-[13px]">Have you appeared for any interview ?</p>
          </div>
          <div className="h-3/7 flex items-center justify-between px-4 pb-1">
            <div className="flex items-center justify-center gap-3">
              <ImageIcon
                size={24}
                weight="duotone"
              />
              <VideoCameraIcon
                size={24}
                weight="duotone"
              />
              <QueueIcon
                size={24}
                weight="duotone"
              />
            </div>
            <div className="flex items-center justify-center">
              <span
                className={clsx(
                  buttonVariants({ size: "default", variant: "warning" }),
                )}
              >
                Create Post
              </span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle className={"font-instrumental-serif tracking-wide"}>
            What are you thinking?
          </DialogTitle>
          <DialogDescription>
            Share your thoughts with the community.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <div>
            <Input
              id="post-header"
              className="border-none md:text-lg placeholder:text-lg font-semibold bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none shadow-none"
              placeholder="Title"
            />
            <Textarea
              id="post"
              placeholder="What's on your mind?"
              className="border-none mt-2 py-1 max-h-60 font-geist-sans bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none focus-visible:outline-none"
            />
          </div>
        </div>
        <DialogFooter className="items-center justify-between flex-col md:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <ImageIcon
              className="cursor-pointer"
              size={24}
              weight="duotone"
            />
            <VideoCameraIcon
              className="cursor-pointer"
              size={24}
              weight="duotone"
            />
            <QueueIcon
              className="cursor-pointer"
              size={24}
              weight="duotone"
            />

            <hr className="rotate-90 bg-accent w-5" />

            <SmileyWinkIcon
              className="cursor-pointer"
              size={24}
              weight="duotone"
            />

            <Select defaultValue="#interview">
              <SelectTrigger
                variant="success"
                size="default"
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="#interview">#Interview</SelectItem>
                  <SelectItem value="#general">#General</SelectItem>
                  <SelectItem value="#problem">#Problem</SelectItem>
                  <SelectItem value="#discussion">#Discussion</SelectItem>
                  <SelectItem value="#ask">#ask</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center w-full mt-2 md:mt-0">
            <Button
              className="w-full"
              type="submit"
              variant="warning"
              size="lg"
            >
              Create Post
            </Button>
          </div>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
};

export default CreatePostCard;
