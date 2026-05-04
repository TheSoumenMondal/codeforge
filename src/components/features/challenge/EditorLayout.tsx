import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CodeEditor } from "./CodeEditor";

const EditorLayout = () => {
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
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel
          defaultSize={50}
          minSize={5}
        >
          <div className="flex h-full items-center justify-center p-6 max-h-full">
            <div className="w-full h-full">
              <CodeEditor />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default EditorLayout;
