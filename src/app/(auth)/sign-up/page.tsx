"use client";

import { useUser } from "@/components/context/auth-provider";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SignUpPage() {
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);
      await user.register(email, password, name);
    } catch (error) {
      setLoading(false);
      toast("There was an error...", {
        description: (error as Error).message,
      });
    }
  };

  useEffect(() => {
    if (user.current) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="container grid relative min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Schedule, manage, and chat with your calendar. Boost your
              productivity with AI-powered task management.&rdquo;
            </p>
            <footer className="text-sm">Cal-buddy</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {/* sign-up-form */}
          <Card className="w-full sm:w-96">
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Welcome! Please fill in the details to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="Enter your name"
                />
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <Button
                    disabled={loading}
                    className="w-full mt-4"
                    variant={"outline"}
                  >
                    {loading && (
                      <Icons.spinner className="size-3 mr-2 animate-spin" />
                    )}
                    Continue
                  </Button>
                </div>
              </form>
              <p className="flex my-4 items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                or
              </p>
              <Button
                disabled={loading}
                className="w-full"
                onClick={() => {
                  setLoading(true);
                  user.loginWithGoogle();
                }}
              >
                <Icons.google className="mr-2 size-3" />
                Sign Up with Google
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="px-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign In
                </Link>
                .
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
