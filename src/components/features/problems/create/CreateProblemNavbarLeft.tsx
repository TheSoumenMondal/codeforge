import { InfoIcon } from "@phosphor-icons/react";

const CreateProblemNavbarLeft = () => {
  return (
    <div className="w-full h-full flex items-center px-4 justify-between">
      <p className="font-instrumental-serif font-semibold">Create Problem</p>
      <span className="text-xs flex items-center flex-row gap-1 font-ubuntu-mono text-orange-500">
        <InfoIcon weight="duotone" />
        Create unique coding challenges
      </span>
    </div>
  );
};

export default CreateProblemNavbarLeft;
