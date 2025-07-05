// project slice page, used to manage the state of the project page

import { createSlice } from "@reduxjs/toolkit";
import { RootMainLayoutStore } from "../store/mainLayoutStore";
import { useSelector } from "react-redux";

interface ProjectState {
  fullPage: boolean,
  gridMode:boolean,
  displayProjectDetailsModal:boolean
}

const initialState: ProjectState = {
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
    closeFullPage: (state)=>{ state.fullPage = false},
    toggleGridMode: (state) => {
      state.gridMode = !state.gridMode;
    },
    toggleDisplayProjectDetailsModal: (state) => {
      state.displayProjectDetailsModal = !state.displayProjectDetailsModal; 
    }
  }
})

export const { toggleFullPage,closeFullPage, toggleGridMode,toggleDisplayProjectDetailsModal} = projectSlice.actions;


export const useFullPage = (): ProjectState['fullPage'] =>
  useSelector((state: RootMainLayoutStore) => state.projectProvider.fullPage)
export const useGridMode = (): ProjectState['gridMode'] =>
  useSelector((state: RootMainLayoutStore) => state.projectProvider.gridMode)
export const useDisplayProjectDetailsModal = (): ProjectState['displayProjectDetailsModal'] =>
  useSelector((state: RootMainLayoutStore) => state.projectProvider.displayProjectDetailsModal)
export default projectSlice.reducer