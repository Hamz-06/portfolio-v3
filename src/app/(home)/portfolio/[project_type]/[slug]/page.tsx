import { ProjectCard } from '@/components/cards/project/projectCard'
import { ProjectProvider } from '@/redux/provider/projectProvider'
import React from 'react'

type ProjectProps = {
  params: Promise<{ slug: string, project_type: string }>
}

async function ProjectPage({ params }: ProjectProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug: _, project_type: _projectType } = await params;
  return (
    <ProjectProvider sidebarOpen={false}>
      <ProjectCard />
    </ProjectProvider>
  )
}

export default ProjectPage

