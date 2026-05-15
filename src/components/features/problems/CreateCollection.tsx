import { FloppyDiskBackIcon } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createSheet } from "@/api/services/sheet.service";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";

const CreateCollection = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [placeholder, setPlaceholder] = useState("Ok Go For IT");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [categories, setCategories] = useState<string>("array,dp");

  const mutation = useMutation({
    mutationKey: ["create-sheet"],
    mutationFn: async (payload: {
      title: string;
      description: string;
      visibility: "public" | "private";
      categories: string[];
    }) => {
      if (!token) throw new Error("Please sign in to create a collection.");
      return createSheet(token, payload);
    },
    onSuccess: async () => {
      toast.success("Collection created");
      await queryClient.invalidateQueries({ queryKey: ["sheets"] });
    },
    onError: (err) => {
      toast.error(
        err instanceof Error ? err.message : "Failed to create collection",
      );
    },
  });

  const handleSubmit = async () => {
    const trimmedTitle = title?.trim();
    const trimmedDescription = description?.trim();
    const cats = categories
      .split(",")
      .map((cat) => cat.trim())
      .filter(Boolean);

    if (!trimmedTitle) return toast.error("Title is required");
    if (!trimmedDescription) return toast.error("Description is required");
    if (!visibility) return toast.error("Visibility is required");
    if (cats.length === 0)
      return toast.error("At least one category is required");

    await mutation.mutateAsync({
      title: trimmedTitle,
      description: trimmedDescription,
      visibility,
      categories: cats,
    });
  };

  useEffect(() => {
    const prefixes = ["Codeforge", "Blind", "CF", "BlindCF"];
    const phrases = ["35", "90", "123", "124"];

    const pickType = Math.random();
    if (pickType < 0.6) {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const num = Math.floor(Math.random() * 100) + 1;
      setPlaceholder(`${prefix} ${num}`);
    } else {
      const ph = phrases[Math.floor(Math.random() * phrases.length)];
      setPlaceholder(ph);
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="info"
            size="lg"
            className="w-full"
            animation="none"
          >
            Create your problem collection
          </Button>
        }
      />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Create your problem collection</DialogTitle>
          <DialogDescription>
            Create a new collection to organize your problems.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              className="text-right"
              htmlFor="name"
            >
              Title
            </Label>
            <Input
              className="col-span-3"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              id="name"
              placeholder={placeholder}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              className="text-right"
              htmlFor="description"
            >
              Description
            </Label>
            <Input
              className="col-span-3"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              id="description"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              className="text-right"
              htmlFor="visibility"
            >
              Visibility
            </Label>
            <div className="col-span-3">
              <Select
                value={visibility}
                onValueChange={(val) =>
                  setVisibility(val as "public" | "private")
                }
              >
                <SelectTrigger
                  className={"w-full"}
                  size="default"
                  variant="warning"
                >
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              className="text-right"
              htmlFor="categories"
            >
              Categories
            </Label>
            <Input
              className="col-span-3"
              value={categories}
              onChange={(event) => setCategories(event.target.value)}
              id="categories"
            />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-end">
          <Button
            type="button"
            size="lg"
            variant="info"
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            <FloppyDiskBackIcon weight="duotone" />
            Save changes
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
};

export default CreateCollection;
