import { exampleRouter } from "./routers/example";
import { createTRPCRouter } from "./trpc";
import { UsersRouter } from "./routers/users";
import { PatientsRouter } from "./routers/patients";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  users: UsersRouter,
  patients: PatientsRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
