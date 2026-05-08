"use client";

import {
  CircleIcon,
  SmileyIcon,
  SmileyMehIcon,
  SmileyXEyesIcon,
} from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  createCodeStub,
  createProblem,
  createTestCase,
  updateCodeStub,
  updateProblem,
  updateTestCase,
} from "@/api/services/problem.service";
import AddTestCases from "@/components/features/problems/create/AddTestCases";
import CodeStubSection from "@/components/features/problems/create/CodeStubSection";
import CppLittleCodeEditor from "@/components/features/problems/create/CppLittleCodeEditor";
// import { useProblem } from "@/hooks/useProblem";
import {
  getCodeStubContent,
  normalizeCodeStubLanguage,
  type TCodeStubEditorData,
} from "@/components/features/problems/create/codeStubEditor.utils";
import JavaLittleCodeEditor from "@/components/features/problems/create/JavaLittleCodeEditor";
import JavaScriptLittleCodeEditor from "@/components/features/problems/create/JavaScriptLitteleCodeEditor";
import PythonLittleCodeEditor from "@/components/features/problems/create/PyhtonLittleCodeEditor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { initialCodes } from "@/constant/initial-code";
import { useAuth } from "@/hooks/useAuth";
import { useProblem } from "@/hooks/useProblem";
import type {
  TCreateProblemRequestPayload,
  TUpdateProblemRequestPayload,
} from "@/types/problem";
import { normalizeTestCase, normalizeTestCases } from "@/utils/testCase.utils";

type TCodeStubLanguage = keyof typeof initialCodes;

