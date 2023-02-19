import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const PatientsRouter = createTRPCRouter({
  getGeneralPatientInfo: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.patient.count();
  }),

  getPatientInfo: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      return await ctx.prisma.patient.findFirst({
        where: {
          id,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.patient.findMany();
  }),

  createPatient: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.patient.create({
        data: {
          name: input.name,
          assignedTo: { connect: { email: input.email } },
        },
      });
    }),
});
