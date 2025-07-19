import { FilterBarHeader } from "@/components/header/portfolio/filterBarHeader";
import { ProjectList } from "@/components/list/project/projectList";
import { ResizableLayout } from "@/components/layout/resizableLayout";
// import { HomeProvider } from "@/redux/provider/homeProvider";
import { ProjectsModel } from "@/models/projectsModel";
import { CategorisedProjects } from "@/sanity/schema/schema-types";


export default async function Home() {
  const projectsSummary = await ProjectsModel.getInstance().getProjectSummary();
  const projectCategories = projectCategoriesConverter(projectsSummary); //todo: rename this

  if (!projectsSummary) {
    console.error("Failed to fetch projects summary");
    return <div>Error loading projects</div>;
  }

  return (
    <ResizableLayout
      className="flex flex-1 overflow-hidden relative bg-black">
      {/* takes into account the secondary header height on mobile */}
      <div
        className="w-full h-[calc(100%-var(--mobile-secondary-header-height))] sm:h-full relative overflow-auto"
        id='main-content'>

        <FilterBarHeader projectCategories={projectCategories} />
        <ProjectList projectSummary={projectsSummary} />

      </div>
    </ResizableLayout>
  );
}

const projectCategoriesConverter = (projectsSummary: CategorisedProjects): Array<keyof CategorisedProjects> => {
  // todo remove the as type
  return Object.keys(projectsSummary) as Array<keyof CategorisedProjects>
}

