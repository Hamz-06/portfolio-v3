'use client'

import { useRef } from "react";
import { MainProjectStore, projectStore } from "../store/projectLayoutStore";
import { Provider } from "react-redux";

type ProjectProviderProps = {
  sidebarOpen: boolean;
  children: React.ReactNode;
}
export function ProjectProvider({ children }: ProjectProviderProps) {
  const storeRef = useRef<MainProjectStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = projectStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}