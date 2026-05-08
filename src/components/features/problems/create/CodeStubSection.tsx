"use client";

import { CircleIcon } from "@phosphor-icons/react";
import type { ComponentType } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type TCodeStubEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

type TCodeStubDescriptions = {
  start: string;
  user: string;
  end: string;
};

type TCodeStubSectionProps = {
  title: string;
  description: TCodeStubDescriptions;
  editor: ComponentType<TCodeStubEditorProps>;
  values: {
    start: string;
    user: string;
    end: string;
  };
  onChange: (next: { start?: string; user?: string; end?: string }) => void;
  onSave: () => void;
  buttonLabel: string;
  savingLabel: string;
  savedLabel: string;
  isSaving: boolean;
  isSaved: boolean;
  disabled: boolean;
};

const CodeStubSection = ({
  title,
  description,
  editor: Editor,
  values,
  onChange,
  onSave,
  buttonLabel,
  savingLabel,
  savedLabel,
  isSaving,
  isSaved,
  disabled,
}: TCodeStubSectionProps) => {
  return (
    <div className="w-full min-w-0 max-w-full">
      <p className="text-lg font-serif mb-2">{title}</p>
      <Label className="font-bold text-sm font-serif my-2">Starting Code</Label>
      <p className="text-xs my-2">{description.start}</p>
      <Editor
        value={values.start}
        onChange={(val) => onChange({ start: val })}
      />

      <Separator />

      <Label className="text-sm font-serif my-2 font-bold">User Code</Label>
      <p className="text-xs my-2">{description.user}</p>
      <Editor
        value={values.user}
        onChange={(val) => onChange({ user: val })}
      />

      <Separator />

      <Label className="font-bold text-sm font-serif my-2">Ending Code</Label>
      <p className="text-xs my-2">{description.end}</p>
      <Editor
        value={values.end}
        onChange={(val) => onChange({ end: val })}
      />

      <Button
        className="mt-4 w-full"
        animation="none"
        size="lg"
        variant="info"
        type="button"
        onClick={onSave}
        disabled={disabled}
      >
        {isSaving ? (
          <span className="flex items-center gap-2">
            <CircleIcon
              weight="duotone"
              className="animate-spin"
            />
            {savingLabel}
          </span>
        ) : isSaved ? (
          savedLabel
        ) : (
          buttonLabel
        )}
      </Button>
    </div>
  );
};

export default CodeStubSection;
