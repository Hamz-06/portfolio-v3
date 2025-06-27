'use client'

import { useRef } from "react";
import { MainProjectStore, projectStore } from "../store/projectLayoutStore";
import { exampleFnc } from "../slice/exampleSlice";
import { Provider } from "react-redux";

type ProjectProviderProps = {
  sidebarOpen: boolean;
  children: React.ReactNode;
}
export function ProjectProvider({ children }: ProjectProviderProps) {
  const storeRef = useRef<MainProjectStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = projectStore()
    storeRef.current.dispatch(exampleFnc(false))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}