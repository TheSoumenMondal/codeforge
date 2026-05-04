"use client";

import {
  SmileyIcon,
  SmileyMehIcon,
  SmileyXEyesIcon,
} from "@phosphor-icons/react";
import AddTestCases from "@/components/features/problems/create/AddTestCases";
import CppLittleCodeEditor from "@/components/features/problems/create/CppLittleCodeEditor";
import JavaLittleCodeEditor from "@/components/features/problems/create/JavaLittleCodeEditor";
import JavaScriptLittleCodeEditor from "@/components/features/problems/create/JavaScriptLitteleCodeEditor";
import PythonLittleCodeEditor from "@/components/features/problems/create/PyhtonLittleCodeEditor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const page = () => {
  return (
    <div className="w-full h-full max-h-[calc(100vh-57px)] flex flex-col">
      <div className=" flex gap-2 flex-col h-24 bg-[repeating-linear-gradient(45deg,var(--muted)_0px,var(--muted)_1px,transparent_1px,transparent_6px),repeating-linear-gradient(-45deg,var(--muted)_0px,var(--muted)_1px,transparent_1px,transparent_6px)] p-3! border-b relative">
        <Avatar>
          <AvatarImage src={"/images/avatar/default_dp.png"} />
        </Avatar>
        <p className="font-instrumental-serif text-2xl">
          Contributing as {"Soumen"}
        </p>
      </div>
      <ScrollArea className="w-full h-full max-h-[calc(100vh-153px)] p-4">
        <Card decorations>
          <div className="flex flex-col gap-2">
            <Label className="font-serif text-xl">Title of the Problem</Label>
            <Input />
          </div>
        </Card>
        <Card decorations>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <Label className="font-serif flex flex-col gap-1 items-start">
                  <p className="text-xl">Problem Description</p>
                  <p>
                    Make sure to paste the problem details here in markdown
                    format.
                  </p>
                </Label>
              </div>
              <div>
                <Button>Use Markdown Editor</Button>
              </div>
            </div>
            <Textarea className="min-h-50" />
          </div>
        </Card>
        <Card decorations>
          <CardDescription>
            <div className="flex flex-col gap-2">
              <Label className="font-serif text-xl text-primary">
                Difficulty of Problem
              </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                    <SelectItem value="easy">
                      <div className="w-full flex items-center gap-3 font-semibold text-sm">
                        <SmileyIcon
                          size={32}
                          weight="duotone"
                        />
                        Easy
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="w-full flex items-center gap-3 font-semibold text-sm">
                        <SmileyMehIcon
                          size={32}
                          weight="duotone"
                        />
                        Medium
                      </div>
                    </SelectItem>
                    <SelectItem value="hard">
                      <div className="w-full flex items-center gap-3 font-semibold text-sm">
                        <SmileyXEyesIcon
                          size={32}
                          weight="duotone"
                        />
                        Hard
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardDescription>
          <CardFooter className="px-0">
            <Button
              animation="none"
              className="w-full"
              size="lg"
              variant="info"
            >
              Create Problem
            </Button>
          </CardFooter>
        </Card>

        <Separator />

        <p className="font-serif text-sm my-4">
          Please make sure you first Save the problem details and then create
          the codestubs and testcases for the problem. Otherwise, you might lose
          the problem details that you have entered.
        </p>

        <Card decorations>
          <CardTitle className="text-lg font-serif">
            Enter the Codestubs
          </CardTitle>
          <CardDescription>
            Please make sure to enter the codestubs for the problem in here
          </CardDescription>

          {/* CPP codestub */}

          <div>
            <p className="text-lg font-serif mb-2">Add CodeStubs for C++</p>
            <Label className="font-bold text-sm font-serif my-2">
              Starting Code
            </Label>
            <p className="text-xs my-2">
              Starting code that will be hidden from users.
            </p>
            <CppLittleCodeEditor
              placeholderCode={`#include<iostream>
using namespace std;
`}
            />
            <Separator />
            <Label className=" text-sm font-serif my-2 font-bold">
              User Code
            </Label>
            <p className="text-xs my-2">
              User code that will be shown to users.
            </p>
            <CppLittleCodeEditor
              placeholderCode={`int getSum(int a ,int b){
// Write your code here
}
`}
            />
            <Separator />
            <Label className="font-bold text-sm font-serif my-2">
              Ending Code
            </Label>
            <p className="text-xs my-2">
              Ending code that will be shown to users.
            </p>
            <CppLittleCodeEditor
              placeholderCode={`int main(){
  int a , b;
  cin>>a>>b;
  cout<<getSum(a,b);
  return 0;
}
`}
            />
          </div>

          {/* Java Code Stubs */}

          <div>
            <p className="text-lg font-serif mb-2">Add CodeStubs for Java</p>
            <Label className="font-bold text-sm font-serif my-2">
              Starting Code
            </Label>
            <p className="text-xs my-2">
              Starting code that will be hidden from users.
            </p>
            <JavaLittleCodeEditor
              placeholderCode={`import java.util.*;

`}
            />
            <Separator />
            <Label className=" text-sm font-serif my-2 font-bold">
              User Code
            </Label>
            <p className="text-xs my-2">
              User code that will be shown to users.
            </p>
            <JavaLittleCodeEditor
              placeholderCode={`public class Solution{
public static int getSum(int a ,int b){
  // Write your code here
}
`}
            />
            <Separator />
            <Label className="font-bold text-sm font-serif my-2">
              Ending Code
            </Label>
            <p className="text-xs my-2">
              Ending code that will be shown to users.
            </p>
            <JavaLittleCodeEditor
              placeholderCode={`public static void main(String[] args){
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt();
    int b = sc.nextInt();
    System.out.println(getSum(a,b));
  }
}
`}
            />
          </div>

          {/* Python Code Stubs */}

          <div>
            <p className="text-lg font-serif mb-2">Add CodeStubs for Python</p>
            <Label className="font-bold text-sm font-serif my-2">
              Starting Code
            </Label>
            <p className="text-xs my-2">
              Starting code that will be hidden from users.
            </p>
            <PythonLittleCodeEditor
              placeholderCode={`# Write your code here
`}
            />
            <Separator />
            <Label className=" text-sm font-serif my-2 font-bold">
              User Code
            </Label>
            <p className="text-xs my-2">
              User code that will be shown to users.
            </p>
            <PythonLittleCodeEditor
              placeholderCode={`def getSum(a, b):
    # Write your code here
    return a + b
`}
            />
            <Separator />
            <Label className="font-bold text-sm font-serif my-2">
              Ending Code
            </Label>
            <p className="text-xs my-2">
              Ending code that will be shown to users.
            </p>
            <PythonLittleCodeEditor
              placeholderCode={`def main():
    a = int(input())
    b = int(input())
    print(getSum(a, b))
`}
            />
          </div>

          {/* JavaScript Code Stubs */}

          <div>
            <p className="text-lg font-serif mb-2">
              Add CodeStubs for JavaScript
            </p>
            <Label className="font-bold text-sm font-serif my-2">
              Starting Code
            </Label>
            <p className="text-xs my-2">
              Starting code that will be hidden from users.
            </p>
            <JavaScriptLittleCodeEditor
              placeholderCode={`// Write your code here
`}
            />
            <Separator />
            <Label className=" text-sm font-serif my-2 font-bold">
              User Code
            </Label>
            <p className="text-xs my-2">
              User code that will be shown to users.
            </p>
            <JavaScriptLittleCodeEditor
              placeholderCode={`function getSum(a, b) {
    // Write your code here
    return a + b;
}
`}
            />
            <Separator />
            <Label className="font-bold text-sm font-serif my-2">
              Ending Code
            </Label>
            <p className="text-xs my-2">
              Ending code that will be shown to users.
            </p>
            <JavaScriptLittleCodeEditor
              placeholderCode={`function main() {
    let a = parseInt(prompt("Enter a:"));
    let b = parseInt(prompt("Enter b:"));
    console.log(getSum(a, b));
}
`}
            />
          </div>

          <CardFooter className="px-0">
            <Button
              className="w-full"
              animation="none"
              size="lg"
              variant="info"
            >
              Add Code Stubs
            </Button>
          </CardFooter>
        </Card>

        <Separator />

        <div>
          <p className="text-sm my-4 font-serif">
            Please make sure to add the test cases for the problem in here. You
            can add as many test cases as you want and also you can edit or
            delete the test cases whenever you want.
          </p>
        </div>

        <Separator decoration />

        <AddTestCases />

        <Button
          variant="info"
          size="lg"
          className="w-full"
        >
          Save TestCases
        </Button>
      </ScrollArea>
    </div>
  );
};

export default page;
