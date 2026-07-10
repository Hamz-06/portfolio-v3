import { PortfolioHandler } from "../router-handler/portfolioHandler";
import { baseProcedure, createTRPCRouter } from "../trpc/init";
import z from "zod";

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
  }),

  getProject: baseProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .query(async ({ input }) => {
      return await portfolioHandler.getProjectx(input.slug);
    }),


})