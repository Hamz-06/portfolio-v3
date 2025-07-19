// project slice page, used to manage the state of the project page

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootMainLayoutStore } from "../store/mainLayoutStore";
import { useSelector } from "react-redux";
import { Project } from "@/sanity/schema/schema-types";
import { setClientCookie } from "@/actions/cookies/cookieHelperClient";

interface ProjectState {
  project: Project | null,
  fullPage: boolean,
  gridMode: boolean,
  displayProjectDetailsModal: boolean
  likedProjects: string[], // { 'blog': ['blog 1': 'blog 2']}
  currentProjectLiked: boolean


}

const initialState: ProjectState = {
  project: null,
  fullPage: false,
  gridMode: false,
  displayProjectDetailsModal: false,
  likedProjects: [],
  currentProjectLiked: false
}

export const projectSlice = createSlice({
  name: 'project',
  initialState: initialState,
  reducers: {
    toggleFullPage: (state) => {
      state.fullPage = !state.fullPage;
    },
    closeFullPage: (state) => { state.fullPage = false },
    toggleGridMode: (state) => {
      state.gridMode = !state.gridMode;
    },
    toggleDisplayProjectDetailsModal: (state) => {
      state.displayProjectDetailsModal = !state.displayProjectDetailsModal;
    },
    setProject: (state, action: PayloadAction<NonNullable<Project>>) => {
      state.project = action.payload;
    },
    setLikedProject: (state, action: PayloadAction<string>) => {
      const projectSlug = action.payload;
      const isExists = state.likedProjects?.includes(projectSlug);

      if (isExists) {
        const removedProjectArray = state.likedProjects?.filter(slug => slug !== projectSlug);
        state.likedProjects = removedProjectArray
        setClientCookie('likes', state.likedProjects)
        return;
      }
      const existingProjects = state.likedProjects || [];
      const addedProjectArray = [
        ...existingProjects,
        projectSlug
      ]
      state.likedProjects = addedProjectArray;
      setClientCookie('likes', state.likedProjects)
    },
    initialiseLikedProjects: (state, action: PayloadAction<string[]>) => {
      state.likedProjects = action.payload;
    },
    currentProjectLiked: (state, action: PayloadAction<boolean>) => {
      const isProjectLiked = action.payload;
      state.currentProjectLiked = isProjectLiked;
    }
  }
})

export const { toggleFullPage, closeFullPage, toggleGridMode, toggleDisplayProjectDetailsModal
  , setProject, setLikedProject, initialiseLikedProjects, currentProjectLiked
} = projectSlice.actions;


export const useFullPage = (): ProjectState['fullPage'] =>
  useSelector((state: RootMainLayoutStore) => state.projectPageProvider.fullPage)
export const useGridMode = (): ProjectState['gridMode'] =>
  useSelector((state: RootMainLayoutStore) => state.projectPageProvider.gridMode)
export const useDisplayProjectDetailsModal = (): ProjectState['displayProjectDetailsModal'] =>
  useSelector((state: RootMainLayoutStore) => state.projectPageProvider.displayProjectDetailsModal)
export const useProject = (): ProjectState['project'] =>
  useSelector((state: RootMainLayoutStore) => state.projectPageProvider.project)
export const useCurrentProjectLiked = (): ProjectState['currentProjectLiked'] =>
  useSelector((state: RootMainLayoutStore) => state.projectPageProvider.currentProjectLiked)
export default projectSlice.reducer