import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootMainLayoutStore } from '../store/mainLayoutStore'
import { CategorisedProject, CategorisedProjects, ProjectTypes } from '@/sanity/schema/schema-types';
import { setClientCookie } from '@/actions/cookies/cookieHelperClient';
import { NavigationStep } from '@/components/footer/projectControls';

interface ProjectState {
  projects: CategorisedProjects | null;
  selectedCategory: ProjectTypes | null;
  allCategories: ProjectTypes[],
  currentProject: CategorisedProject | null,
  isShufflingEnabled: boolean | null;
  projectsArray: CategorisedProject[]
}

const initialState: ProjectState = {
  projects: null,
  selectedCategory: null,
  allCategories: [],
  // allProjectsArray: [],
  projectsArray: [],
  currentProject: null,
  isShufflingEnabled: null,
}

export const projectsList = createSlice({
  name: 'projects_list',
  initialState: initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<CategorisedProjects>) => {
      state.projects = action.payload;
    },

    setSelectedCategory: (state, action: PayloadAction<ProjectTypes | null>) => {
      const categorySelected = action.payload;
      if (!categorySelected) {
        state.selectedCategory = null;
        return;
      }
      const _selectedCategoryProjects = { ...state.projects }[categorySelected]
      if (!_selectedCategoryProjects) {
        return;
      }
      state.selectedCategory = categorySelected;

    },
    setCurrentProject: (state, action: PayloadAction<CategorisedProject>) => {
      state.currentProject = { ...action.payload }
    },
    setProjectsArray: (state, action: PayloadAction<CategorisedProject[]>) => {
      state.projectsArray = [...action.payload];
    },
    navigateCurrentProject: (state, action: PayloadAction<NavigationStep>) => {
      const projectsArray = state.projectsArray;

      if (state.isShufflingEnabled) {
        const randomIndex = Math.floor(Math.random() * projectsArray.length);
        const randomProject = projectsArray[randomIndex];
        setClientCookie('current-project', {
          category: randomProject.project_type,
          project_slug: randomProject.slug
        })
        state.currentProject = randomProject;
        return;
      }
      // Ensure we have a current project
      const currentSlug = state.currentProject?.slug;
      const currentIndex = projectsArray.findIndex((project) => project.slug === currentSlug);

      // If not found, fall back to first project
      if (currentIndex === -1) {
        const firstProject = projectsArray[0];
        setClientCookie('current-project', {
          category: firstProject.project_type,
          project_slug: firstProject.slug,
        });
        state.currentProject = firstProject;
        return;
      }

      const nextIndex = action.payload === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0 || nextIndex >= projectsArray.length) {
        return; // No-op if out of range
      }
      const navigationProject = projectsArray[nextIndex];
      setClientCookie('current-project', {
        category: navigationProject.project_type,
        project_slug: navigationProject.slug,
      });
      state.currentProject = navigationProject;
    },

    setShuffle: (state, action: PayloadAction<boolean>) => {
      setClientCookie('is-shuffling-enabled', action.payload)
      state.isShufflingEnabled = action.payload;
    }
  }
})

export const {
  setProjects,
  setSelectedCategory,
  setCurrentProject,
  navigateCurrentProject,
  setShuffle,
  setProjectsArray,
} = projectsList.actions

export const useSelectedCategory = (): ProjectState['selectedCategory'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.selectedCategory)

export const useAllCategories = (): ProjectState['allCategories'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.allCategories)

export const useCurrentProject = (): ProjectState['currentProject'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.currentProject)

export const useProjects = (): ProjectState['projects'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.projects)

export const useIsShufflingEnabled = (): ProjectState['isShufflingEnabled'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.isShufflingEnabled)



export default projectsList.reducer