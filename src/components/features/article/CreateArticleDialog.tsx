"use client";

import {
  ArrowUpIcon,
  CircleNotchIcon,
  EyeIcon,
  ImageIcon,
  PencilSimpleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { createArticle } from "@/api/services/article.service";
import { uploadPostFiles } from "@/api/services/post.service";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import type { TCreateArticlePayload } from "@/types/article";
import MarkdownRenderer from "./MarkdownRenderer";

const EMPTY: TCreateArticlePayload = {
  title: "",
  content: "",
  excerpt: "",
  // biome-ignore lint/style/useNamingConvention: matching API field
  cover_image: "",
};

const CreateArticleDialog = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<TCreateArticlePayload>(EMPTY);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [uploading, setUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleCoverUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (!file || !token) return;
    setUploading(true);
    try {
      const urls = await uploadPostFiles(token, [file]);
      if (urls[0]) {
        // biome-ignore lint/style/useNamingConvention: matching API field
        setForm((prev) => ({ ...prev, cover_image: urls[0] }));
        toast.success("Cover image uploaded");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  const mutation = useMutation({
    mutationFn: (payload: TCreateArticlePayload) => {
      if (!token)
        throw new Error("You must be signed in to create an article.");
      return createArticle(token, payload);
    },
    onSuccess: async () => {
      toast.success("Article created successfully");
      await queryClient.invalidateQueries({ queryKey: ["articles"] });
      setForm(EMPTY);
      setTab("write");
      setOpen(false);
    },
    onError: (err: Error) =>
      toast.error(
        err instanceof Error ? err.message : "Failed to create article",
      ),
  });

  const set =
    (field: keyof TCreateArticlePayload) =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: ev.target.value }));

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required");
    if (!form.content.trim()) return toast.error("Content is required");

    const payload: TCreateArticlePayload = {
      title: form.title.trim(),
      content: form.content.trim(),
      ...(form.excerpt?.trim() && { excerpt: form.excerpt.trim() }),
      // biome-ignore lint/style/useNamingConvention: matching API field
      ...(form.cover_image?.trim() && { cover_image: form.cover_image.trim() }),
    };

    mutation.mutate(payload);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) {
          setForm(EMPTY);
          setTab("write");
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            animation="none"
            size="lg"
            variant="warning"
          >
            <PencilSimpleIcon
              size={20}
              weight="duotone"
            />
            Create Article
          </Button>
        }
      />

      <DialogPopup
        className="sm:max-w-4xl w-full"
        containerClassName="sm:max-w-full"
      >
        <DialogHeader>
          <DialogTitle className="font-instrumental-serif tracking-wide">
            Create Article
          </DialogTitle>
          <DialogDescription>
            Share your knowledge with the community.
          </DialogDescription>
        </DialogHeader>

        <form
          id="create-article-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="article-title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="article-title"
                placeholder="How I built a full-stack app in a weekend"
                value={form.title}
                onChange={set("title")}
                disabled={mutation.isPending}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Cover Image</Label>
              {form.cover_image ? (
                <div className="relative w-full h-28 rounded-lg overflow-hidden border group">
                  {/* biome-ignore lint/performance/noImgElement: user-uploaded URL */}
                  <img
                    src={form.cover_image}
                    alt="cover preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      // biome-ignore lint/style/useNamingConvention: matching API field
                      setForm((prev) => ({ ...prev, cover_image: "" }))
                    }
                    className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XIcon size={12} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={uploading || mutation.isPending}
                  onClick={() => coverInputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 w-full h-28 rounded-lg border border-dashed border-border hover:border-primary hover:bg-muted/40 transition-colors text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <CircleNotchIcon
                      size={22}
                      className="animate-spin"
                    />
                  ) : (
                    <>
                      <ImageIcon
                        size={22}
                        weight="duotone"
                      />
                      <span className="text-xs flex items-center gap-1">
                        <ArrowUpIcon size={11} />
                        Click to upload cover image
                      </span>
                    </>
                  )}
                </button>
              )}
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverUpload}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="article-excerpt">Excerpt</Label>
            <Input
              id="article-excerpt"
              placeholder="A short summary shown in the article list…"
              value={form.excerpt}
              onChange={set("excerpt")}
              disabled={mutation.isPending}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label>
                Content <span className="text-destructive">*</span>
              </Label>
              <div className="flex items-center gap-1 rounded-lg border p-0.5">
                <button
                  type="button"
                  onClick={() => setTab("write")}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    tab === "write"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <PencilSimpleIcon size={12} />
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setTab("preview")}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    tab === "preview"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <EyeIcon size={12} />
                  Preview
                </button>
              </div>
            </div>

            {tab === "write" ? (
              <Textarea
                id="article-content"
                placeholder="Write your article in Markdown…"
                value={form.content}
                onChange={set("content")}
                disabled={mutation.isPending}
                className="min-h-56 font-mono text-sm resize-none"
              />
            ) : (
              <ScrollArea className="min-h-56 max-h-72 rounded-md border bg-muted/20 px-4 py-3">
                {form.content.trim() ? (
                  <MarkdownRenderer content={form.content} />
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Nothing to preview yet.
                  </p>
                )}
              </ScrollArea>
            )}
          </div>
        </form>

        <DialogFooter>
          <Button
            type="submit"
            form="create-article-form"
            size="lg"
            variant="warning"
            animation="none"
            disabled={mutation.isPending}
            className="w-full sm:w-auto"
          >
            {mutation.isPending ? (
              <>
                <CircleNotchIcon
                  size={16}
                  className="animate-spin"
                />
                Publishing…
              </>
            ) : (
              <>
                <PencilSimpleIcon
                  size={16}
                  weight="duotone"
                />
                Publish Article
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
};

export default CreateArticleDialog;
