'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { CategorisedProject } from '@/sanity/schema/schema-types'
import { cn } from '@/lib/utils'
import { PROJECT_PAGE_ROUTE } from '@/constants/pageRoutes'

type ProjectRowProps = {
  project: CategorisedProject
  index: number
}

export function ProjectRow({ project, index }: ProjectRowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)


  return (
    <Link
      href={PROJECT_PAGE_ROUTE(project.project_type, project.slug)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-800/60 transition-colors duration-150 group cursor-pointer"
    >
      <div className="flex items-center gap-4 min-w-0">
        {/* Index / Play Button */}
        <div className="w-6 flex items-center justify-center text-sm font-medium text-zinc-400">
          {isHovered ? (
            <Play className="w-4 h-4 text-white fill-white" />
          ) : (
            <span>{index + 1}</span>
          )}
        </div>

        {/* Thumbnail + Title/Subtitle */}
        <div className="relative w-10 h-10 overflow-hidden rounded-md shrink-0 bg-zinc-800">
          <Image
            src={project.first_image_url || '/placeholder.svg'}
            alt={project.title}
            fill
            onLoad={() => setImgLoaded(true)}
            className={cn(
              "object-cover transition-all duration-300",
              imgLoaded ? 'blur-0 opacity-100' : 'blur-md opacity-50'
            )}
          />
        </div>

        <div className="min-w-0">
          <h4 className="text-white text-sm font-medium truncate group-hover:text-green-400 transition-colors duration-150">
            {project.title}
          </h4>
          {project.sub_title && (
            <p className="text-zinc-400 text-xs truncate">
              {project.sub_title}
            </p>
          )}
        </div>
      </div>

      {/* Category / Type */}
      <div className="text-zinc-400 text-xs font-light px-3 py-1 bg-zinc-800/40 rounded-full select-none capitalize">
        {project.project_type.replace('_', ' ')}
      </div>
    </Link>
  )
}
