"use client";

import {
  EyeClosedIcon,
  EyeIcon,
  GithubLogoIcon,
  GoogleLogoIcon,
} from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value.email, value.password);
        router.push("/explore");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        );
      }
    },
  });

  const handleNavigateToSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="w-full flex items-center justify-center md:px-4">
      <Card className="w-full max-w-md px-4 py-6 ring-0 border-0">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle className="text-3xl font-instrumental-serif font-semibold">
              Log In to continue
            </CardTitle>
            <CardDescription>
              Solve the problems that matter to boost your skills
            </CardDescription>
          </CardHeader>

          <CardDescription className="px-4 flex flex-col gap-4 mt-4">
            <Button
              type="button"
              size="lg"
              animation="none"
            >
              Login with Google
              <GoogleLogoIcon weight="duotone" />
            </Button>

            <Button
              type="button"
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
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Email is required"
                      : !/\S+@\S+\.\S+/.test(value)
                        ? "Please enter a valid email"
                        : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") && 'No "error" allowed in Email'
                    );
                  },
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      aria-invalid={
                        !field.state.meta.isValid ||
                        field.state.meta.isValidating
                          ? true
                          : undefined
                      }
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="you@example.com"
                    />
                  </>
                )}
              </form.Field>
            </div>

            <div className="flex flex-col gap-2">
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Password is required"
                      : value.length < 6
                        ? "Password must be at least 6 characters"
                        : undefined,
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Password</Label>
                    <InputGroup
                      id={field.name}
                      name={field.name}
                      aria-invalid={
                        !field.state.meta.isValid ||
                        field.state.meta.isValidating
                          ? true
                          : undefined
                      }
                      onBlur={field.handleBlur}
                    >
                      <InputGroupInput
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      />
                      <InputGroupAddon
                        align="inline-end"
                        className="items-center"
                      >
                        {showPassword ? (
                          <EyeIcon
                            weight="duotone"
                            size={18}
                            className="text-muted-foreground cursor-pointer"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <EyeClosedIcon
                            weight="duotone"
                            size={18}
                            className="text-muted-foreground cursor-pointer"
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                      </InputGroupAddon>
                    </InputGroup>
                  </>
                )}
              </form.Field>
            </div>
          </CardDescription>

          <CardFooter className="flex flex-col gap-3">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  size="lg"
                  animation="none"
                  className="w-full"
                  variant="warning"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                </Button>
              )}
            </form.Subscribe>

            <Button
              type="button"
              onClick={handleNavigateToSignup}
              variant="link"
              animation="none"
            >
              If you don't have an account, sign up
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
