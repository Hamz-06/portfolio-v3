import { createSlice } from "@reduxjs/toolkit";
import { RootStateDashboard } from "../store/mainLayoutStore";
import { useSelector } from "react-redux";

interface LayoutState {
  toggleMenu: boolean;
}

const initialState: LayoutState = {
  toggleMenu: true
}
export const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    toggleMenu: (state) => {
      state.toggleMenu = !state.toggleMenu;
    }
  }
})

export const { toggleMenu } = layoutSlice.actions;


export const useToggleMenu = (): LayoutState['toggleMenu'] =>
  useSelector((state: RootStateDashboard) => state.layoutProvider.toggleMenu)

export default layoutSlice.reducer