const page = () => {
  const { user, token } = useAuth();
  // const { mode } = useProblem();
  const queryClient = useQueryClient();

  const {
    mode,
    setMode,
    currentProblemInEditor,
    setCurrentProblemInEditor,
    codeStubsState,
    setCodeStubsState,
    testCasesState,
    setTestCasesState,
    hasJustSavedProblem,
    setHasJustSavedProblem,
    hasJustSavedStub,
    setHasJustSavedStub,
    resetEditorState,
  } = useProblem();

  const createProblemMutation = useMutation({
    mutationKey: ["create-problem"],
    mutationFn: async (payload: TCreateProblemRequestPayload) => {
      if (!token) {
        throw new Error("Please sign in before creating a problem.");
      }

      return createProblem(token, payload);
    },
    onSuccess: async (data, variables) => {
      if (data.id) {
        toast.success("Problem created successfully!");
        setCurrentProblemInEditor({
          id: data.id,
          title: variables.title,
          description: variables.description,
          difficulty: variables.difficulty,
          codeStubs: [],
          testCases: [],
        });
        setHasJustSavedProblem(true);
        await queryClient.invalidateQueries({ queryKey: ["problems"] });
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create problem",
      );
    },
  });

  const updateProblemMutation = useMutation({
    mutationKey: ["update-problem"],
    mutationFn: async (payload: TUpdateProblemRequestPayload) => {
      if (!token) {
        throw new Error("Please sign in before updating a problem.");
      }
      if (!currentProblemInEditor?.id) {
        throw new Error("No active problem to update.");
      }
      return updateProblem(token, currentProblemInEditor.id, payload);
    },
    onSuccess: async (data, variables) => {
      if (data.id) {
        toast.success("Problem updated successfully!");
        setCurrentProblemInEditor({
          id: data.id,
          title: variables.title || data.title,
          description: variables.description || data.description,
          difficulty: variables.difficulty || data.difficulty,
          codeStubs: currentProblemInEditor?.codeStubs || [],
          testCases: currentProblemInEditor?.testCases || [],
        });
        await queryClient.invalidateQueries({ queryKey: ["problems"] });
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update problem",
      );
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      difficulty: "easy" as TCreateProblemRequestPayload["difficulty"],
    },
    onSubmit: async ({ value }) => {
      if (mode === "create") {
        await createProblemMutation.mutateAsync({
          title: value.title.trim(),
          description: value.description.trim(),
          difficulty: value.difficulty,
        });
      } else {
        await updateProblemMutation.mutateAsync({
          title: value.title.trim(),
          description: value.description.trim(),
          difficulty: value.difficulty,
        });
      }
    },
  });

  // Sync form with currentProblemInEditor when it changes
  useEffect(() => {
    if (currentProblemInEditor) {
      form.setFieldValue("title", currentProblemInEditor.title);
      form.setFieldValue("description", currentProblemInEditor.description);
      form.setFieldValue("difficulty", currentProblemInEditor.difficulty);

      // Sync code stubs if they exist in the editor's current problem
      if (currentProblemInEditor.codeStubs.length > 0) {
        setCodeStubsState((prev) => {
          const merged = { ...prev };

          for (const stub of currentProblemInEditor.codeStubs) {
            const lang = normalizeCodeStubLanguage(stub.language);
            const stubContent = getCodeStubContent(stub as TCodeStubEditorData);
            if (lang === "cpp") {
              merged.cpp = {
                start: stubContent.start || prev.cpp.start,
                user: stubContent.user || prev.cpp.user,
                end: stubContent.end || prev.cpp.end,
              };
            } else if (lang === "java") {
              merged.java = {
                start: stubContent.start || prev.java.start,
                user: stubContent.user || prev.java.user,
                end: stubContent.end || prev.java.end,
              };
            } else if (lang === "python") {
              merged.python = {
                start: stubContent.start || prev.python.start,
                user: stubContent.user || prev.python.user,
                end: stubContent.end || prev.python.end,
              };
            } else if (lang === "javascript") {
              merged.javascript = {
                start: stubContent.start || prev.javascript.start,
                user: stubContent.user || prev.javascript.user,
                end: stubContent.end || prev.javascript.end,
              };
            }
          }

          // only update if something actually changed
          const isSame =
            merged.cpp.start === prev.cpp.start &&
            merged.cpp.user === prev.cpp.user &&
            merged.cpp.end === prev.cpp.end &&
            merged.java.start === prev.java.start &&
            merged.java.user === prev.java.user &&
            merged.java.end === prev.java.end &&
            merged.python.start === prev.python.start &&
            merged.python.user === prev.python.user &&
            merged.python.end === prev.python.end &&
            merged.javascript.start === prev.javascript.start &&
            merged.javascript.user === prev.javascript.user &&
            merged.javascript.end === prev.javascript.end;

          return isSame ? prev : merged;
        });
      }

      // Sync test cases if they exist
      if (currentProblemInEditor.testCases.length > 0) {
        setTestCasesState(normalizeTestCases(currentProblemInEditor.testCases));
      }
    } else {
      form.setFieldValue("title", "");
      form.setFieldValue("description", "");
      form.setFieldValue("difficulty", "easy");
      resetEditorState();
    }
  }, [
    currentProblemInEditor,
    form,
    setCodeStubsState,
    setTestCasesState,
    resetEditorState,
  ]);

  const saveCodeStubMutation = useMutation({
    mutationKey: ["save-code-stub"],
    mutationFn: async (payload: {
      canonicalLanguage: TCodeStubLanguage;
      startCode: string;
      userCode: string;
      endCode: string;
    }) => {
      if (!token) throw new Error("Please sign in.");
      if (!currentProblemInEditor?.id) throw new Error("No active problem.");

      const existingStub = currentProblemInEditor.codeStubs.find(
        (stub) =>
          normalizeCodeStubLanguage(stub.language) ===
          payload.canonicalLanguage,
      );

      if (existingStub) {
        return updateCodeStub(token, {
          problemId: currentProblemInEditor.id,
          language: payload.canonicalLanguage,
          startCode: payload.startCode,
          userCode: payload.userCode,
          endCode: payload.endCode,
        });
      }

      return createCodeStub(token, {
        problemId: currentProblemInEditor.id,
        language: payload.canonicalLanguage,
        startCode: payload.startCode,
        userCode: payload.userCode,
        endCode: payload.endCode,
      });
    },
    onSuccess: (data) => {
      toast.success("Code stub saved!");
      // Update local store with new stub
      if (currentProblemInEditor) {
        const updatedStubs = [...currentProblemInEditor.codeStubs];
        const normalizedStub = {
          ...data,
          startCode: data.startCode ?? data.start_code ?? "",
          userCode: data.userCode ?? data.user_code ?? "",
          endCode: data.endCode ?? data.end_code ?? "",
        };
        const index = updatedStubs.findIndex((stub) => stub.id === data.id);
        if (index !== -1) {
          updatedStubs[index] = normalizedStub;
        } else {
          updatedStubs.push(normalizedStub);
        }
        setCurrentProblemInEditor({
          ...currentProblemInEditor,
          codeStubs: updatedStubs,
        });
      }
      // Also update the editor's code stubs state so editors don't get cleared
      const savedLang = normalizeCodeStubLanguage(data.language);
      if (!savedLang) {
        return;
      }
      const savedStub = getCodeStubContent(data as TCodeStubEditorData);
      setCodeStubsState((prev) => ({
        ...prev,
        [savedLang]: {
          start: savedStub.start || prev[savedLang].start,
          user: savedStub.user || prev[savedLang].user,
          end: savedStub.end || prev[savedLang].end,
        },
      }));

      // Set the saved stub state based on the language returned from API
      if (mode === "create") {
        setHasJustSavedStub(savedLang);
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to save stub",
      );
    },
  });

  const handleSaveCodeStub = async (language: TCodeStubLanguage) => {
    const stub = codeStubsState[language];

    // Validate that at least one part of the code stub is not empty
    if (!stub.start.trim() && !stub.user.trim() && !stub.end.trim()) {
      toast.error(
        `Please add at least one section (start, user, or end code) for ${language}`,
      );
      return;
    }

    await saveCodeStubMutation.mutateAsync({
      canonicalLanguage: language,
      startCode: stub.start,
      userCode: stub.user,
      endCode: stub.end,
    });
  };

  const isStubSavedInCurrentProblem = (language: TCodeStubLanguage) => {
    return Boolean(
      currentProblemInEditor?.codeStubs.some(
        (stub) => normalizeCodeStubLanguage(stub.language) === language,
      ),
    );
  };

  const codeStubSections = [
    {
      language: "cpp" as const,
      title: "Add CodeStubs for C++",
      editor: CppLittleCodeEditor,
      description: {
        start: "Starting code that will be hidden from users.",
        user: "User code that will be shown to users.",
        end: "Ending code that will be shown to users.",
      },
      buttonLabel: "Save C++ CodeStub",
      savingLabel: "Saving C++ Stub...",
      savedLabel: "C++ CodeStub Saved",
    },
    {
      language: "java" as const,
      title: "Add CodeStubs for Java",
      editor: JavaLittleCodeEditor,
      description: {
        start: "Starting code that will be hidden from users.",
        user: "User code that will be shown to users.",
        end: "Ending code that will be shown to users.",
      },
      buttonLabel: "Save Java CodeStub",
      savingLabel: "Saving Java Stub...",
      savedLabel: "Java CodeStub Saved",
    },
    {
      language: "python" as const,
      title: "Add CodeStubs for Python",
      editor: PythonLittleCodeEditor,
      description: {
        start: "Starting code that will be hidden from users.",
        user: "User code that will be shown to users.",
        end: "Ending code that will be shown to users.",
      },
      buttonLabel: "Save Python CodeStub",
      savingLabel: "Saving Python Stub...",
      savedLabel: "Python CodeStub Saved",
    },
    {
      language: "javascript" as const,
      title: "Add CodeStubs for JavaScript",
      editor: JavaScriptLittleCodeEditor,
      description: {
        start: "Starting code that will be hidden from users.",
        user: "User code that will be shown to users.",
        end: "Ending code that will be shown to users.",
      },
      buttonLabel: "Save JavaScript CodeStub",
      savingLabel: "Saving JavaScript Stub...",
      savedLabel: "JavaScript CodeStub Saved",
    },
  ];

  const saveTestCase = async (payload: {
    id: string;
    input: string;
    output: string;
  }) => {
    if (!token) {
      throw new Error("Please sign in.");
    }

    if (!currentProblemInEditor?.id) {
      throw new Error("No active problem.");
    }

    const existingTestCase = currentProblemInEditor.testCases.find(
      (tc) => tc.id === payload.id,
    );

    if (existingTestCase) {
      return updateTestCase(token, {
        problemId: currentProblemInEditor.id,
        testCaseId: payload.id,
        input: payload.input,
        output: payload.output,
      });
    }

    return createTestCase(token, currentProblemInEditor.id, {
      input: payload.input,
      output: payload.output,
    });
  };

  const saveTestCaseMutation = useMutation({
    mutationKey: ["save-test-case"],
    mutationFn: saveTestCase,
    onSuccess: (data, variables) => {
      toast.success("Test case saved!");
      if (!currentProblemInEditor) return;

      const updatedTestCases = [...currentProblemInEditor.testCases];
      const serverRowIndex = updatedTestCases.findIndex(
        (tc) => tc.id === variables.id || tc.id === data.id,
      );
      if (serverRowIndex !== -1) {
        updatedTestCases[serverRowIndex] = data;
      } else {
        updatedTestCases.push(data);
      }

      setCurrentProblemInEditor({
        ...currentProblemInEditor,
        testCases: updatedTestCases,
      });

      const normalizedTestCase = normalizeTestCase(data);
      setTestCasesState((prev) => {
        const next = [...prev];
        const ix = next.findIndex(
          (tc) => tc.id === variables.id || tc.id === normalizedTestCase.id,
        );
        if (ix !== -1) {
          next[ix] = normalizedTestCase;
          return next;
        }
        return [...prev, normalizedTestCase];
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to save test case",
      );
    },
  });

  return (
    <div className="flex h-full min-h-0 min-w-0 max-h-[calc(100vh-57px)] flex-col overflow-hidden">
      <div className="flex h-24 shrink-0 items-end justify-between gap-2 border-b bg-[repeating-linear-gradient(45deg,var(--muted)_0px,var(--muted)_1px,transparent_1px,transparent_6px),repeating-linear-gradient(-45deg,var(--muted)_0px,var(--muted)_1px,transparent_1px,transparent_6px)] p-3 relative">
        <div className="flex flex-col gap-2">
          <Avatar>
            <AvatarImage
              src={user?.avatar_url || "/images/avatar/default_dp.png"}
            />
          </Avatar>
          <p className="font-instrumental-serif text-2xl">
            Contributing as {user?.name.split(" ")[0]}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCurrentProblemInEditor(null);
              setMode("create");
              resetEditorState();
              toast.info("Editor cleared.");
            }}
          >
            Clear Editor
          </Button>
          <Switch
            size="small"
            value={mode}
            onChange={(val) => {
              setMode(val as "create" | "edit");
              setHasJustSavedProblem(false);
              setHasJustSavedStub(null);
            }}
          >
            <Switch.Control
              label="Create"
              value="create"
            />
            <Switch.Control
              label="Edit"
              value="edit"
            />
          </Switch>
        </div>
      </div>

      <ScrollArea className="min-h-0 min-w-0 flex-1 p-4">
        <form
          className="flex min-w-0 max-w-full flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <Card decorations>
            <div className="flex flex-col gap-2 px-2">
              <form.Field
                name="title"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim()
                      ? "Title is required"
                      : value.trim().length < 6
                        ? "Title must be at least 6 characters"
                        : undefined,
                }}
              >
                {(field) => {
                  const isTouched = field.state.meta.isTouched;
                  const isValid = field.state.meta.isValid;
                  const validationClass = isTouched
                    ? isValid
                      ? ""
                      : "border-rose-500 ring-0"
                    : "";

                  return (
                    <>
                      <Label
                        htmlFor={field.name}
                        className="font-serif text-xl"
                      >
                        Title of the Problem
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Find the missing number in an array"
                        aria-invalid={isTouched && !isValid}
                        className={validationClass}
                      />
                    </>
                  );
                }}
              </form.Field>
            </div>
          </Card>

          <Card decorations>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between gap-4 flex-wrap">
                <div>
                  <Label className="font-serif flex flex-col gap-1 items-start">
                    <p className="text-xl">Problem Description</p>
                    <p>
                      Make sure to paste the problem details here in markdown
                      format.
                    </p>
                  </Label>
                </div>
                <div>
                  <Button
                    type="button"
                    animation="none"
                  >
                    Use Markdown Editor
                  </Button>
                </div>
              </div>

              <form.Field
                name="description"
                validators={{
                  onChange: ({ value }) =>
                    !value.trim()
                      ? "Description is required"
                      : value.trim().length < 30
                        ? "Description must be at least 30 characters"
                        : undefined,
                }}
              >
                {(field) => {
                  const isTouched = field.state.meta.isTouched;
                  const isValid = field.state.meta.isValid;
                  const validationClass = isTouched
                    ? isValid
                      ? ""
                      : "border-rose-500 ring-1 ring-rose-200"
                    : "";

                  return (
                    <div className="w-full px-2">
                      <Textarea
                        id={field.name}
                        name={field.name}
                        className={`w-full max-w-full min-h-50 wrap-break-word whitespace-pre-wrap overflow-auto resize-y ${validationClass}`}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Describe the task, constraints, and examples in markdown."
                        aria-invalid={isTouched && !isValid}
                      />
                    </div>
                  );
                }}
              </form.Field>
            </div>
          </Card>

          <Card decorations>
            <form.Field name="difficulty">
              {(field) => {
                const isTouched = field.state.meta.isTouched;
                const isValid = field.state.meta.isValid;
                const validationClass = isTouched
                  ? isValid
                    ? "border-emerald-500 ring-1 ring-emerald-200"
                    : "border-rose-500 ring-1 ring-rose-200"
                  : "";

                return (
                  <CardDescription>
                    <Label className="font-serif text-xl text-primary">
                      Difficulty of Problem
                    </Label>
                    <div className="flex flex-col gap-2 px-2 pt-2">
                      <Select
                        value={field.state.value}
                        onValueChange={(val) =>
                          field.handleChange(val as "easy" | "medium" | "hard")
                        }
                      >
                        <SelectTrigger
                          className={`w-full ${validationClass}`}
                          onBlur={field.handleBlur}
                          aria-invalid={isTouched && !isValid}
                        >
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent className={"px-2"}>
                          <SelectGroup>
                            <SelectLabel>Difficulty</SelectLabel>
                            <SelectItem value="easy">
                              <div className="w-full flex items-center gap-3 font-semibold text-sm">
                                <SmileyIcon
                                  size={32}
                                  weight="duotone"
                                />
                                Easy
                              </div>
                            </SelectItem>
                            <SelectItem value="medium">
                              <div className="w-full flex items-center gap-3 font-semibold text-sm">
                                <SmileyMehIcon
                                  size={32}
                                  weight="duotone"
                                />
                                Medium
                              </div>
                            </SelectItem>
                            <SelectItem value="hard">
                              <div className="w-full flex items-center gap-3 font-semibold text-sm">
                                <SmileyXEyesIcon
                                  size={32}
                                  weight="duotone"
                                />
                                Hard
                              </div>
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardDescription>
                );
              }}
            </form.Field>

            <CardFooter className="px-0">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) =>
                  (() => {
                    const isBusy =
                      isSubmitting ||
                      createProblemMutation.isPending ||
                      updateProblemMutation.isPending;

                    return (
                      <Button
                        animation="none"
                        className="w-full"
                        size="lg"
                        type="submit"
                        variant="info"
                        disabled={
                          !canSubmit ||
                          isSubmitting ||
                          createProblemMutation.isPending ||
                          updateProblemMutation.isPending ||
                          (mode === "create" && hasJustSavedProblem)
                        }
                      >
                        {mode === "create" ? (
                          isBusy ? (
                            <span className="flex items-center gap-2">
                              <CircleIcon
                                weight="duotone"
                                className="animate-spin"
                              />
                              Creating
                            </span>
                          ) : hasJustSavedProblem ? (
                            "Problem Created"
                          ) : (
                            "Create Problem"
                          )
                        ) : isBusy ? (
                          <span className="flex items-center gap-2">
                            <CircleIcon
                              weight="duotone"
                              className="animate-spin"
                            />
                            Saving
                          </span>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    );
                  })()
                }
              </form.Subscribe>
            </CardFooter>
          </Card>
        </form>

        <Separator />

        <p className="font-serif text-sm my-4">
          Please make sure you first Save the problem details and then create
          the codestubs and testcases for the problem. Otherwise, you might lose
          the problem details that you have entered.
        </p>

        <Card
          decorations
          className="min-w-0 max-w-full"
        >
          <CardTitle className="text-lg font-serif">
            Enter the Codestubs
          </CardTitle>
          <CardDescription>
            Please make sure to enter the codestubs for the problem in here
          </CardDescription>

          {codeStubSections.map((section) => {
            const isSaved =
              mode === "create" &&
              (hasJustSavedStub === section.language ||
                isStubSavedInCurrentProblem(section.language));

            return (
              <CodeStubSection
                key={section.language}
                title={section.title}
                description={section.description}
                editor={section.editor}
                values={codeStubsState[section.language]}
                onChange={(next) =>
                  setCodeStubsState((prev) => ({
                    ...prev,
                    [section.language]: {
                      ...prev[section.language],
                      ...next,
                    },
                  }))
                }
                onSave={() => handleSaveCodeStub(section.language)}
                buttonLabel={
                  mode === "create"
                    ? section.buttonLabel
                    : section.buttonLabel.replace("Save", "Update")
                }
                savingLabel={section.savingLabel}
                savedLabel={section.savedLabel}
                isSaving={saveCodeStubMutation.isPending}
                isSaved={isSaved}
                disabled={
                  !currentProblemInEditor?.id ||
                  saveCodeStubMutation.isPending ||
                  isSaved
                }
              />
            );
          })}
        </Card>

        <Separator />

        <div>
          <p className="text-sm my-4 font-serif">
            Please make sure to add the test cases for the problem in here. You
            can add as many test cases as you want and also you can edit or
            delete the test cases whenever you want.
          </p>
        </div>

        <Separator decoration />

        <AddTestCases
          testCases={testCasesState}
          onChange={(val) => setTestCasesState(val)}
          onSave={(tc) => saveTestCaseMutation.mutateAsync(tc)}
          savingId={saveTestCaseMutation.variables?.id}
        />

        <Button
          variant="info"
          size="lg"
          className="w-full"
          type="button"
          onClick={() => {
            setTestCasesState([
              ...testCasesState,
              { id: crypto.randomUUID(), input: "", output: "" },
            ]);
          }}
        >
          Add Test Case
        </Button>
      </ScrollArea>
    </div>
  );
};

export default page;
