import { FilterBarHeader } from '@/components/header/portfolio/filterBarHeader'
import { ProjectList } from '@/components/list/project/projectList'
import React from 'react'
import { ProjectsModel } from "@/models/projectsModel";
import { projectCategories } from "@/lib/utils";

async function ProjectMainPage() {
  const projectsSummary = await ProjectsModel.getInstance().getProjectSummary();
  const projectCategoriesKeys = projectCategories(projectsSummary); //todo: rename this

  if (!projectsSummary) {
    console.error("Failed to fetch projects summary");
    return <div>Error loading projects</div>;
  }

  return (
    <>
      <FilterBarHeader projectCategories={projectCategoriesKeys} />
      <ProjectList projectSummary={projectsSummary} />
    </>
  )
}

export { ProjectMainPage }