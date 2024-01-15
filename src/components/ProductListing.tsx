'use client';

import Image from "next/image";
import { Product } from "../payload.types"
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "../lib/utils";
import { PRODUCT_CATEGORIES } from "../config";
import { formatPrice} from '@/lib/utils'
import { ImageSlider } from "./ImageSlider";

interface ProductListingProps {
    product: Product | null;
    index: number;
}

export const ProductListing = ({ product, index }: ProductListingProps) => {
    
    const [isVisible, setIsVisible] = useState<Boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, index * 75);

        return () => clearTimeout(timer)
    }, [index])

    if (!product && !isVisible) return <ProductPlaceholder />

    const label = PRODUCT_CATEGORIES.find(
        ({ value }) => value === product?.category
    )?.label

    const validUrls =
        product?.images.map(({ image }) =>
            (typeof image === "string" ? image : image.url)).filter(Boolean) as string[]
        

    if (isVisible && product) {
        return (
            <Link
                className={cn(
                    'invisible h-full cursor-pointer group/main',
                    {
                        'visible animate-none fade-in-5': isVisible,
                    }
                )}
                href={`/product/${product.id}`}>
                <div className="flex flex-col w-full">
                    <ImageSlider urls={validUrls} />
                    <h3 className="mt-4 font-medium text-sm text-gray-700">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{label}</p>
                    <p className="mt-1 font-medium text-sm text-gray-900">
                        {formatPrice(product.price)}
                    </p>
                </div>
                </Link>
        )
    }
}

const ProductPlaceholder = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
                <Skeleton className="h-full w-full"/>
            </div>
            <Skeleton className="mt-4 w-2/3 h-4 rounded-lg"/>
            <Skeleton className="mt-4 w-16 h-4 rounded-lg"/>
            <Skeleton className="mt-4 w-12 h-4 rounded-lg"/>
        </div>
    )
}