import { FilterBarHeader } from "@/components/header/portfolio/filterBarHeader";
import { ProjectList } from "@/components/list/project/projectList";
import { ProjectsModel } from "@/models/projectsModel";
import { projectCategories } from "@/lib/utils";
import { Metadata } from "next";
import { PortfolioProvider } from "@/redux/provider/portfolioProvider";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects Summary',
  description: 'A summary of blogs, projects and work experience',
}


export default async function Home() {
  const projectsSummary = await ProjectsModel.getInstance().getProjectSummary();
  const projectCategoriesKeys = projectCategories(projectsSummary); //todo: rename this

  if (!projectsSummary) {
    console.error("Failed to fetch projects summary");
    return <div>Error loading projects</div>;
  }

  return (

    <PortfolioProvider>
      <div className="sm:pl-1 pr-0 sm:pr-2 pl-2 h-full overflow-hidden">
        <div
          className="rounded-2xl bg-zinc-900 relative overflow-auto h-full"
          id="main-content"
        >
          <FilterBarHeader projectCategories={projectCategoriesKeys} />
          <ProjectList projectSummary={projectsSummary} />
        </div>
      </div>
    </PortfolioProvider>

  );
}



