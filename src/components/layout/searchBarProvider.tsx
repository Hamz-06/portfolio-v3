import React from 'react'
import { SearchBar } from '../input/searchBar'
import { CategorisedProject, CategorisedProjects } from '@/sanity/schema/schema-types';
import { ProjectsModel } from '@/models/projectsModel';

async function SearchBarProvider() {
  const projectsSummary = await ProjectsModel.getInstance().getProjectSummary();

  return (
    <SearchBar projectsSummary={makeProjectsArray(projectsSummary)} />
  )
}

const makeProjectsArray = (projectsSummary: CategorisedProjects): CategorisedProject[] => {
  return Object.values(projectsSummary).flatMap((projects) => projects)
}


export { SearchBarProvider }