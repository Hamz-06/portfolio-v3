import { ProjectPageResponse } from '@/app/api/portfolio/[project_type]/[slug]/route';
import { ProjectView } from '@/components/layout/project/projectView'
import { ProjectProvider } from '@/redux/provider/projectProvider';
import { Project } from '@/sanity/schema/schema-types';
import { Routes } from '@/types/routes';
import { redirect } from 'next/navigation';
import React from 'react'
import { getCookie } from '@/actions/cookies/cookieHelper';
import { isProjectLiked } from '@/lib/utils';

type ProjectPageProps = {
  params: Promise<{ slug: string, project_type: string }>
}

const HOME_ROUTE: Routes = '/portfolio';

export default async function ProjectPage({ params }: ProjectPageProps) {

  const { slug, project_type: projectType } = await params;
  const project = await getProject(projectType, slug);
  if (!project) {
    redirect(HOME_ROUTE);
  }
  const likedProjects = await getCookie<string[]>('likes') || [];
  const isLiked = await isProjectLiked(project.slug, likedProjects)

  return (
    <ProjectProvider project={project} isProjectLiked={isLiked} allLikedProjects={likedProjects}>
      {/* div used as the background, used here to allow the two div elements to slide */}
      <div className="relative flex-1 bg-black overflow-y-scroll " />
      <ProjectView />
    </ProjectProvider>
  )
}

async function getProject(projectType: string, slug: string): Promise<Project | null> {
  //todo add this route to types
  const res = await fetch(`${process.env.HOST_URL}/api/portfolio/${projectType}/${slug}`)
  if (!res.ok) {
    console.error("Failed to fetch project data", res.statusText);
    throw new Error("Failed to fetch project data");
  }
  return await res.json() as ProjectPageResponse;
}
