import { CategorisedProject, CategorisedProjects, Project } from "@/sanity/schema/schema-types";
import { PortfolioHandler } from "../router-handler/portfolioHandler";
import { baseProcedure, createTRPCRouter } from "../trpc/init";
import z from "zod";

const portfolioHandler = new PortfolioHandler();

export const portfolioRouter = createTRPCRouter({
  getAllProjectsList: baseProcedure.query(async ({ }): Promise<CategorisedProjects> => {
    return await portfolioHandler.getAllProjectsList();
  }),

  getProjectCategories: baseProcedure.query(async ({ }): Promise<Array<keyof CategorisedProjects>> => {
    return await portfolioHandler.getProjectCategories();
  }),

  getAllProjectsFlatList: baseProcedure.query(async ({ }): Promise<CategorisedProject[]> => {
    return await portfolioHandler.getProjectsFlatList();
  }),

  getProject: baseProcedure
    .input(z.object({
      slug: z.string(),
    }))
    .query(async ({ input }): Promise<Project | null> => {
      return await portfolioHandler.getProject(input.slug);
    }),
})