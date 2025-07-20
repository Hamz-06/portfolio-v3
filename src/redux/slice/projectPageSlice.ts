// project slice page, used to manage the state of the project page

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootMainLayoutStore } from "../store/mainLayoutStore";
import { useSelector } from "react-redux";
import { Project } from "@/sanity/schema/schema-types";

interface ProjectState {
  project: Project | null,
  fullPage: boolean,
  gridMode: boolean,
  displayProjectDetailsModal: boolean
}

const initialState: ProjectState = {
  project: null,
  fullPage: false,
  gridMode: false,
  displayProjectDetailsModal: false
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
    }
  }
})

export const { toggleFullPage, closeFullPage, toggleGridMode, toggleDisplayProjectDetailsModal
  , setProject
} = projectSlice.actions;


export const useFullPage = (): ProjectState['fullPage'] =>
  useSelector((state: RootMainLayoutStore) => state.projectPageProvider.fullPage)
export const useGridMode = (): ProjectState['gridMode'] =>
  useSelector((state: RootMainLayoutStore) => state.projectPageProvider.gridMode)
export const useDisplayProjectDetailsModal = (): ProjectState['displayProjectDetailsModal'] =>
  useSelector((state: RootMainLayoutStore) => state.projectPageProvider.displayProjectDetailsModal)
export const useProject = (): ProjectState['project'] =>
  useSelector((state: RootMainLayoutStore) => state.projectPageProvider.project)

export default projectSlice.reducer