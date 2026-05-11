"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ArrowRight } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginPage() {
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isLoading },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: any) => {
    console.log(values);
    // here
    setTimeout(() => {
      console.log(values);

      localStorage.setItem("user", JSON.stringify(values));
      navigate.push("/clients");
    }, 1000);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50/50 p-6 dark:bg-slate-950">
      <div className="relative z-10 w-full max-w-[420px] space-y-8">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-4xl font-[800] tracking-tight text-foreground sm:text-5xl">
            Login
          </h1>
          <p className="text-muted-foreground">
            Welcome back, please enter your details
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 shadow-2xl shadow-primary/5 backdrop-blur-xl sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-sm font-semibold ml-1">
                  Email address
                </Label>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                <Input
                  type="email"
                  placeholder="name@company.com"
                  {...register("email")}
                  className="h-12 rounded-2xl border-border/60 bg-background/50 px-4 transition-all duration-200 focus:bg-background focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-sm font-semibold">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-xs font-bold text-primary transition-colors hover:text-primary/80"
                  >
                    Forgot password?
                  </a>
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <Input
                  type="password"
                  placeholder="password"
                  {...register("password")}
                  className="h-12 rounded-2xl border-border/60 bg-background/50 px-4 transition-all duration-200 focus:bg-background focus:ring-primary/20"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-90 "
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 size-5" />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-bold text-primary transition-colors hover:text-primary/80 underline-offset-5 hover:underline"
          >
            Request access
          </a>
        </p>
      </div>
    </main>
  );
}
