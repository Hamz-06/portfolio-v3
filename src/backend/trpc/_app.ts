import { createTRPCRouter } from './init';
import { portfolioRouter } from '../routes/portfolioRoutes';

export const appRouter = createTRPCRouter({
  portfolio: portfolioRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;