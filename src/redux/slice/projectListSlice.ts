import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootMainLayoutStore } from '../store/mainLayoutStore'
import { ProjectTypes, SanityHomeQuery, SanityProject } from '@/types/projects/projects';
import { NavigationStep } from '@/components/footer/spotify/currentProjectControls';
import { setCurrentProjectIndexCookie } from '@/actions/server-actions/cookies/currentProjectCookie';


interface ProjectState {
  originalProjects: SanityHomeQuery;
  selectedCategory: ProjectTypes | null;
  allCategories: ProjectTypes[],
  allProjectsArray: SanityProject[],
  currentProject: SanityProject | null
}
const initialState: ProjectState = {
  originalProjects: {},
  selectedCategory: null,
  allCategories: [],
  allProjectsArray: [],
  currentProject: null
}

export const projectsList = createSlice({
  name: 'projects_list',
  initialState: initialState,
  reducers: {
    setProjectsList: (state, action: PayloadAction<SanityHomeQuery>) => {
      state.originalProjects = structuredClone(action.payload);
      state.allCategories = Object.keys(action.payload) as ProjectTypes[]
      state.allProjectsArray = Object.values(action.payload).flatMap((projects) => projects)
    },

    setSelectedCategory: (state, action: PayloadAction<ProjectTypes | null>) => {
      const categorySelected = action.payload;
      if (!categorySelected) {
        state.selectedCategory = null;
        return;
      }
      const _selectedCategoryProjects = { ...state.originalProjects }[categorySelected]
      if (!_selectedCategoryProjects) {
        return;
      }
      state.selectedCategory = categorySelected;

    },
    setCurrentProject: (state, action: PayloadAction<number | null>) => {
      state.currentProject = state.allProjectsArray[action.payload ?? 0] || [];
    },
    navigateCurrentProject: (state, action: PayloadAction<NavigationStep>) => {
      if (!state.currentProject) {
        state.currentProject = state.allProjectsArray[0];
        return;
      }
      const currentIndex = state.allProjectsArray
        .findIndex((project) => project.slug === state.currentProject!.slug);

      if (currentIndex === -1) {
        state.currentProject = state.allProjectsArray[0];
        return;
      }

      const nextIndex = action.payload === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0 || nextIndex >= state.allProjectsArray.length) {
        return;
      }
      setCurrentProjectIndexCookie(nextIndex)
      state.currentProject = state.allProjectsArray[nextIndex];

    },
    shuffleCurrentProject: (state) => {
      const randomIndex = Math.floor(Math.random() * state.allProjectsArray.length);

      setCurrentProjectIndexCookie(randomIndex)
      state.currentProject = state.allProjectsArray[randomIndex];
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setProjectsList,
  setSelectedCategory,
  setCurrentProject,
  navigateCurrentProject,
  shuffleCurrentProject
} = projectsList.actions

export const useSelectedCategory = (): ProjectState['selectedCategory'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.selectedCategory)

export const useAllCategories = (): ProjectState['allCategories'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.allCategories)

export const useCurrentProject = (): ProjectState['currentProject'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.currentProject)

export const useAllProjectsArray = (): ProjectState['allProjectsArray'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.allProjectsArray)

export const useProjectsMappedByCategory = (): ProjectState['originalProjects'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.originalProjects)

export default projectsList.reducer