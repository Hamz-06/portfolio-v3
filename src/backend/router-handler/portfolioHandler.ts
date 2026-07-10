import { projectCategories } from "@/lib/utils";
import { getProject, getProjectSummary } from "@/models/projectsModel";
import { CategorisedProjects } from "@/sanity/schema/schema-types";

class PortfolioHandler {
  async getAllProjectsList(_request: Request, _response: Response): Promise<CategorisedProjects> {
    return await getProjectSummary()
  }

  async getProjectCategories(_request: Request, _response: Response): Promise<Array<keyof CategorisedProjects>> {
    const projectsSummary = await getProjectSummary();
    return projectCategories(projectsSummary);
  }

  async getProjectx(slug: string) {
    return await getProject(slug)
  }
}

export { PortfolioHandler };