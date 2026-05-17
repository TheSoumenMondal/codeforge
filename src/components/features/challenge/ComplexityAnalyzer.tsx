"use client";

import {
  CloudCheckIcon,
  CompassToolIcon,
  SpeedometerIcon,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChallengeSubmissionCodeStore } from "@/store/challenge-submission-code-store";

type TComplexityType =
  | "O(1)"
  | "O(log n)"
  | "O(n)"
  | "O(n log n)"
  | "O(n²)"
  | "O(n³)";

type TChartData = {
  size: number;
  complexity: number;
};

const generateData = (type: TComplexityType): TChartData[] => {
  const data: TChartData[] = [];

  for (let i = 1; i <= 10; i++) {
    let value = 0;

    switch (type) {
      case "O(1)":
        value = 5;
        break;

      case "O(log n)":
        value = Math.log2(i + 1) * 10;
        break;

      case "O(n)":
        value = i * 10;
        break;

      case "O(n log n)":
        value = i * Math.log2(i + 1) * 5;
        break;

      case "O(n²)":
        value = i * i;
        break;

      case "O(n³)":
        value = i * i * i * 0.2;
        break;
    }

    data.push({
      size: i,
      complexity: Number(value.toFixed(2)),
    });
  }

  return data;
};

const detectTimeComplexity = (code: string): TComplexityType => {
  const nestedLoops =
    (code.match(/for\s*\(.*?\)\s*{[\s\S]*?for\s*\(/g) || []).length > 0;

  const tripleLoops =
    (
      code.match(
        /for\s*\(.*?\)\s*{[\s\S]*?for\s*\(.*?\)\s*{[\s\S]*?for\s*\(/g,
      ) || []
    ).length > 0;

  const recursion = /function.*\([\s\S]*\)[\s\S]*return.*\(/.test(code);

  const loop = /for\s*\(|while\s*\(/.test(code);

  const binarySearch = /mid\s*=|left\s*=|right\s*=|binary/i.test(code);

  if (tripleLoops) return "O(n³)";
  if (nestedLoops) return "O(n²)";
  if (binarySearch) return "O(log n)";
  if (recursion && loop) return "O(n log n)";
  if (loop) return "O(n)";

  return "O(1)";
};

const detectSpaceComplexity = (code: string): string => {
  const arrays = /new Array|\[\]/g.test(code);
  const recursion = /function.*\(/g.test(code);

  if (arrays && recursion) return "O(n)";
  if (arrays) return "O(n)";
  if (recursion) return "O(log n)";

  return "O(1)";
};

const ComplexityAnalyzer = () => {
  const [open, setOpen] = useState<boolean>(false);

  const currentEditorCode = useChallengeSubmissionCodeStore(
    (store) => store.codeByLanguage[store.activeLanguage] ?? "",
  );

  const [timeComplexity, setTimeComplexity] =
    useState<TComplexityType>("O(n²)");

  const [spaceComplexity, setSpaceComplexity] = useState<string | null>(null);

  const chartData = useMemo<TChartData[]>(() => {
    return generateData(timeComplexity);
  }, [timeComplexity]);

  const handleTimeComplexity = (): void => {
    const result = detectTimeComplexity(currentEditorCode);
    setTimeComplexity(result);
  };

  const handleSpaceComplexity = (): void => {
    const result = detectSpaceComplexity(currentEditorCode);
    setSpaceComplexity(result);
  };

  return (
    <div className="h-full w-full">
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger
          render={
            <Button
              animation="none"
              variant="info"
              size="icon-lg"
            >
              <CompassToolIcon weight="duotone" />
            </Button>
          }
        />

        <DialogPopup className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-instrumental-serif tracking-wider">
              Complexity Analyzer
            </DialogTitle>

            <DialogDescription className="font-geist-sans">
              Analyze the estimated time and space complexity of your algorithm.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5">
            <p className="text-sm text-muted-foreground">
              Uses the code already written in the editor.
            </p>

            <ChartContainer
              className="relative h-72 w-full overflow-hidden rounded-xl border"
              config={{
                complexity: {
                  // FIX 3: Kept a single color token; Line stroke now matches it
                  color: "var(--chart-3)",
                  label: timeComplexity,
                },
              }}
            >
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  vertical={true}
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="size"
                  hide
                />

                <YAxis
                  hide
                  tickLine={false}
                  axisLine={false}
                  tick={false}
                />

                <Tooltip
                  content={(props: unknown) => {
                    const { active } = props as {
                      active?: boolean;
                      label?: number | string;
                    };
                    if (!active) return null;

                    return (
                      <div className="bg-background p-2 rounded shadow text-xs font-mono border border-dashed">
                        <div className="mt-1">
                          Time complexity:{" "}
                          <span className="font-medium">{timeComplexity}</span>
                        </div>
                        <div>
                          Space complexity:{" "}
                          <span className="font-medium">
                            {spaceComplexity ?? "O(1)"}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />

                <Line
                  dataKey="complexity"
                  type="monotone"
                  stroke="var(--color-complexity)"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>

          <DialogFooter className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              animation="colors"
              type="button"
              size="lg"
              variant="info"
              className="w-full"
              onClick={handleTimeComplexity}
            >
              <SpeedometerIcon weight="duotone" />
              Calculate Time Complexity
            </Button>

            <Button
              animation="colors"
              type="button"
              size="lg"
              variant="info"
              className="w-full"
              onClick={handleSpaceComplexity}
            >
              <CloudCheckIcon weight="duotone" />
              Calculate Space Complexity
            </Button>

            <Button
              onClick={() => setOpen(false)}
              className="w-full sm:col-span-2"
              animation="colors"
              type="button"
              size="lg"
              variant="warning"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </div>
  );
};

export default ComplexityAnalyzer;
