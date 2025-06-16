import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootMainLayoutStore } from "../store/mainLayoutStore";
import { useSelector } from "react-redux";

interface LayoutState {
  toggleSidebar: boolean,
  mainLayoutBar: boolean,
  displayFooter: boolean
}

const initialState: LayoutState = {
  toggleSidebar: true,
  mainLayoutBar: true,
  displayFooter: true
}

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    
    switchToggleSidebar: (state) => {
      state.toggleSidebar = !state.toggleSidebar;
    },
    setToggleSidebar: (state, action: PayloadAction<boolean>)=>{
      state.toggleSidebar = action.payload;
    },
    displayFooter: (state, action: PayloadAction<boolean>) => {
      state.displayFooter = action.payload;
    }
  }
})

export const { switchToggleSidebar ,setToggleSidebar, displayFooter} = layoutSlice.actions;


export const useToggleSidebar = (): LayoutState['toggleSidebar'] =>
  useSelector((state: RootMainLayoutStore) => state.layoutProvider.toggleSidebar)

export const useDisplayFooter = (): LayoutState['displayFooter'] =>
  useSelector((state: RootMainLayoutStore) => state.layoutProvider.displayFooter)

export default layoutSlice.reducer