"use client";

import { defaultKeymap } from "@codemirror/commands";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  gutter,
  highlightActiveLine,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { vsCodeLight } from "@fsegurai/codemirror-theme-vscode-light";
import {
  CalendarHeartIcon,
  PaperPlaneTiltIcon,
  SpinnerIcon,
  TrayArrowDownIcon,
} from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { monokai } from "@uiw/codemirror-theme-monokai";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
  getSubmissionResult,
  submitCode,
} from "@/api/services/submission.service";
import EditorSettings from "@/components/features/challenge/Settings";
import TestCaseFailedCard from "@/components/features/challenge/TestCaseFailedCard";
import TestCasePassedCard from "@/components/features/challenge/TestCasePassedCard";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { TProblemTotalData } from "@/types/problem";
import type { TSubmissionResponseType } from "@/types/submission";

const LANGUAGES = [
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "js", label: "JavaScript" },
  { value: "python", label: "Python" },
] as const;

type TLanguageValue = (typeof LANGUAGES)[number]["value"];

enum SubmissionStatus {
  Pending = "pending",
  Running = "running",
  Accepted = "accepted",
  WrongAnswer = "wrong_answer",
  RuntimeError = "runtime_error",
  TimeLimitExceeded = "time_limit_exceeded",
  CompilationError = "compilation_error",
  InternalError = "internal_error",
}

type TSubmissionCreateResponse = {
  id: string;
};

const FINAL_STATUSES: SubmissionStatus[] = [
  SubmissionStatus.Accepted,
  SubmissionStatus.WrongAnswer,
  SubmissionStatus.RuntimeError,
  SubmissionStatus.TimeLimitExceeded,
  SubmissionStatus.CompilationError,
  SubmissionStatus.InternalError,
];

const submissionStatusConfig: Record<
  SubmissionStatus,
  { label: string; className: string }
> = {
  [SubmissionStatus.Pending]: {
    label: "Queued...",
    className: "text-yellow-500",
  },
  [SubmissionStatus.Running]: {
    label: "Running test cases...",
    className: "text-blue-500",
  },
  [SubmissionStatus.Accepted]: {
    label: "Accepted",
    className: "text-green-500",
  },
  [SubmissionStatus.WrongAnswer]: {
    label: "Wrong Answer",
    className: "text-red-500",
  },
  [SubmissionStatus.RuntimeError]: {
    label: "Runtime Error",
    className: "text-red-500",
  },
  [SubmissionStatus.TimeLimitExceeded]: {
    label: "Time Limit Exceeded",
    className: "text-orange-500",
  },
  [SubmissionStatus.CompilationError]: {
    label: "Compilation Error",
    className: "text-red-500",
  },
  [SubmissionStatus.InternalError]: {
    label: "Internal Error",
    className: "text-red-500",
  },
};

