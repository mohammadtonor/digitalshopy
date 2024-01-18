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
import { AuthCredentialValidator, TAuthCredentialValidator } from "../../../lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from 'sonner';
import { useRouter, useSearchParams } from "next/navigation";


const SignInPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isSaller = searchParams.get('as') === 'saller';
    const origin = searchParams.get('origin');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialValidator>({
    resolver: zodResolver(AuthCredentialValidator),
  });
    
  const { mutate: signIn, isLoading } =
    trpc.auth.signIn.useMutation({
        onSuccess: () => {
            toast.success('Signed in successfully!');
            
            router.refresh();

            if (origin) {
                router.push(`/${origin}`);
                return;
            }

            if (isSaller) {
                router.push('/sell');
                return;
            }

            router.push('/')
        },
        onError: (err) => {
            if (err.data?.code === "UNAUTHORIZED") {
                toast.error('Invalid email or password');
            }
        }
    });

    const onSubmitHandler = ({
        email, 
        password,
    }: TAuthCredentialValidator) => {
        signIn({email, password})
    }

    const continueAsSaller = () => {
        router.push('?as=saller');
    }

    const continueAsBuyer = () => {
        router.replace('/sign-in', undefined);
    }

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
                      <h1 className="text-2xl font-bold">
                          sign in to your {isSaller ? 'saller' : ''}{' '}
                          account
                      </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-up">
              Don&apos;t have an account?
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
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors?.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    {...register("password")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors?.password.message}
                    </p>
                  )}
                </div>

                <Button>Sign in</Button>
              </div>
            </form>
                <div className="relative">
                    <div
                        aria-hidden='true'
                        className="absolute inset-0 flex item-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            or
                        </span>
                    </div>
                </div>          
                      {isSaller ? (   
                          <Button
                              variant='secondary'
                              disabled={isLoading}
                              onClick={continueAsBuyer}
                          >Continue as buyer
                          </Button>
                      ) : (
                        <Button
                            variant='secondary'
                            disabled={isLoading}      
                            onClick={continueAsSaller}>
                            Continu as saller
                        </Button>
                  )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
