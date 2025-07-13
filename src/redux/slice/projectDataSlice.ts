import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootMainLayoutStore } from '../store/mainLayoutStore'

import { CategorisedProject, CategorisedProjects, ProjectTypes } from '@/sanity/schema/schema-types';
import { CurrentProjectCookieKey } from '@/types/cookieTypes';
import { setClientCookie } from '@/actions/cookies/cookieHelperClient';
import { NavigationStep } from '@/components/footer/projectControls';

interface ProjectState {
  originalProjects: CategorisedProjects;
  selectedCategory: ProjectTypes | null;
  allCategories: ProjectTypes[],
  allProjectsArray: CategorisedProject[],
  currentProject: CategorisedProject | null,
  isShufflingEnabled: boolean;
  likedProjects: string[], // { 'blog': ['blog 1': 'blog 2']}
  currentProjectLiked: boolean
}

const initialState: ProjectState = {
  originalProjects: {
    projects: [],
    blogs: [],
    work_experience: []
  },
  selectedCategory: null,
  allCategories: [],
  allProjectsArray: [],
  currentProject: null,
  isShufflingEnabled: false,
  likedProjects: [],
  currentProjectLiked: false
}

export const projectsList = createSlice({
  name: 'projects_list',
  initialState: initialState,
  reducers: {
    setProjectsList: (state, action: PayloadAction<CategorisedProjects>) => {
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
    setCurrentProject: (state, action: PayloadAction<CurrentProjectCookieKey | null>) => {
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

        setClientCookie('current-project', {
          category: randomProject.project_type,
          project_slug: randomProject.slug
        })
        state.currentProject = state.allProjectsArray[randomIndex];
      }
      const currentIndex = state.allProjectsArray
        .findIndex((project) => project.slug === state.currentProject!.slug);

      if (currentIndex === -1) {
        const firstProject = state.allProjectsArray[0];

        setClientCookie('current-project', {
          category: firstProject.project_type,
          project_slug: firstProject.slug
        })

        state.currentProject = firstProject;
        return;
      }

      const nextIndex = action.payload === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex < 0 || nextIndex >= state.allProjectsArray.length) {
        return;
      }
      const navigationProject = state.allProjectsArray[nextIndex];
      setClientCookie('current-project', {
        category: navigationProject.project_type,
        project_slug: navigationProject.slug
      })
      state.currentProject = navigationProject;
    },
    setShuffle: (state, action: PayloadAction<boolean>) => {
      setClientCookie('is-shuffling-enabled', action.payload)
      state.isShufflingEnabled = action.payload;
    },

    setLikedProject: (state, action: PayloadAction<string>) => {
      const projectSlug = action.payload;
      const isExists = state.likedProjects?.includes(projectSlug);

      if (isExists) {
        const removedProjectArray = state.likedProjects?.filter(slug => slug !== projectSlug);
        state.likedProjects = removedProjectArray
        setClientCookie('likes', state.likedProjects)
        return;
      }
      const existingProjects = state.likedProjects || [];
      const addedProjectArray = [
        ...existingProjects,
        projectSlug
      ]
      state.likedProjects = addedProjectArray;
      setClientCookie('likes', state.likedProjects)
    },
    initialiseLikedProjects: (state, action: PayloadAction<string[]>) => {
      state.likedProjects = action.payload;
    },
    currentProjectLiked: (state, action: PayloadAction<boolean>) => {
      const isProjectLiked = action.payload;
      state.currentProjectLiked = isProjectLiked;
    }
  }
})

export const {
  setProjectsList,
  setSelectedCategory,
  setCurrentProject,
  navigateCurrentProject,
  setShuffle,
  setLikedProject,
  initialiseLikedProjects,
  currentProjectLiked,
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

export const useCurrentProjectLiked = (): ProjectState['currentProjectLiked'] =>
  useSelector((state: RootMainLayoutStore) => state.projectListProvider.currentProjectLiked)

export default projectsList.reducer