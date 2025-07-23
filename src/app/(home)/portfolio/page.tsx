import { FilterBarHeader } from "@/components/header/portfolio/filterBarHeader";
import { ProjectList } from "@/components/list/project/projectList";
import { ResizableLayout } from "@/components/layout/resizableLayout";
import { ProjectsModel } from "@/models/projectsModel";
import { projectCategories } from "@/lib/utils";
import { Metadata } from "next";

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
    <ResizableLayout
      className="flex flex-1 overflow-hidden relative bg-black">
      {/* takes into account the secondary header height on mobile */}
      <div
        className="w-full h-full sm:h-full relative overflow-auto"
        id='main-content'>

        <FilterBarHeader projectCategories={projectCategoriesKeys} />
        <ProjectList projectSummary={projectsSummary} />

      </div>
    </ResizableLayout>
  );
}



