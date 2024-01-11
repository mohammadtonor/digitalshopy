"use client";

import Link from "next/link";
import { Icons } from "../../../components/Icons";
import { Button, buttonVariants } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const page = () => {
  const AuthCredentialValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
  });

  type TAuthCredentialValidator = z.infer<typeof AuthCredentialValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialValidator>({
    resolver: zodResolver(AuthCredentialValidator),
  });
    
    const

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create an account</h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-in">
              Already have an account? Sign in
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="your@example.com"
                  />
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                </div>

                <Button>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;