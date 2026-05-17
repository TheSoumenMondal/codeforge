"use client";

import {
  CircleNotchIcon,
  ImageIcon,
  SmileyWinkIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createPost, uploadPostFiles } from "@/api/services/post.service";
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
import { useAuth } from "@/hooks/useAuth";
import PreviewGrid from "./PreviewCard";

const CreatePostCard = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tag, setTag] = useState<string>("#interview");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "uploading" | "posting"
  >("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewsRef = useRef<string[]>([]);

  const createPostMutation = useMutation({
    mutationFn: async (opts?: { uploadUrls?: string[] }) => {
      if (!token) {
        throw new Error("You are not logged in.");
      }
      const images = opts?.uploadUrls ?? [];
      return createPost(token, {
        title: title.trim(),
        content: content.trim(),
        tags: [tag],
        images,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully");
      setTitle("");
      setContent("");
      setTag("#interview");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create post",
      );
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    try {
      let uploadedUrls: string[] = [];
      if (files.length > 0) {
        setSubmitStatus("uploading");
        uploadedUrls = await uploadPostFiles(token || "", files);
      }
      setSubmitStatus("posting");
      await createPostMutation.mutateAsync({ uploadUrls: uploadedUrls });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setSubmitStatus("idle");
    }
  };

  const handleFilesSelected = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    const selectedArray = Array.from(selectedFiles);
    const available = 3 - files.length;
    if (available <= 0) {
      toast.warning("You can only attach up to 3 images.");
      return;
    }
    const merged = [...files, ...selectedArray.slice(0, available)].slice(0, 3);
    if (selectedArray.length > available) {
      toast.warning(`Only ${available} image(s) added. Maximum is 3.`);
    }
    for (const previewUrl of previewsRef.current) {
      try {
        URL.revokeObjectURL(previewUrl);
      } catch {
        toast.warning("You can only attach up to 3 images.");
        return;
      }
    }
    const previewUrls = merged.map((file) => URL.createObjectURL(file));
    previewsRef.current = previewUrls;
    setFiles(merged);
    setPreviews(previewUrls);
  };

  const handlePickFilesClick = () => {
    fileInputRef.current?.click();
  };

  const removeFileAt = (index: number) => {
    const nextFiles = files.slice(0, index).concat(files.slice(index + 1));
    if (previewsRef.current[index]) {
      try {
        URL.revokeObjectURL(previewsRef.current[index]);
      } catch (_) {
        toast.warning("You can only attach up to 3 images.");
        return;
      }
    }
    const nextPreviews = nextFiles.map((file) => URL.createObjectURL(file));
    previewsRef.current = nextPreviews;
    setFiles(nextFiles);
    setPreviews(nextPreviews);
  };

  useEffect(() => {
    return () => {
      for (const previewUrl of previewsRef.current) {
        try {
          URL.revokeObjectURL(previewUrl);
        } catch (_) {
          toast.info("Cleaned up preview URLs.");
        }
      }
    };
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger className="w-full h-24 bg-card">
        <div className="w-full flex flex-col h-full border-b bg-accent">
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
      <DialogPopup
        className="sm:max-w-2xl w-full"
        containerClassName="sm:max-w-full"
      >
        <DialogHeader>
          <DialogTitle className="font-instrumental-serif tracking-wide">
            What are you thinking?
          </DialogTitle>
          <DialogDescription>
            Share your thoughts with the community.
          </DialogDescription>
        </DialogHeader>
        <form
          className="w-full"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              id="post-header"
              className="border-none md:text-lg placeholder:text-lg font-semibold bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none shadow-none"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Textarea
              id="post"
              placeholder="What's on your mind?"
              className="border-none mt-2 py-1 max-h-60 font-geist-sans bg-transparent dark:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none focus-visible:outline-none"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          <div className="w-full mt-3">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleFilesSelected(event.target.files)
              }
            />
            {previews.length > 0 && (
              <PreviewGrid
                previews={previews}
                onRemove={removeFileAt}
              />
            )}
          </div>

          <DialogFooter className="items-center justify-between flex-col md:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <ImageIcon
                className="cursor-pointer"
                onClick={handlePickFilesClick}
                size={24}
                weight="duotone"
              />

              <hr className="rotate-90 bg-accent w-5" />
              <SmileyWinkIcon
                className="cursor-pointer"
                size={24}
                weight="duotone"
              />
              <Select
                defaultValue="#interview"
                value={tag}
                onValueChange={(val) => setTag(val ?? "#others")}
              >
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
                disabled={submitStatus !== "idle"}
              >
                <span className="flex items-center justify-center gap-2">
                  {submitStatus !== "idle" && (
                    <CircleNotchIcon
                      className="animate-spin"
                      size={16}
                    />
                  )}
                  {submitStatus === "uploading" && "Uploading files..."}
                  {submitStatus === "posting" && "Creating post..."}
                  {submitStatus === "idle" && "Create Post"}
                </span>
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  );
};

export default CreatePostCard;
