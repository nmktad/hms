import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const UsersRouter = createTRPCRouter({
  createUser: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.create({
        data: { name: input.name, email: input.email },
      });
    }),

  updateUser: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.update({
        where: { email: input.email },
        data: { image: "new image" },
      });
    }),
});
