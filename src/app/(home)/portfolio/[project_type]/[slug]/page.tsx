import { ProjectPageResponse } from '@/app/api/portfolio/[project_type]/[slug]/route';
import { ProjectCard } from '@/components/cards/project/projectCard'
import { ProjectProvider } from '@/redux/provider/projectProvider';
import { Project } from '@/schema/schema-types';
import { Routes } from '@/types/routes';
import { redirect } from 'next/navigation';
import React from 'react'

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
  return (
    <ProjectProvider project={project}>
      <div className="relative flex-1 bg-black overflow-y-scroll " />
      <ProjectCard />
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
