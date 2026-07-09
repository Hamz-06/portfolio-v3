import { CategorisedProject } from "@/sanity/schema/schema-types"
import { create } from "zustand";

interface ProjectState {
  currentProjectSummary: CategorisedProject | null;
  setCurrentProjectSummary: (project: CategorisedProject) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProjectSummary: null,
  setCurrentProjectSummary: (project: CategorisedProject) => set({ currentProjectSummary: project })
}))
