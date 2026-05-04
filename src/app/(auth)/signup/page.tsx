"use client";

import { GithubLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FieldInfo } from "@/components/common/FieldInfo";
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
import { useAuth } from "@/hooks/useAuth";

const SignupPage = () => {
  const router = useRouter();
  const { signup } = useAuth();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await signup(value.name, value.email, value.password);
        toast.success("Account created successfully! Please log in.");
        router.push("/login");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        );
      }
    },
  });

  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md px-4 py-6">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle className="text-3xl font-instrumental-serif font-semibold">
              Sign Up to get started
            </CardTitle>
            <CardDescription>
              Solve the problems that matter to boost your skills
            </CardDescription>
          </CardHeader>

          <CardDescription className="px-4 flex flex-col gap-4">
            <Button
              type="button"
              size="lg"
              animation="none"
            >
              Sign up with Google
              <GoogleLogoIcon weight="duotone" />
            </Button>

            <Button
              type="button"
              size="lg"
              animation="none"
            >
              Sign up with Github
              <GithubLogoIcon weight="duotone" />
            </Button>

            <div className="flex items-center gap-2">
              <Separator className="flex-1" />
              <span>Or</span>
              <Separator className="flex-1" />
            </div>

            <div className="flex flex-col gap-2">
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value ? "Name is required" : undefined,
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="John Doe"
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              </form.Field>
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
                }}
              >
                {(field) => (
                  <>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="you@example.com"
                    />
                    <FieldInfo field={field} />
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
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="••••••••"
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              </form.Field>
            </div>
          </CardDescription>

          <CardFooter className="flex flex-col gap-3 mt-6">
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
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>
              )}
            </form.Subscribe>

            <Button
              type="button"
              onClick={handleNavigateToLogin}
              variant="link"
              animation="none"
            >
              Already have an account? Log In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
