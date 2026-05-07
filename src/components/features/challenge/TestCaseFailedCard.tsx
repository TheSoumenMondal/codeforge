import { BadgeAdditional } from "@/components/ui/badge-2";
import { Card, CardContent } from "@/components/ui/card";

interface ITestCaseFailedCardProps {
  testCaseNumber: number;
  input: string;
  expected: string;
  output: string;
}

const TestCaseFailedCard = ({
  testCaseNumber,
  input,
  expected,
  output,
}: ITestCaseFailedCardProps) => {
  return (
    <Card className="rounded-md">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Test Case {testCaseNumber}</h3>

          <BadgeAdditional
            appearance={"light"}
            variant={"destructive"}
          >
            Failed
          </BadgeAdditional>
        </div>

        <div className="space-y-2 text-sm">
          <div>
            <p className="text-secondary-foreground">Input</p>

            <pre className="mt-1 overflow-x-auto rounded-md bg-accent p-2 border-dashed border">
              {input}
            </pre>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-secondary-foreground">Expected</p>

              <div className="mt-1 rounded-md bg-accent p-2 text-xs border border-dashed">
                {expected}
              </div>
            </div>

            <div>
              <p className="text-secondary-foreground">Output</p>

              <div className="mt-1 rounded-md bg-accent p-2 text-xs border border-dashed">
                {output}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCaseFailedCard;
