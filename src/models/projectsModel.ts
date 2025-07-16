import { randomCategorisedProjects, randomProject } from "@/lib/dev/projectsGenerator";
import { client } from "@/sanity/lib/client";
import { PROJECTS_BY_CATEGORY_QUERY, SINGLE_PROJECT_QUERY } from "@/sanity/lib/queries";
import { CategorisedProjects, Project } from "@/sanity/schema/schema-types";

class ProjectsModel {

  async getProject(projectName: string): Promise<Project | null> {
    if (process.env.NODE_ENV !== 'production') {
      return randomProject
    }
    const projectResult = await client.fetch<Project>(SINGLE_PROJECT_QUERY, {
      slug: projectName
    });

    return projectResult
  }

  async getProjectSummary(): Promise<CategorisedProjects> {
    if (process.env.NODE_ENV !== 'production') {
      return randomCategorisedProjects
    }

    return await client.fetch<CategorisedProjects>(PROJECTS_BY_CATEGORY_QUERY)
  }
}
export { ProjectsModel }