import {
  CircleNotchIcon,
  FunnelSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type MouseEvent, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  deleteProblem,
  getMyCreatedProblems,
  getProblemById,
} from "@/api/services/problem.service";
import { BadgeAdditional } from "@/components/ui/badge-2";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { useProblem } from "@/hooks/useProblem";
import { mapProblemTotalToEditorStore } from "@/utils/problemEditorMapping";

import GridCard from "./GridCard";

type TSortCreated = "newest" | "oldest";

const CreatePageRight = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const {
    mode,
    currentProblemInEditor,
    setCurrentProblemInEditor,
    resetEditorState,
  } = useProblem();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCreated, setSortCreated] = useState<TSortCreated>("newest");
  const [loadingProblemId, setLoadingProblemId] = useState<string | null>(null);
  const [modifyTarget, setModifyTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const loadProblemIntoEditor = useCallback(
    async (problemId: string) => {
      if (mode !== "edit") return;
      if (!token) {
        toast.error("Sign in to load a problem.");
        return;
      }

      setLoadingProblemId(problemId);
      try {
        const data = await getProblemById(problemId);
        resetEditorState();
        setCurrentProblemInEditor(mapProblemTotalToEditorStore(data));
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to load problem",
        );
      } finally {
        setLoadingProblemId(null);
      }
    },
    [mode, resetEditorState, setCurrentProblemInEditor, token],
  );

  const confirmLoadProblem = useCallback(async () => {
    if (!modifyTarget) return;
    const id = modifyTarget.id;
    setModifyTarget(null);
    await loadProblemIntoEditor(id);
  }, [loadProblemIntoEditor, modifyTarget]);

  const deleteProblemMutation = useMutation({
    mutationFn: (problemId: string) =>
      deleteProblem(token as string, problemId),
    onSuccess: (_data, problemId) => {
      toast.success("Problem deleted.");
      queryClient.invalidateQueries({ queryKey: ["my-created-problems"] });
      queryClient.invalidateQueries({ queryKey: ["problems"] });
      if (currentProblemInEditor?.id === problemId) {
        setCurrentProblemInEditor(null);
        resetEditorState();
      }
      setDeleteTarget(null);
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-created-problems"],
    queryFn: () => getMyCreatedProblems(token as string),
    enabled: !!token,
  });

  const trimmedSearch = searchQuery.trim();

  const toggleSortCreatedOrder = () => {
    setSortCreated((previous) => (previous === "newest" ? "oldest" : "newest"));
  };

  const filteredSortedProblems = useMemo(() => {
    const list = data ?? [];
    const query = trimmedSearch.toLowerCase();
    const filtered = query
      ? list.filter(
          (problem) =>
            problem.title.toLowerCase().includes(query) ||
            problem.description.toLowerCase().includes(query),
        )
      : list;
    const dir = sortCreated === "newest" ? -1 : 1;
    return [...filtered].sort((leftProblem, rightProblem) => {
      const ta = new Date(leftProblem.created_at).getTime();
      const tb = new Date(rightProblem.created_at).getTime();
      const safeA = Number.isFinite(ta) ? ta : 0;
      const safeB = Number.isFinite(tb) ? tb : 0;
      return (safeA - safeB) * dir;
    });
  }, [data, sortCreated, trimmedSearch]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-57px)] w-full items-center justify-center">
        <CircleNotchIcon
          weight="duotone"
          size={32}
          className="animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-57px)] w-full items-center justify-center">
        <p className="text-sm text-red-500">Failed to load problems</p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden md:h-[calc(100vh-57px)]">
      <Dialog
        open={modifyTarget !== null}
        onOpenChange={(open) => {
          if (!open) setModifyTarget(null);
        }}
      >
        <DialogPopup showCloseButton>
          <DialogHeader>
            <DialogTitle
              className={"font-instrumental-serif text-xl tracking-wide"}
            >
              Modify this problem?
            </DialogTitle>
            <DialogDescription>
              <span className="font-ubuntu-mono">
                Opening this problem replaces the editor with the saved version.
                Any unsaved work on the left will be lost.
              </span>
              <span className="font-ubuntu-mono font-bold">Problem: </span>
              <span className="font-semibold text-foreground text-sm">
                {modifyTarget?.title ?? ""}
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-end">
            <Button
              type="button"
              variant="outline"
              size="lg"
              animation="none"
              onClick={() => setModifyTarget(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="info"
              size="lg"
              animation="none"
              onClick={() => void confirmLoadProblem()}
              disabled={
                !!loadingProblemId &&
                !!modifyTarget?.id &&
                loadingProblemId === modifyTarget.id
              }
            >
              Open in editor
            </Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>

      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <DialogPopup showCloseButton>
          <DialogHeader>
            <DialogTitle
              className={"font-instrumental-serif tracking-wide text-xl"}
            >
              Delete problem?
            </DialogTitle>
            <DialogDescription className={"font-ubuntu-mono"}>
              Deleting the probelm is irreversible. Are you sure you want to
              delete ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-end">
            <Button
              type="button"
              variant="outline"
              size="lg"
              animation="none"
              onClick={() => setDeleteTarget(null)}
              disabled={deleteProblemMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="lg"
              animation="none"
              disabled={
                deleteProblemMutation.isPending || !deleteTarget || !token
              }
              onClick={() => {
                if (!deleteTarget || !token) return;
                deleteProblemMutation.mutate(deleteTarget.id);
              }}
            >
              {deleteProblemMutation.isPending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>

      <div className="h-50 w-full shrink-0">
        <GridCard />
      </div>

      <div className="flex w-full shrink-0 flex-col gap-3 border-b p-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search for problem"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter") return;
              event.preventDefault();
              setSearchQuery((query) => query.trim());
            }}
            aria-label="Search problems by title or description"
            className="flex-1"
          />

          <Button
            type="button"
            size="lg"
            animation="none"
            variant="info"
            onClick={() => setSearchQuery((query) => query.trim())}
          >
            Search
          </Button>
        </div>

        <ButtonGroup className="w-full">
          <Button
            type="button"
            animation="none"
            size="lg"
            className="w-4/5 shrink-0"
            onClick={toggleSortCreatedOrder}
          >
            {sortCreated === "newest"
              ? "Sort newest first"
              : "Sort oldest first"}
          </Button>

          <Button
            type="button"
            animation="none"
            size="lg"
            className="w-1/5 shrink-0"
            onClick={toggleSortCreatedOrder}
            aria-label="Toggle newest or oldest first"
          >
            <FunnelSimpleIcon size={32} />
          </Button>
        </ButtonGroup>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full max-h-full min-h-0 px-2">
          <div className="flex flex-col gap-2 pt-4 px-2">
            {!data?.length ? (
              <div className="flex h-40 w-full items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  No problems created yet
                </p>
              </div>
            ) : filteredSortedProblems.length === 0 ? (
              <div className="flex h-40 w-full items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  No problems match your search
                </p>
              </div>
            ) : (
              filteredSortedProblems.map((problem) => {
                const isActive = currentProblemInEditor?.id === problem.id;
                const isLoadingRow = loadingProblemId === problem.id;
                const canOpen = mode === "edit";
                const badgeVariant =
                  problem.difficulty === "easy"
                    ? "success"
                    : problem.difficulty === "medium"
                      ? "warning"
                      : problem.difficulty === "hard"
                        ? "destructive"
                        : "info";

                return (
                  <div
                    key={problem.id}
                    className="flex w-full  gap-2 items-center"
                  >
                    <Button
                      type="button"
                      disabled={!canOpen || isLoadingRow}
                      onClick={() => {
                        if (!canOpen) return;
                        if (currentProblemInEditor?.id === problem.id) return;

                        setModifyTarget({
                          id: problem.id,
                          title: problem.title,
                        });
                      }}
                      className="flex-1"
                      animation="none"
                      size="lg"
                      variant={isActive ? "info" : "outline"}
                    >
                      <span className="flex w-full min-w-0 items-center justify-between gap-2">
                        <span className="flex min-w-0 items-center gap-2">
                          {isLoadingRow && (
                            <CircleNotchIcon
                              className="size-4 animate-spin shrink-0"
                              weight="duotone"
                              aria-hidden
                            />
                          )}

                          <span className="truncate text-sm">
                            {problem.title.length > 20
                              ? `${problem.title.slice(0, 20)}...`
                              : problem.title}
                          </span>
                        </span>

                        <BadgeAdditional
                          size="sm"
                          variant={badgeVariant}
                          appearance="outline"
                          className="shrink-0 capitalize"
                        >
                          {problem.difficulty}
                        </BadgeAdditional>
                      </span>
                    </Button>
                    <Button
                      variant="destructive"
                      type="button"
                      size="icon-lg"
                      animation="none"
                      aria-label={`Delete "${problem.title}"`}
                      disabled={
                        !token ||
                        isLoadingRow ||
                        deleteProblemMutation.isPending
                      }
                      className="shrink-0"
                      onClick={(event: MouseEvent<HTMLButtonElement>) => {
                        event.preventDefault();
                        event.stopPropagation();
                        if (!token) {
                          toast.error("Sign in to delete a problem.");
                          return;
                        }
                        setDeleteTarget({
                          id: problem.id,
                          title: problem.title,
                        });
                      }}
                    >
                      <TrashIcon weight="duotone" />
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CreatePageRight;
