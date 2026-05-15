"use client";

import TestCase from "./TestCase";

interface ITestCaseData {
  id: string;
  input: string;
  output: string;
}

interface IAddTestCasesProps {
  testCases: ITestCaseData[];
  onChange: (testCases: ITestCaseData[]) => void;
  onSave?: (testCase: ITestCaseData) => void;
  savingId?: string;
}

const AddTestCases = ({
  testCases,
  onChange,
  onSave,
  savingId,
}: IAddTestCasesProps) => {
  function updateTestCase(id: string, data: { input: string; output: string }) {
    onChange(testCases.map((tc) => (tc.id === id ? { ...tc, ...data } : tc)));
  }

  function deleteTestCase(id: string) {
    onChange(testCases.filter((tc) => tc.id !== id));
  }

  return (
    <div className="w-full mt-4 flex flex-col gap-2">
      <p className="text-xl font-semibold font-instrumental-serif">
        Add Test Cases
      </p>
      <div>
        <div>
          {testCases.map((tc) => {
            return (
              <TestCase
                key={tc.id}
                input={tc.input}
                output={tc.output}
                onChange={(data) => updateTestCase(tc.id, data)}
                onDelete={() => deleteTestCase(tc.id)}
                onSave={() => onSave?.(tc)}
                isSaving={savingId === tc.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddTestCases;
