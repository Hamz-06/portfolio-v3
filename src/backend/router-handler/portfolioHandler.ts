import { projectCategories } from "@/lib/utils";
import { getProject, getProjectSummary } from "@/models/projectsModel";
import { CategorisedProject, CategorisedProjects, Project } from "@/sanity/schema/schema-types";

class PortfolioHandler {
  async getAllProjectsList(): Promise<CategorisedProjects> {
    return await getProjectSummary()
  }

  async getProjectCategories(): Promise<Array<keyof CategorisedProjects>> {
    const projectsSummary = await getProjectSummary();
    return projectCategories(projectsSummary);
  }

  async getProjectsFlatList(): Promise<CategorisedProject[]> {
    const projectsSummary = await getProjectSummary();
    const projectsArray = Object.values(projectsSummary).flatMap((projects) => projects)
    return projectsArray;
  }

  async getProject(slug: string): Promise<Project | null> {
    return await getProject(slug)
  }
}

export { PortfolioHandler };