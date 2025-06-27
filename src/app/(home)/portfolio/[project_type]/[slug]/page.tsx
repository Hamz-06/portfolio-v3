import { ProjectCard } from '@/components/cards/project/projectCard'
import React from 'react'

type ProjectPageProps = {
  params: Promise<{ slug: string, project_type: string }>
}

async function ProjectPage({ params }: ProjectPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug: _, project_type: _projectType } = await params;
  return (
    <ProjectCard />
  )
}

export default ProjectPage

