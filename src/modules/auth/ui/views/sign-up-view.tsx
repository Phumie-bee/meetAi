"use client";
import { Card, CardContent } from "@/components/ui/card";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const formSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push("/");
          setPending(false);
        },
        onError: ({ error }) => {
          setError(error.message);
          setPending(false);
        },
      }
    );
  };

  return (
    <div className="flex  flex-col gap-6">
      <Card className="overflow-hidden  p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="grid gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Let's get started</h1>
                  <p className="text-muted-foreground text-balance">
                    Create your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Jane Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="p@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button className="w-full" type="submit" disabled={pending}>
                  Sign up
                </Button>
                <div className="after:border-border relative text-center text-sm  after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t ">
                  <span className="bg-card  text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <Button
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full"
                  >
                    Google
                  </Button>
                  <Button
                    disabled={pending}
                    variant="outline"
                    type="button"
                    className="w-full"
                  >
                    Github
                  </Button>
                </div>
                <div className="text-sm text-center">
                  Already have an account?{" "}
                  <Link
                    className="underline underline-offset-4"
                    href="/sign-in"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-radial from-green-700 to-green-800 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
            <p className="text-2xl font-semibold text-white">Meet.Ai</p>
          </div>
        </CardContent>
      </Card>
      <div className="*:[a]:hover:text-primary text-xs text-center text-muted-foreground *:[a]:underline-offset-4">
        By clicking continue, you agree to out <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>{" "}
      </div>
    </div>
  );
};
