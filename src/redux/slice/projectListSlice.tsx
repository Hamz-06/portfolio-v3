import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootStateDashboard } from '../store/allProjectsStore'
import { ProjectTypes, SanityHomeQuery } from '@/types/projects/projects';


interface ProjectState {
  originalProjects: SanityHomeQuery;
  selectedProjects: SanityHomeQuery;
  selectedCategories: ProjectTypes[] | null;
  allCategories: ProjectTypes[]
}
const initialState: ProjectState = {
  originalProjects: {},
  selectedProjects: {},
  selectedCategories: null,
  allCategories: []
}

export const projectsList = createSlice({
  name: 'projects_list',
  initialState: initialState,
  reducers: {
    setProjectsList: (state, action: PayloadAction<SanityHomeQuery>) => {
      console.log('setProjectsList', action.payload)
      state.originalProjects = structuredClone(action.payload);
      state.selectedProjects = structuredClone(action.payload);

      state.allCategories = Object.keys(action.payload) as ProjectTypes[]
    },
    setSelectedCategory: (state, action: PayloadAction<ProjectTypes[]>) => {
      const _selectedCategories = new Set([...(state.selectedCategories || []), ...action.payload]);
      const updatedSelectedCategories = Array.from(_selectedCategories);
      console.log('setSelectedCategory', _selectedCategories)

      const filteredObjects = Object
        .entries(state.originalProjects)
        .filter(([key]) => updatedSelectedCategories.includes(key as ProjectTypes));

      const filteredProjects = Object.fromEntries(filteredObjects) as SanityHomeQuery;

      state.selectedCategories = updatedSelectedCategories;
      state.selectedProjects = filteredProjects;
    },
    removeSelectedCategory: (state, action: PayloadAction<ProjectTypes[]>) => {
      const _selectedCategories = new Set(state.selectedCategories || []);

      // Remove the categories from the Set
      for (const category of action.payload) {
        _selectedCategories.delete(category);
      }

      const updatedSelectedCategories = Array.from(_selectedCategories);
      if (updatedSelectedCategories.length === 0) {
        state.selectedCategories = state.allCategories;
        state.selectedProjects = state.originalProjects;
        return
      }

      const filteredObjects = Object
        .entries(state.originalProjects)
        .filter(([key]) => updatedSelectedCategories.includes(key as ProjectTypes));

      const filteredProjects = Object.fromEntries(filteredObjects) as SanityHomeQuery;

      state.selectedCategories = updatedSelectedCategories;
      state.selectedProjects = filteredProjects;
    },
  }
})

// Action creators are generated for each case reducer function
export const { setProjectsList, setSelectedCategory, removeSelectedCategory } = projectsList.actions

export const useProjectsList = (): ProjectState['selectedProjects'] =>
  useSelector((state: RootStateDashboard) => state.projectListProvider.selectedProjects)

export const useSelectedCategories = (): ProjectState['selectedCategories'] =>
  useSelector((state: RootStateDashboard) => state.projectListProvider.selectedCategories)

export const useAllCategories = (): ProjectState['allCategories'] =>
  useSelector((state: RootStateDashboard) => state.projectListProvider.allCategories)

export default projectsList.reducer