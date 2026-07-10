import { initTRPC } from '@trpc/server';
import { cache } from 'react';
export const createTRPCContext = cache(async (request?: Request, response?: Response) => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { request: request, response: response };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      }
    }
  }
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;