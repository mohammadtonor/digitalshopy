'use client'

import { trpc } from '@/trpc/client';
import { Loader2, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

interface VerifyEmailProps {
    token: string;
}

export const VerifyEmail = ({token}: VerifyEmailProps) => {
    const { data, isLoading, isError } =
       trpc.auth.verifyEmail.useQuery({
       token,
    })
    
    if (isError) {
        return (
            <div className='flex flex-col items-center gap-2`'>
                <XCircle className='h-8 w-8 text-red-600' />
                <h3 className='font-semibold text-xl'>
                    There was a problem
                </h3>
                <p className="text-muted-foreground text-sm">
                    This is not valid or might be expired.
                    Please try again later.
                </p>
            </div>
        );
    }

    if (data?.success) {
        return (
            <div className="flex h-full flex-col items-center justify-center">
                <div className="relative mb-4 w-60 h-60 text-muted-foreground">
                    <Image
                        src='/hippo-email-sent.png'
                        fill
                        alt='the email was sent'
                    />
                </div>
                <h3 className='font-semibold text-2xl text-center'>
                    You&apos;re all set
                </h3>
                <p className='text-muted-foreground text-center'>
                    Thank you for verifying Email
                </p>
                <Link
                    href='/sign-in'
                    className={buttonVariants({ className: 'mt-4' })}
                >
                    Sign-in
                </Link>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='animate-spin mb-4 h-8 w-8 text-zinc-300' />
                <h3 className='font-semibold text-xl'>
                    Veifying...
                </h3>
                <p className="text-muted-foreground text-sm">
                    This won&apos; very long.
                </p>
            </div>
        );
    }
    
};