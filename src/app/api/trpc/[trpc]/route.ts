import { appRouter } from '@/backend/trpc/_app';
import { createTRPCContext } from '@/backend/trpc/init';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext(req),
  });
export { handler as GET, handler as POST };