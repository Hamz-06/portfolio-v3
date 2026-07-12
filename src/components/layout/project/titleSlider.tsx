'use client'
import React from 'react'
import { useTRPC } from '@/backend/trpc/provider'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

function TitleSlider() {
  const params = useParams<{ project_type: string; slug: string }>();
  const trpc = useTRPC()
  const { data: project } = useQuery(trpc.portfolio.getProject.queryOptions({ slug: params.slug }))
  if (!project) {
    return <></>
  }
  return (
    <div
      style={{ zIndex: 60 }}
      className="absolute pl-5 sm:pl-10 pb-10  bottom-0 left-0 text-white inline-block"
    >
      <p className="text-2xl font-bold">{project.title}</p>
      <p className="font-light -translate-y-1 inline-block text-gray-300">{project.sub_title}</p>
    </div>
  )
}

export default TitleSlider