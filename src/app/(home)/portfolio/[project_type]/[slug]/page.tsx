import { ProjectCard } from '@/components/cards/project/projectCard'
import { ProjectProvider } from '@/redux/provider/projectProvider';
import React from 'react'

type ProjectPageProps = {
  params: Promise<{ slug: string, project_type: string }>
}

async function ProjectPage({ params }: ProjectPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug: _, project_type: _projectType } = await params;
  return (
    <ProjectProvider>
      <div className="relative flex-1 bg-black overflow-y-scroll " />
      <ProjectCard />
    </ProjectProvider>
  )
}

export default ProjectPage

