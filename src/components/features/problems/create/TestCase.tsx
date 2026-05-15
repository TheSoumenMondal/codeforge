import { CheckIcon, CircleIcon, TrashIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ITestCaseProps {
  input: string;
  output: string;
  onChange: (data: { input: string; output: string }) => void;
  onDelete: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

const TestCase = ({
  input,
  output,
  onChange,
  onDelete,
  onSave,
  isSaving = false,
}: ITestCaseProps) => {
  return (
    <div className="flex gap-2 my-2 items-center">
      <Input
        placeholder="Input test case"
        value={input}
        onChange={(events) => onChange({ input: events.target.value, output })}
      />
      <Input
        placeholder="Expected output test case"
        value={output}
        onChange={(events) => onChange({ input, output: events.target.value })}
      />
      <Button
        type="button"
        variant="success"
        size="icon"
        onClick={onSave}
        disabled={isSaving || !input || !output}
      >
        {isSaving ? (
          <CircleIcon
            size={20}
            className="animate-spin"
          />
        ) : (
          <CheckIcon size={20} />
        )}
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="icon"
        onClick={onDelete}
      >
        <TrashIcon size={20} />
      </Button>
    </div>
  );
};

export default TestCase;
