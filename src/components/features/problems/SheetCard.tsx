"use client";

import {
  CheckCircleIcon,
  CircleIcon,
  CircleNotchIcon,
  GlobeIcon,
  LockSimpleIcon,
  PlusCircleIcon,
} from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { getAllProblems } from "@/api/services/problem.service";
import {
  addProblemToSheet,
  getSheetProblems,
} from "@/api/services/sheet.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { TProblemDataType } from "@/types/problem";
import type { TSheet, TSheetProblem } from "@/types/sheet";

function DifficultyBadge({
  difficulty,
}: {
  difficulty: "easy" | "medium" | "hard";
}) {
  const cls = {
    easy: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
    medium:
      "bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-300",
    hard: "bg-rose-500/15 text-rose-700 border-rose-500/30 dark:text-rose-300",
  };
  return (
    <Badge
      className={cn("capitalize text-xs font-medium border", cls[difficulty])}
    >
      {difficulty}
    </Badge>
  );
}

function AddProblemDialog({
  sheetId,
  token,
}: {
  sheetId: string;
  token: string;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: allProblems, isLoading: loadingAll } = useQuery<
    TProblemDataType[]
  >({
    queryKey: ["all-problems"],
    queryFn: getAllProblems,
    enabled: open,
  });

  const sheetProblemsCache = queryClient.getQueryData<TSheetProblem[]>([
    "sheet-problems",
    sheetId,
  ]);
  const addedIds = new Set((sheetProblemsCache ?? []).map((prob) => prob.id));

  const mutation = useMutation({
    mutationFn: (problemId: string) =>
      addProblemToSheet(token, sheetId, problemId),
    onSuccess: () => {
      toast.success("Problem added to sheet");
      queryClient.invalidateQueries({ queryKey: ["sheet-problems", sheetId] });
    },
    onError: (err) =>
      toast.error(err instanceof Error ? err.message : "Failed to add problem"),
  });

  const filtered = (allProblems ?? []).filter((prob) =>
    prob.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) setSearch("");
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="info"
            size="default"
            animation="none"
            className="gap-2"
          >
            <PlusCircleIcon
              weight="duotone"
              size={18}
            />
            Add Problem
          </Button>
        }
      />
      <DialogPopup className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Add Problem to Sheet</DialogTitle>
          <DialogDescription>
            Pick a problem from the list to add it to this sheet.
          </DialogDescription>
        </DialogHeader>
        <input
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring mb-1"
          placeholder="Search problems…"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />
        <ScrollArea className="h-60 -mx-1 px-1">
          {loadingAll ? (
            <div className="flex items-center justify-center py-10">
              <CircleNotchIcon
                className="animate-spin text-muted-foreground"
                size={24}
                weight="duotone"
              />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-10">
              No problems found
            </p>
          ) : (
            <div className="flex flex-col gap-0.5 pb-2">
              {filtered.map((problem) => {
                const alreadyIn = addedIds.has(problem.id);
                return (
                  <button
                    key={problem.id}
                    type="button"
                    disabled={alreadyIn || mutation.isPending}
                    onClick={() => mutation.mutate(problem.id)}
                    className={cn(
                      "flex items-center justify-between w-full rounded-md px-3 py-2.5 text-left text-sm transition-colors",
                      alreadyIn
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-muted cursor-pointer",
                    )}
                  >
                    <span className="flex-1 min-w-0 truncate font-medium pr-3">
                      {problem.title}
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <DifficultyBadge difficulty={problem.difficulty} />
                      {alreadyIn && (
                        <CheckCircleIcon
                          size={16}
                          weight="fill"
                          className="text-emerald-500"
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </DialogPopup>
    </Dialog>
  );
}

export function SheetCard({ sheet }: { sheet: TSheet }) {
  const router = useRouter();
  const { user, token } = useAuth();
  const isCreator = !!user && user.id === sheet.creator.id;

  const { data: sheetProblems, isLoading: problemsLoading } = useQuery<
    TSheetProblem[]
  >({
    queryKey: ["sheet-problems", sheet.id],
    queryFn: () => getSheetProblems(sheet.id),
  });

  const problemCount = sheetProblems?.length ?? 0;

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className={cn(
              "w-full text-left rounded-xl overflow-hidden",
              "ring-1 ring-foreground/10 bg-card",
              "hover:ring-foreground/25 hover:shadow-md transition-all duration-200 cursor-pointer",
            )}
          >
            <div className="flex items-start justify-between gap-2 px-4 pt-4 pb-1">
              <div className="flex flex-wrap gap-1.5">
                {sheet.categories.slice(0, 4).map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="text-xs px-2 py-0 h-5 font-normal"
                  >
                    {cat}
                  </Badge>
                ))}
                {sheet.categories.length > 4 && (
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-0 h-5 font-normal"
                  >
                    +{sheet.categories.length - 4}
                  </Badge>
                )}
              </div>
              <Badge
                variant="outline"
                className="text-xs flex items-center gap-1 shrink-0 h-5 px-2"
              >
                {sheet.visibility === "public" ? (
                  <GlobeIcon size={9} />
                ) : (
                  <LockSimpleIcon size={9} />
                )}
                {sheet.visibility}
              </Badge>
            </div>
            <div className="px-4 pt-2 pb-3">
              <p className="font-instrumental-serif text-[15px] font-semibold tracking-wide leading-snug text-card-foreground">
                {sheet.title}
              </p>
              {sheet.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                  {sheet.description}
                </p>
              )}
            </div>
            <div
              className={cn(
                "flex items-center justify-between px-4 py-2.5 border-t",
                "bg-[repeating-linear-gradient(45deg,var(--muted)_0px,var(--muted)_1px,transparent_1px,transparent_6px),repeating-linear-gradient(-45deg,var(--muted)_0px,var(--muted)_1px,transparent_1px,transparent_6px)]",
              )}
            >
              <span className="flex items-center gap-2">
                <Avatar className="size-5">
                  <AvatarImage
                    src={sheet.creator.avatar ?? ""}
                    alt={sheet.creator.name}
                  />
                  <AvatarFallback className="text-[10px]">
                    {sheet.creator.name?.[0] ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground font-medium">
                  {sheet.creator.name?.split(" ")[0]}
                </span>
              </span>
              <span className="text-xs text-muted-foreground">
                {problemsLoading ? "—" : problemCount}{" "}
                {problemCount === 1 ? "problem" : "problems"}
              </span>
            </div>
          </button>
        }
      />

      <DialogPopup
        className="sm:max-w-4xl w-full"
        showCloseButton
        containerClassName="sm:max-w-full p-0 gap-0"
      >
        <div className="flex items-start gap-4 px-6 pt-6 pb-5 border-b">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <Badge
                variant="outline"
                className="text-xs flex items-center gap-1"
              >
                {sheet.visibility === "public" ? (
                  <GlobeIcon size={10} />
                ) : (
                  <LockSimpleIcon size={10} />
                )}
                {sheet.visibility}
              </Badge>
              {sheet.categories.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="text-xs"
                >
                  {cat}
                </Badge>
              ))}
            </div>
            <p className="font-instrumental-serif text-2xl font-bold tracking-wide leading-tight">
              {sheet.title}
            </p>
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Avatar className="size-5">
                  <AvatarImage
                    src={sheet.creator.avatar ?? ""}
                    alt={sheet.creator.name}
                  />
                  <AvatarFallback className="text-[10px]">
                    {sheet.creator.name?.[0] ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {sheet.creator.name}
                </span>
              </span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-sm text-muted-foreground">
                {problemsLoading ? "…" : problemCount}{" "}
                {problemCount === 1 ? "problem" : "problems"}
              </span>
            </div>
            {sheet.description && (
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                {sheet.description}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[3.5rem_1fr_6.5rem] gap-2 px-6 py-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-widest bg-muted/40 border-b">
          <span>#</span>
          <span>Title</span>
          <span className="text-right">Difficulty</span>
        </div>

        <ScrollArea className="max-h-[40vh]">
          {problemsLoading ? (
            <div className="flex items-center justify-center py-16">
              <CircleNotchIcon
                size={28}
                weight="duotone"
                className="animate-spin text-muted-foreground"
              />
            </div>
          ) : problemCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
              <CircleIcon
                size={44}
                weight="thin"
              />
              <p className="text-sm font-medium">No problems yet</p>
              {isCreator && (
                <p className="text-xs opacity-70">
                  Use the button below to add problems to this sheet
                </p>
              )}
            </div>
          ) : (
            <div className="divide-y">
              {sheetProblems?.map((problem, idx) => (
                <button
                  key={problem.id}
                  type="button"
                  onClick={() => router.push(`/challenges/${problem.id}`)}
                  className="grid grid-cols-[3.5rem_1fr_6.5rem] gap-2 px-6 py-3.5 w-full text-left hover:bg-muted/50 transition-colors group"
                >
                  <span className="text-sm text-muted-foreground self-center">
                    {idx + 1}
                  </span>
                  <span className="self-center min-w-0">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors truncate block">
                      {problem.title}
                    </span>
                  </span>
                  <span className="self-center flex justify-end">
                    <DifficultyBadge difficulty={problem.difficulty} />
                  </span>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {isCreator && token && (
          <DialogFooter className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              You created this sheet
            </span>
            <AddProblemDialog
              sheetId={sheet.id}
              token={token}
            />
          </DialogFooter>
        )}
      </DialogPopup>
    </Dialog>
  );
}

export default SheetCard;
