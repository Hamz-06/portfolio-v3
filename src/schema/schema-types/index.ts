import {
  CATEGORIZED_PROJECTS_HOME_PAGEResult as CategorisedProjects,
  PROJECT_PROJECT_PAGEResult as GeneratedProject,
  MY_PROFILEResult as Profile,
  PLAYLIST_HOME_PAGEResult as Playlist,
  PLAYLISTS_HOME_PAGEResult as Playlists
} from "../types/sanity.types";

type ProjectTypes = CategorisedProjects['blogs'][number]['project_type']
type CategorisedProject = CategorisedProjects['blogs'][number]
type Project = Extract<GeneratedProject, {title: string}>
export type {
  Project,
  CategorisedProjects,
  CategorisedProject,
  ProjectTypes,
  Profile,
  Playlist,
  Playlists
};