import { ProjectTypes } from "@/sanity/schema/schema-types";
import { create } from "zustand";


export type ClientCategoryTypes = ProjectTypes | 'all'

interface CategoryState {
  selectedCategory: ClientCategoryTypes
  setCategoryType: (types: ClientCategoryTypes) => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: 'all',
  setCategoryType: (type: ClientCategoryTypes) => set({ selectedCategory: type })
}))