export function CodeEditor({ data }: { data: TProblemTotalData }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const { isAuthenticated, token } = useAuth();

  const defaultLang = (data.code_stubs?.[0]?.language ??
    "cpp") as TLanguageValue;
  const [language, setLanguage] = useState<TLanguageValue>(defaultLang);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const currentCodeRefs = useRef<Record<string, string>>({});

  useEffect(() => {
    if (!containerRef.current) return;

    let initialCode = currentCodeRefs.current[language];

    if (initialCode === undefined) {
      initialCode =
        data.code_stubs?.find((stub) => stub.language === language)
          ?.user_code ?? "";
      currentCodeRefs.current[language] = initialCode;
    }

    const langExtension =
      language === "cpp"
        ? cpp()
        : language === "java"
          ? java()
          : language === "python"
            ? python()
            : javascript();

    const themeExtensions = [resolvedTheme === "dark" ? monokai : vsCodeLight];

    const state = EditorState.create({
      doc: initialCode,
      extensions: [
        keymap.of(defaultKeymap),
        langExtension,
        gutter({ class: "y-sc" }),
        lineNumbers(),
        highlightActiveLine(),
        EditorView.lineWrapping,
        ...themeExtensions,
        EditorView.baseTheme({
          "&.cm-focused": { outline: "none !important" },
          "&.cm-focused .cm-content": { outline: "none" },
        }),
        EditorView.theme({
          "&": { height: "100%", fontSize: "14px" },
          ".cm-content": {
            fontFamily: "'Fira Code'",
            fontSize: "13px",
            fontWeight: "600",
            backgroundColor: resolvedTheme === "dark" ? "#272727" : "#F5F5F5",
          },
          ".cm-lineNumbers": {
            backgroundColor: resolvedTheme === "dark" ? "#272727" : "#F5F5F5",
            width: "20px",
            display: "flex",
            alignItems: "start",
          },
          ".cm-activeLine": {
            backgroundColor: resolvedTheme === "dark" ? "#272727" : "#F5F5F5",
          },
          ".cm-gutters": {
            backgroundColor: resolvedTheme === "dark" ? "#272727" : "#F5F5F5",
            borderRight: "none",
          },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            currentCodeRefs.current[language] = update.state.doc.toString();
          }
        }),
      ],
    });

    const view = new EditorView({ state, parent: containerRef.current });

    return () => view.destroy();
  }, [data, language, resolvedTheme]);

  const { mutate: handleSubmitCode, isPending: isSubmitting } = useMutation<
    TSubmissionCreateResponse,
    Error,
    { code: string; language: string }
  >({
    mutationFn: ({ code, language }) =>
      submitCode(token as string, code, language, data.id),
    onSuccess: (response) => {
      setSubmissionId(response.id);
      toast.success("Code submitted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit code");
    },
  });

  const { data: submissionResult } = useQuery<TSubmissionResponseType>({
    queryKey: ["submission-result", submissionId],
    queryFn: () => getSubmissionResult(token as string, submissionId as string),
    enabled: Boolean(isAuthenticated && token && submissionId),
    refetchInterval: (query) => {
      const status = query.state.data?.status as SubmissionStatus | undefined;
      if (!status) return 1500;
      if (FINAL_STATUSES.includes(status)) return false;
      return 1500;
    },
  });

  const showStatus = isSubmitting || submissionId || submissionResult;

  const currentStatus = isSubmitting
    ? SubmissionStatus.Pending
    : (submissionResult?.status ?? SubmissionStatus.Pending);

  const currentStatusConfig =
    submissionStatusConfig[currentStatus as SubmissionStatus] ??
    submissionStatusConfig[SubmissionStatus.Pending];

  return (
    <div className="w-full h-full rounded-md overflow-hidden flex flex-col">
      <div className="flex-1 min-h-0">
        <ResizablePanelGroup
          orientation="vertical"
          className="h-full w-full gap-2"
        >
          <ResizablePanel minSize={0}>
            <div className="h-full w-full rounded-xl border bg-background/85 shadow-sm overflow-hidden">
              <div className="h-full w-full p-1.5 bg-secondary">
                <div
                  ref={containerRef}
                  className="w-full h-full [&_.cm-editor]:outline-none [&_.cm-editor.cm-focused]:outline-none [&_.cm-editor.cm-focused]:ring-0"
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle
            withHandle
            className="my-1.5 bg-border/80"
          />

          <ResizablePanel
            defaultSize={5}
            minSize={45}
          >
            <div className="h-full w-full rounded-xl border bg-accent/80 shadow-sm overflow-hidden flex flex-col">
              {showStatus && (
                <div className="border-b bg-[repeating-linear-gradient(45deg,var(--muted)_0px,var(--muted)_1px,transparent_1px,transparent_6px),repeating-linear-gradient(-45deg,var(--muted)_0px,var(--muted)_1px,transparent_1px,transparent_6px)] p-3! border-t relative">
                  <div
                    className={cn(
                      "font-ubuntu-mono font-bold text-sm",
                      currentStatusConfig.className,
                    )}
                  >
                    {currentStatusConfig.label === "Queued..." ? (
                      <div className="flex gap-2 items-center">
                        <SpinnerIcon className="animate-spin" /> Running Test
                        Cases
                      </div>
                    ) : (
                      currentStatusConfig.label
                    )}
                  </div>
                </div>
              )}

              {submissionResult?.result && (
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-3 p-3">
                    {(() => {
                      try {
                        const results = JSON.parse(submissionResult.result);

                        if (Array.isArray(results)) {
                          return results.map((testCase, idx) =>
                            testCase.passed ? (
                              <TestCasePassedCard
                                key={idx}
                                testCaseNumber={idx + 1}
                                input={testCase.input}
                                expected={testCase.expected}
                                output={testCase.output}
                              />
                            ) : (
                              <TestCaseFailedCard
                                key={idx}
                                testCaseNumber={idx + 1}
                                input={testCase.input}
                                expected={testCase.expected}
                                output={testCase.output}
                              />
                            ),
                          );
                        }
                      } catch {
                        return (
                          <div className="text-muted-foreground text-xs">
                            {submissionResult.result}
                          </div>
                        );
                      }

                      return null;
                    })()}
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="sticky bottom-0 z-10 w-full bg-background p-3">
        <div className="max-w-full mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Select
              value={language}
              onValueChange={(val) => {
                if (val) setLanguage(val as TLanguageValue);
              }}
            >
              <SelectTrigger
                variant="default"
                size="default"
                className="min-w-20"
              >
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem
                    key={lang.value}
                    value={lang.value}
                  >
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <EditorSettings />

            <Button
              variant="default"
              size="icon-lg"
              animation="none"
            >
              <CalendarHeartIcon
                size={32}
                weight="duotone"
              />
            </Button>

            <Button
              variant="default"
              size="icon-lg"
              animation="none"
            >
              <TrayArrowDownIcon
                size={32}
                weight="duotone"
              />
            </Button>
          </div>

          <div>
            <Button
              disabled={!isAuthenticated || isSubmitting}
              animation="none"
              variant="info"
              size="lg"
              type="button"
              onClick={() => {
                handleSubmitCode({
                  code: currentCodeRefs.current[language] ?? "",
                  language,
                });
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
              <PaperPlaneTiltIcon
                size={32}
                weight="duotone"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
