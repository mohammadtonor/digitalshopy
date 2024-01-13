import { initTRPC } from "@trpc/server";
import { ExpressContex } from "@/server";

  const t = initTRPC.context<ExpressContex>().create();
export const router = t.router;

export const publicProcedure = t.procedure