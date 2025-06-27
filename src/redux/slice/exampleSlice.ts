import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootProjectStore } from "../store/projectLayoutStore";

interface ExampleState {
  one: boolean,
}

const initialState: ExampleState = {
  one:true
}

export const exampleSlice = createSlice({
  name: 'example',
  initialState: initialState,
  reducers: {
    
    exampleFnc: (state, action: PayloadAction<boolean>) => {
      state.one = !action.payload;
    }
  }
})

export const { exampleFnc} = exampleSlice.actions;


export const useExample = (): ExampleState['one'] =>
  useSelector((state: RootProjectStore) => state.exampleSlice.one)

export default exampleSlice.reducer