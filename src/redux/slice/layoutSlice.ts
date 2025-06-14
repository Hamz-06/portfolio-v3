import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootMainLayoutStore } from "../store/mainLayoutStore";
import { useSelector } from "react-redux";

interface LayoutState {
  toggleSidebar: boolean,
  mainLayoutBar: boolean
}

const initialState: LayoutState = {
  toggleSidebar: true,
  mainLayoutBar: true
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
    setMainLayout: (state, action: PayloadAction<boolean>) => {
      state.mainLayoutBar = action.payload;
    }
  }
})

export const { switchToggleSidebar ,setToggleSidebar, setMainLayout} = layoutSlice.actions;


export const useToggleSidebar = (): LayoutState['toggleSidebar'] =>
  useSelector((state: RootMainLayoutStore) => state.layoutProvider.toggleSidebar)

export const useMainLayoutBar = (): LayoutState['mainLayoutBar'] =>
  useSelector((state: RootMainLayoutStore) => state.layoutProvider.mainLayoutBar)

export default layoutSlice.reducer