import { getCookie } from '@/actions/cookies/cookieHelper';
import { isProjectLiked } from '@/lib/utils';
import { ProjectsModel } from '@/models/projectsModel';
import { ProjectProvider } from '@/redux/provider/projectProvider';
import { Routes } from '@/types/routes';
import { redirect } from 'next/navigation';
import React from 'react'
import { ProjectView } from './projectView';

type ProjectMainPageProviderProps = {
  slug: string;
}
const HOME_ROUTE: Routes = '/portfolio';

async function ProjectMainPageProvider({ slug }: ProjectMainPageProviderProps) {
  const [project, likedProjects = []] = await Promise.all([
    ProjectsModel.getInstance().getProject(slug),
    getCookie<string[]>('likes')
  ]);

  if (!project) {
    redirect(HOME_ROUTE);
  }

  const isLiked = await isProjectLiked(project.slug, likedProjects);

  return (
    <ProjectProvider project={project} isProjectLiked={isLiked}>
      {/* div used as the background, used here to allow the two div elements to slide */}
      <div className="relative flex-1 bg-black overflow-y-scroll" />
      <ProjectView />
    </ProjectProvider>
  )
}

export { ProjectMainPageProvider }