import { PlusCircleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TestCase = () => {
  return (
    <div className="flex gap-2 my-2">
      <Input placeholder="Input test case" />
      <Input placeholder="Expected output test case" />
      <Button
        animation="colors"
        variant="warning"
        size="lg"
      >
        Add{" "}
        <PlusCircleIcon
          size={32}
          weight="duotone"
        />{" "}
      </Button>
    </div>
  );
};

export default TestCase;
