"use state";
import {
  CloudCheckIcon,
  CompassToolIcon,
  SpeedometerIcon,
} from "@phosphor-icons/react";
import React from "react";
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

const quadraticData = [
  { size: 1, complexity: 1 },
  { size: 2, complexity: 4 },
  { size: 3, complexity: 9 },
  { size: 4, complexity: 16 },
  { size: 5, complexity: 25 },
  { size: 6, complexity: 36 },
  { size: 7, complexity: 49 },
  { size: 8, complexity: 64 },
  { size: 9, complexity: 81 },
  { size: 10, complexity: 100 },
];

const ComplexityAnalyzer = () => {
  const [close, setClose] = React.useState<boolean>(false);

  return (
    <div className="w-full h-full">
      <Dialog
        open={close}
        onOpenChange={setClose}
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
        <DialogPopup>
          <DialogHeader>
            <DialogTitle className={"font-instrumental-serif tracking-wider"}>
              Complexity Analyzer
            </DialogTitle>
            <DialogDescription className={"font-geist-sans"}>
              Analyze the time and space complexity of your code with our
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-full">
            <div className="font-ubuntu-mono">
              <ChartContainer
                className="h-72 w-full max-w-none border"
                config={{
                  complexity: {
                    color: "var(--chart-3)",
                    label: "O(n^2)",
                  },
                }}
              >
                <LineChart
                  data={quadraticData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray={"2 2"}
                  />
                  <XAxis
                    dataKey="size"
                    hide
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={false}
                    content={({ active }) => {
                      if (!active) return null;
                      return (
                        <div>
                          <Button
                            variant="success"
                            animation="none"
                            size="sm"
                          >
                            O(n²)
                          </Button>
                        </div>
                      );
                    }}
                  />
                  <Line
                    dataKey="complexity"
                    type="monotone"
                    stroke="var(--color-chart-2)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
          <DialogFooter className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              animation="colors"
              type="button"
              size="lg"
              variant="info"
              className="w-full"
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
            >
              <CloudCheckIcon weight="duotone" />
              Calculate Space Complexity
            </Button>

            <Button
              onClick={() => setClose(false)}
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
