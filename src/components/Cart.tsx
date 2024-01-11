import { ShoppingCart } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { formatPrice } from "../lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

export const Cart = () => {

    const itemCount = 0;
    const fee = 1;
    return (
        <Sheet>
            <SheetTrigger className="group -m-2 flex items-center ">
                <ShoppingCart className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 ">
                    0
                </span>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Cart (0)</SheetTitle>
                </SheetHeader>
                {itemCount > 0 ? (
                    <>
                        <div className="flex w-full flex-col pr-6">
                            cart item
                        </div>    
                        <div className="space-y-4 pr-6">
                            <Separator />
                            <div className="space-y-1 pr-6">
                                <div className="flex">
                                    <span className="flex-1">Shpping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">Transaction Fee</span>
                                    <span>{formatPrice(fee)}</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">Total</span>
                                    <span>{formatPrice(1)}</span>
                                </div>
                            </div>

                            <SheetFooter>
                                <SheetTrigger asChild>
                                    <Link
                                        href={'/cart'}
                                        className={buttonVariants({
                                            className: 'w-full'
                                        })}
                                    >
                                        Continue to Checkout
                                    </Link>
                                </SheetTrigger>
                            </SheetFooter> 
                        </div>
                    </>
                ) : (
                        <div className="flex h-full flex-col items-center justify-center space-y-1">
                            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                                <Image
                                    src='/hippo-empty-cart.png'
                                    fill
                                    alt="empty shopping cart hippo"
                                />
                            </div>
                            <div className="text-xl font-semibold">Your cart is empty</div>
                            <SheetTrigger asChild>
                                <Link href='/products' className={buttonVariants({
                                    variant: 'link',
                                    size: 'sm',
                                    className: 'text-sm text-muted-foreground'
                                })}>
                                    Add item to your cart to Checkout
                                </Link>
                            </SheetTrigger>
                        </div>
                )}
            </SheetContent>
       </Sheet>
    );
}