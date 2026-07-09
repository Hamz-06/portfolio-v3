import { PortfolioHandler } from "../router-handler/portfolioHandler";
import { baseProcedure, createTRPCRouter } from "../trpc/init";

const portfolioHandler = new PortfolioHandler();

export const portfolioRouter = createTRPCRouter({
  getAllProjectsList: baseProcedure.query(async ({ ctx }) => {
    const { request, response } = ctx as { request: Request, response: Response };
    // Logic to get all portfolio list
    return await portfolioHandler.getAllProjectsList(request, response);
  }),

  getProjectCategories: baseProcedure.query(async ({ ctx }) => {
      const { request, response } = ctx as { request: Request, response: Response };
      return await portfolioHandler.getProjectCategories(request, response);
  })
})