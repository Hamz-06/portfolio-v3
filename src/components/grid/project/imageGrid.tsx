'use client'
import Image from 'next/image'
import React from 'react'
import { useTRPC } from '@/backend/trpc/provider'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

// grid is not being used
function ImageGrid() {
  const trpc = useTRPC()
  const params = useParams<{ project_type: string; slug: string }>();
  const { data: project } = useQuery(trpc.portfolio.getProject.queryOptions({ slug: params.slug }))
  if (!project) {
    return <></>
  }

  const images = project.project_images || []
  return (
    <div
      className='grid grid-cols-2 grid-rows-2 gap-4 size-[240px] sm:size-[310px] md:size-[440px]
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-90'>
      {images.map((image, index) => (
        <div key={index} className='relative w-full h-full rounded-xl overflow-hidden'>
          <Image
            priority={true}
            src={image || '/placeholder.png'}
            alt={`Project description: ${project.description}`}
            fill
            className='object-cover'
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      ))}
    </div>
  )
}

export { ImageGrid }
