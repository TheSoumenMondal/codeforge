"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getProblemById } from "@/api/services/problem.service";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CodeEditor } from "./CodeEditor";
import LeftMarkdownRender from "./LeftMarkdownRender";

const EditorLayout = () => {
  const params = useParams();
  const problemId = params.id as string | undefined;

  const { data, error, isLoading } = useQuery({
    queryKey: ["problem-all-data", problemId],
    queryFn: () => getProblemById(problemId as string),
    enabled: Boolean(problemId),
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error || data === undefined) {
    return (
      <div className="text-red-500 py-8">
        Error: {error?.message || "An unknown error occurred"}
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ResizablePanelGroup
        orientation="horizontal"
        className="h-full w-full"
      >
        <ResizablePanel
          defaultSize={50}
          minSize={5}
        >
          <div className="h-full w-full min-w-0 overflow-hidden">
            <LeftMarkdownRender data={data} />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={50}
          minSize={5}
        >
          <div className="flex h-full items-center justify-center max-h-full min-w-0 overflow-hidden">
            <div className="w-full h-full min-w-0 px-4 py-4 pt-0 rounded-xl overflow-hidden">
              <CodeEditor data={data} />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default EditorLayout;
