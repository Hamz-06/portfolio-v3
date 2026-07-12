'use client';

import { setClientCookie } from "@/helper/cookieHelperClient";
import { NavigationStep } from "@/components/button/projectNavigationButton";
import { CategorisedProject, CategorisedProjects } from "@/sanity/schema/schema-types";
import { CurrentProjectCookieKey } from "@/types/cookieTypes";

type Navigation = { projectType: string, projectSlug: string }

function navigateCurrentProject(
  projectsArray: CategorisedProject[],
  currentProjectKey: CurrentProjectCookieKey | null,
  navigationStep: NavigationStep,
  isShufflingEnabled: boolean | null): Navigation | null {

  if (isShufflingEnabled) {
    const randomIndex = Math.floor(Math.random() * projectsArray.length);
    const randomProject = projectsArray[randomIndex];
    setClientCookie('current-project', {
      category: randomProject.project_type,
      project_slug: randomProject.slug
    })
    return {
      projectType: randomProject.project_type,
      projectSlug: randomProject.slug
    };
  }
  // Ensure we have a current project
  const currentSlug = currentProjectKey?.project_slug;
  const currentIndex = projectsArray.findIndex((project) => project.slug === currentSlug);
  const currentProject = projectsArray.find((project) => project.slug === currentSlug);

  // If not found, fall back to first project
  if (currentIndex === -1) {
    const firstProject = projectsArray[0];
    setClientCookie('current-project', {
      category: firstProject.project_type,
      project_slug: firstProject.slug,
    });
    return {
      projectType: firstProject.project_type,
      projectSlug: firstProject.slug
    };
  }
  if (navigationStep === 'play') {
    return {
      projectSlug: currentProject!.slug,
      projectType: currentProject!.project_type
    }
  }

  const nextIndex = navigationStep === 'next' ? currentIndex + 1 : currentIndex - 1;
  if (nextIndex < 0 || nextIndex >= projectsArray.length) {
    return null;
  }
  const navigationProject = projectsArray[nextIndex];
  setClientCookie('current-project', {
    category: navigationProject.project_type,
    project_slug: navigationProject.slug,
  });
  return {
    projectType: navigationProject.project_type,
    projectSlug: navigationProject.slug
  }

}

function getCurrentProject(projectSummary: CategorisedProjects, currentProjectKey: CurrentProjectCookieKey | null): CategorisedProject {
  const defaultProject = projectSummary['projects'][0]
  if (!currentProjectKey) return defaultProject
  const projectsArray = Object.values(projectSummary).flatMap((projects) => projects)
  const currentProject = projectsArray.find((project) => project.slug === currentProjectKey.project_slug) || null;
  return currentProject ? currentProject : defaultProject
}

export { navigateCurrentProject, getCurrentProject }