'use client'

import Link from "next/link";
import { trpc } from "../trpc/client";
import { TQueryValidator } from "../lib/validators/QueryValidator";
import { Product } from "../payload.types";
import { ProductListing } from "./ProductListing";

interface ProductReelProps {
  title: string;
  subTitlle?: string;
  href?: string;
  query: TQueryValidator
}

const FALLBACK_LIMIT = 4

export const ProductReel = (props: ProductReelProps) => {
  const { title, subTitlle, href, query } = props;

  const { data: queryresults, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? FALLBACK_LIMIT, query
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage
    }
  );

  const products = queryresults?.pages?.flatMap(
    (page) => page.items
  );

  let map: (Product | null)[] = [];
  if (products && products.length) {
    map = products
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className="py-10">
      <div className="md:flex md:item-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subTitlle ? (
            <p className="text-sm mt-2  text-muted-foreground">
              {subTitlle}
            </p>
          ) : null}
        </div>
        {href ? (
          <Link
            className="hidden text-sm font-medium md:block text-blue-600 hover:text-blue-500"
            href={href}>
            Shop the Collection <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-5">
            {map.map((product, i) => (
              <ProductListing key={`product-${i}`} index={i} product={product}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
