import {
  PROJECTS_BY_CATEGORY_QUERYResult as CategorisedProjects,
  SINGLE_PROJECT_QUERYResult as GeneratedProject,
  MY_PROFILE_QUERYResult as Profile,
  SINGLE_PLAYLIST_QUERYResult as Playlist,
  PLAYLIST_SUMMARY_LIST_QUERYResult as PlaylistsSummary,

} from "../types/sanity.types";

type ProjectTypes = CategorisedProjects['blogs'][number]['project_type']
type CategorisedProject = CategorisedProjects['blogs'][number]
type Project = Extract<GeneratedProject, { title: string }>
export type {
  Project,
  CategorisedProjects,
  CategorisedProject,
  ProjectTypes,
  Profile,
  Playlist,
  PlaylistsSummary
};