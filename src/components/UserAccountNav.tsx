'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import {User}  from '@/payload.types';
import Link from "next/link";
import { useAuth } from "../hooks/use-auth";

export const UserAccountNav = ({ user }: { user: User }) => {
    const { singnOut } = useAuth();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className="overflow-hidden"
            >
                <Button
                    variant='ghost'
                    size='sm'
                    className="relative"
                >
                    My Account
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white w-60" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                        <p className="font-medium text-sm text-black">{user.email}</p>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link href='/sell'>Saller Dashbord</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={singnOut}
                    className="cursor-pointer">
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}