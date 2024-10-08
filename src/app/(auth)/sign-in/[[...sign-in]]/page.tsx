'use client'
import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SignInPage() {
  return (
    <>
      <div className="container grid relative min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link className="flex items-center justify-center" href="/">
              <Calendar className="h-6 w-6 text-black-600" />
              <span className="ml-2 text-xl font-bold leading-snug tracking-tighter">
                Cal Buddy
              </span>
            </Link>
          </div>
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
            {/* sign-in-form */}

            <div className="grid w-full grow items-center px-4 sm:justify-center">
              <SignIn.Root>
                <Clerk.Loading>
                  {(isGlobalLoading) => (
                    <>
                      <SignIn.Step name="start">
                        <Card className="w-full sm:w-96">
                          <CardHeader>
                            <CardTitle>Sign in to Cal buddy</CardTitle>
                            <CardDescription>Welcome back! Please sign in to continue</CardDescription>
                          </CardHeader>
                          <CardContent className="grid gap-y-4">
                            <div className="flex w-full">
                              <Clerk.Connection name="google" asChild>
                                <Button
                                  className='w-full'
                                  size="sm"
                                  variant="outline"
                                  type="button"
                                  disabled={isGlobalLoading}
                                >
                                  <Clerk.Loading scope="provider:google">
                                    {(isLoading) =>
                                      isLoading ? (
                                        <Icons.spinner className="size-4 animate-spin" />
                                      ) : (
                                        <>
                                          <Icons.google className="mr-2 size-4" />
                                          Sign in with Google
                                        </>
                                      )
                                    }
                                  </Clerk.Loading>
                                </Button>
                              </Clerk.Connection>
                            </div>
                            <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                              or
                            </p>
                            <Clerk.Field name="identifier" className="space-y-2">
                              <Clerk.Label asChild>
                                <Label>Email address</Label>
                              </Clerk.Label>
                              <Clerk.Input type="email" required asChild>
                                <Input />
                              </Clerk.Input>
                              <Clerk.FieldError className="block text-sm text-destructive" />
                            </Clerk.Field>
                          </CardContent>
                          <CardFooter>
                            <div className="grid w-full gap-y-4">
                              <SignIn.Action submit asChild>
                                <Button disabled={isGlobalLoading}>
                                  <Clerk.Loading>
                                    {(isLoading) => {
                                      return isLoading ? (
                                        <Icons.spinner className="size-4 animate-spin" />
                                      ) : (
                                        'Continue'
                                      )
                                    }}
                                  </Clerk.Loading>
                                </Button>
                              </SignIn.Action>

                              <Button variant="link" size="sm" asChild>
                                <Link href="/sign-up">Don&apos;t have an account? Sign up</Link>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </SignIn.Step>

                      <SignIn.Step name="choose-strategy">
                        <Card className="w-full sm:w-96">
                          <CardHeader>
                            <CardTitle>Use another method</CardTitle>
                            <CardDescription>
                              Facing issues? You can use any of these methods to sign in.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="grid gap-y-4">
                            <SignIn.SupportedStrategy name="email_code" asChild>
                              <Button type="button" variant="link" disabled={isGlobalLoading}>
                                Email code
                              </Button>
                            </SignIn.SupportedStrategy>
                            <SignIn.SupportedStrategy name="password" asChild>
                              <Button type="button" variant="link" disabled={isGlobalLoading}>
                                Password
                              </Button>
                            </SignIn.SupportedStrategy>
                          </CardContent>
                          <CardFooter>
                            <div className="grid w-full gap-y-4">
                              <SignIn.Action navigate="previous" asChild>
                                <Button disabled={isGlobalLoading}>
                                  <Clerk.Loading>
                                    {(isLoading) => {
                                      return isLoading ? (
                                        <Icons.spinner className="size-4 animate-spin" />
                                      ) : (
                                        'Go back'
                                      )
                                    }}
                                  </Clerk.Loading>
                                </Button>
                              </SignIn.Action>
                            </div>
                          </CardFooter>
                        </Card>
                      </SignIn.Step>

                      <SignIn.Step name="verifications">
                        <SignIn.Strategy name="password">
                          <Card className="w-full sm:w-96">
                            <CardHeader>
                              <CardTitle>Check your email</CardTitle>
                              <CardDescription>
                                Enter the verification code sent to your email
                              </CardDescription>
                              <p className="text-sm text-muted-foreground">
                                Welcome back <SignIn.SafeIdentifier />
                              </p>
                            </CardHeader>
                            <CardContent className="grid gap-y-4">
                              <Clerk.Field name="password" className="space-y-2">
                                <Clerk.Label asChild>
                                  <Label>Password</Label>
                                </Clerk.Label>
                                <Clerk.Input type="password" asChild>
                                  <Input />
                                </Clerk.Input>
                                <Clerk.FieldError className="block text-sm text-destructive" />
                              </Clerk.Field>
                            </CardContent>
                            <CardFooter>
                              <div className="grid w-full gap-y-4">
                                <SignIn.Action submit asChild>
                                  <Button disabled={isGlobalLoading}>
                                    <Clerk.Loading>
                                      {(isLoading) => {
                                        return isLoading ? (
                                          <Icons.spinner className="size-4 animate-spin" />
                                        ) : (
                                          'Continue'
                                        )
                                      }}
                                    </Clerk.Loading>
                                  </Button>
                                </SignIn.Action>
                                <SignIn.Action navigate="choose-strategy" asChild>
                                  <Button type="button" size="sm" variant="link">
                                    Use another method
                                  </Button>
                                </SignIn.Action>
                              </div>
                            </CardFooter>
                          </Card>
                        </SignIn.Strategy>

                        <SignIn.Strategy name="email_code">
                          <Card className="w-full sm:w-96">
                            <CardHeader>
                              <CardTitle>Check your email</CardTitle>
                              <CardDescription>
                                Enter the verification code sent to your email
                              </CardDescription>
                              <p className="text-sm text-muted-foreground">
                                Welcome back <SignIn.SafeIdentifier />
                              </p>
                            </CardHeader>
                            <CardContent className="grid gap-y-4">
                              <Clerk.Field name="code">
                                <Clerk.Label className="sr-only">Email verification code</Clerk.Label>
                                <div className="grid gap-y-2 items-center justify-center">
                                  <div className="flex justify-center text-center">
                                    <Clerk.Input
                                      type="otp"
                                      autoSubmit
                                      className="flex justify-center has-[:disabled]:opacity-50"
                                      render={({ value, status }) => {
                                        return (
                                          <div
                                            data-status={status}
                                            className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-ring data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring"
                                          >
                                            {value}
                                          </div>
                                        )
                                      }}
                                    />
                                  </div>
                                  <Clerk.FieldError className="block text-sm text-destructive text-center" />
                                  <SignIn.Action
                                    asChild
                                    resend
                                    className="text-muted-foreground"
                                    fallback={({ resendableAfter }) => (
                                      <Button variant="link" size="sm" disabled>
                                        Didn&apos;t receive a code? Resend (
                                        <span className="tabular-nums">{resendableAfter}</span>)
                                      </Button>
                                    )}
                                  >
                                    <Button variant="link" size="sm">
                                      Didn&apos;t receive a code? Resend
                                    </Button>
                                  </SignIn.Action>
                                </div>
                              </Clerk.Field>
                            </CardContent>
                            <CardFooter>
                              <div className="grid w-full gap-y-4">
                                <SignIn.Action submit asChild>
                                  <Button disabled={isGlobalLoading}>
                                    <Clerk.Loading>
                                      {(isLoading) => {
                                        return isLoading ? (
                                          <Icons.spinner className="size-4 animate-spin" />
                                        ) : (
                                          'Continue'
                                        )
                                      }}
                                    </Clerk.Loading>
                                  </Button>
                                </SignIn.Action>
                                <SignIn.Action navigate="choose-strategy" asChild>
                                  <Button size="sm" variant="link">
                                    Use another method
                                  </Button>
                                </SignIn.Action>
                              </div>
                            </CardFooter>
                          </Card>
                        </SignIn.Strategy>
                      </SignIn.Step>
                    </>
                  )}
                </Clerk.Loading>
              </SignIn.Root>
            </div>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>




    
  );
}