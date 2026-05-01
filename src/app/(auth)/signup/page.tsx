"use client";

import { GithubLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const page = () => {
  const router = useRouter();

  const handleNavigateToSignup = () => {
    router.push("/login");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <Card className="w-full px-4 py-6">
        <CardHeader>
          <CardTitle className="text-3xl font-instrumental-serif font-semibold">
            Sign Up to get started
          </CardTitle>
          <CardDescription>
            Solve the problems that matter to boost your skills
          </CardDescription>
        </CardHeader>
        <CardDescription className="px-4 flex flex-col gap-4 ">
          <Button
            size="lg"
            animation="none"
          >
            Login with Google
            <GoogleLogoIcon weight="duotone" />
          </Button>
          <Button
            size="lg"
            animation="none"
          >
            Login with Github
            <GithubLogoIcon weight="duotone" />
          </Button>
          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span>Or</span>
            <Separator className="flex-1" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input name="name" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
            />
          </div>
        </CardDescription>
        <CardFooter className="flex flex-col gap-3">
          <Button
            size="lg"
            animation="none"
            className="w-full"
            variant="warning"
          >
            Sign Up
          </Button>
          {
            <Button
              onClick={handleNavigateToSignup}
              variant="link"
              animation="none"
            >
              Already have an account? Log In
            </Button>
          }
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
