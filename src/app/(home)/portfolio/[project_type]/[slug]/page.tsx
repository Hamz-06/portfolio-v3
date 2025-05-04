import React from 'react'

type ProjectProps = {
  params: Promise<{ slug: string, project_type: string }>
}
async function Project({ params }: ProjectProps) {
  const { slug, project_type: projectType } = await params
  return (
    <div>
      {projectType} - {slug}
    </div>
  )
}

export default Project