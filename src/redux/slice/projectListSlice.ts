import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootMainLayoutStore } from '../store/mainLayoutStore'
import { ProjectTypes, SanityHomeQuery, SanityProject } from '@/types/projects/projects';
import { NavigationStep } from '@/components/footer/spotify/currentProjectControls';
import { CurrentProjectKey, setCurrentProjectKeyCookie } from '@/actions/server-actions/cookies/currentProjectCookie';

interface ProjectState {
  originalProjects: SanityHomeQuery;
  selectedCategory: ProjectTypes | null;
  allCategories: ProjectTypes[],
  allProjectsArray: SanityProject[],
  currentProject: SanityProject | null,
  isShufflingEnabled: boolean;
}
const initialState: ProjectState = {
  originalProjects: {},
  selectedCategory: null,
  allCategories: [],
  allProjectsArray: [],
  currentProject: null,
  isShufflingEnabled: false
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
    setCurrentProject: (state, action: PayloadAction<CurrentProjectKey | null>) => {
      const defaultProject = () => state.allProjectsArray[0];

      if (!action.payload) {
        const defaultProjectValue = defaultProject()
        state.currentProject = defaultProjectValue
        return;
      }
      const selectedProject = state.originalProjects[action.payload.category]
        ?.find(project => project.slug === action.payload?.project_slug);

      if (!selectedProject) {
        state.currentProject = defaultProject();
        return;
      }
      state.currentProject = selectedProject;
    },
    navigateCurrentProject: (state, action: PayloadAction<NavigationStep>) => {
      if (!state.currentProject) {
        state.currentProject = state.allProjectsArray[0];
        return;
      }
      if (state.isShufflingEnabled) {
        const randomIndex = Math.floor(Math.random() * state.allProjectsArray.length);
        const randomProject = state.allProjectsArray[randomIndex];

        setCurrentProjectKeyCookie(randomProject.project_type, randomProject.slug)
        state.currentProject = state.allProjectsArray[randomIndex];
      }
      const currentIndex = state.allProjectsArray
        .findIndex((project) => project.slug === state.currentProject!.slug);

      if (currentIndex === -1) {
        const firstProject = state.allProjectsArray[0];
        setCurrentProjectKeyCookie(firstProject.project_type, firstProject.slug)
        state.currentProject = firstProject;
        return;
      }

      const nextIndex = action.payload === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0 || nextIndex >= state.allProjectsArray.length) {
        return;
      }
      const navigationProject = state.allProjectsArray[nextIndex];
      setCurrentProjectKeyCookie(navigationProject.project_type, navigationProject.slug)
      state.currentProject = navigationProject;

    },
    setShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShufflingEnabled = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setProjectsList,
  setSelectedCategory,
  setCurrentProject,
  navigateCurrentProject,
  setShuffle
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

export const useIsShufflingEnabled = (): ProjectState['isShufflingEnabled'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.isShufflingEnabled)

export default projectsList.reducer