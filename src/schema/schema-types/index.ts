import { 
  CATEGORIZED_PROJECTS_HOME_PAGEResult as CategorisedProjects ,
  PROJECT_PROJECT_PAGEResult as Project

} from "../types/sanity.types";

type ProjectTypes = CategorisedProjects['blogs'][number]['project_type']
type CategorisedProject = CategorisedProjects['blogs'][number]

export type {
  Project,
  CategorisedProjects,
  CategorisedProject,
  ProjectTypes
};