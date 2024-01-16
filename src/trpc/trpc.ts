import { TRPCError, initTRPC } from "@trpc/server";
import { ExpressContex } from "@/server";
import { PayloadRequest } from "payload/types";
import { User } from "../payload.types";
import { TRPCContext } from "@trpc/react-query/shared";

const t = initTRPC.context<ExpressContex>().create();
const middleware = t.middleware;

const isAuth = middleware(async ({ ctx, next }) => {
  const req = ctx.req as PayloadRequest

  const { user } = req as { user: User | null }
  
  if (!user || !user.id) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      user
    }
  })
})

export const router = t.router;
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuth)