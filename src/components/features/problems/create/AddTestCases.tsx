"use client";

import { PlusCircleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import TestCase from "./TestCase";

const AddTestCases = () => {
  const [testCases, setTestCases] = useState<string[]>([]);

  function addTestCase() {
    setTestCases([...testCases, crypto.randomUUID()]);
  }

  return (
    <div className="w-full mt-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold font-instrumental-serif">
          Add Test Cases
        </p>
        <Button
          variant="info"
          size="lg"
          onClick={addTestCase}
        >
          Add Test Case
          <PlusCircleIcon
            size={32}
            weight="duotone"
          />{" "}
        </Button>
      </div>
      <div>
        <div>
          {testCases.map((id) => {
            return <TestCase key={id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AddTestCases;
