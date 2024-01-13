import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export const UserAccountNav = () => {
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
                    <div className="flex flex-col space-y-0.5"></div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}