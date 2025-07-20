import { DEFAULT_KV_EXPIRATION, PROJECT_KV_CACHE } from "@/const";
import { randomCategorisedProjects, randomProject } from "@/lib/dev/projectsGenerator";
import { client } from "@/sanity/lib/client";
import { PROJECTS_BY_CATEGORY_QUERY, SINGLE_PROJECT_QUERY } from "@/sanity/lib/queries";
import { CategorisedProjects, Project } from "@/sanity/schema/schema-types";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cache } from "react";

// one instance of ProjectsModel, with react cache implemented
class ProjectsModel {
  private static instance: ProjectsModel | null = null;

  public static getInstance(): ProjectsModel {
    if (!ProjectsModel.instance) {
      ProjectsModel.instance = new ProjectsModel();
    }
    return ProjectsModel.instance;
  }

  getProject = cache(async (projectSlug: string): Promise<Project | null> => {
    console.log('💚')
    if (process.env.NODE_ENV !== 'production') {
      return randomProject(projectSlug);
    }
    const kv = await this.getKvNamespace(); // ✅ async-safe
    const PROJECT_CACHE_KEY = `${PROJECT_KV_CACHE.PROJECT}:${projectSlug}`;

    const cachedProject = await kv.get<Project>(PROJECT_CACHE_KEY, { type: 'json' });
    if (cachedProject) {
      console.log("Found project in KV cache.");
      return cachedProject;
    }

    const projectResult = await client.fetch<Project>(SINGLE_PROJECT_QUERY, {
      slug: projectSlug
    });

    if (!projectResult) {
      console.log("No project found for slug:", projectSlug);
      return null;
    }

    getCloudflareContext().ctx.waitUntil(
      kv.put(
        PROJECT_CACHE_KEY,
        JSON.stringify(projectResult),
        { expirationTtl: DEFAULT_KV_EXPIRATION }
      )
    );
    console.log("Fetched project from Sanity and stored in KV cache", projectSlug);
    return projectResult
  });

  getProjectSummary = cache(async (): Promise<CategorisedProjects> => {
    console.log("❤️");
    const kv = await this.getKvNamespace();
    if (process.env.NODE_ENV !== 'production') {
      return randomCategorisedProjects
    }
    const cachedSummary = await kv.get<CategorisedProjects>(PROJECT_KV_CACHE.PROJECT_SUMMARY, { type: 'json' });
    if (cachedSummary) {
      console.log("Found project summary in KV cache.");
      return cachedSummary;
    }
    const projectSummary = await client.fetch<CategorisedProjects>(PROJECTS_BY_CATEGORY_QUERY)

    getCloudflareContext().ctx.waitUntil(
      kv.put(
        PROJECT_KV_CACHE.PROJECT_SUMMARY,
        JSON.stringify(projectSummary),
        { expirationTtl: DEFAULT_KV_EXPIRATION }
      )
    )
    console.log("Fetched project summary from Sanity and stored in KV cache.");
    return projectSummary;
  });

  private async getKvNamespace(): Promise<KVNamespace<string>> {
    const context = await getCloudflareContext({ async: true });
    return context.env.PROJECT_KV_CACHE;
  }

}

// Export singleton instance
export { ProjectsModel };