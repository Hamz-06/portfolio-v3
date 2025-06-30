import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootMainLayoutStore } from "../store/mainLayoutStore";
import { useSelector } from "react-redux";

interface StyleState {
  projectPageTintColor: string | null,
}

const initialState: StyleState = {
  projectPageTintColor: null, 
}

export const styleSlice = createSlice({
  name: 'style',
  initialState: initialState,
  reducers: {
    setPageColorTint: (state, action: PayloadAction<string>) => {
      state.projectPageTintColor = action.payload;
    },
  }
})

export const { setPageColorTint} = styleSlice.actions;


export const usePageColorTint = (): StyleState['projectPageTintColor'] =>
  useSelector((state: RootMainLayoutStore) => state.styleProvider.projectPageTintColor)

export default styleSlice.reducer