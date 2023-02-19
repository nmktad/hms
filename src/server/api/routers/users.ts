import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const UsersRouter = createTRPCRouter({
  createUser: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        address: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          // address: input.address,
          role: "USER",
        },
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

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  getTreatedPatientNO: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.patient.count({
        where: {
          assignedTo: {
            id: input.id,
          },
        },
      });
    }),
});
