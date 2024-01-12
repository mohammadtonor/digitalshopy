import { authRouter } from "./auth-router";
import { pubblicProcedure, router } from "./trpc";

export const appRouter = router({
    auth: authRouter
});

export type AppRouter = typeof appRouter;