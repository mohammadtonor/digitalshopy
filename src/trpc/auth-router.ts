import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import { AuthCredentialValidator } from "../lib/validators/account-credentials-validator";
import { pubblicProcedure, router } from "./trpc";

export const authRouter = router({
    createPayloadUser: pubblicProcedure
        .input(AuthCredentialValidator)
        .mutation(async ({ input }) => {
            const { email, password } = input;
            const payload = await getPayloadClient();

            //check if user already exists
            const { docs: users } = await payload.find({
                collection: 'users',
                where: {
                    email: {
                        equals: email
                    },
                }
            })

            if (users.length !== 0)
                throw new TRPCError({ code: 'CONFLICT' }) 

            await payload.create({
                collection: 'users',
                data: {
                    email,
                    password,
                    role: 'user'
                }
            })

            return {success: true, sendToEmail: email}
        }),
    
});
