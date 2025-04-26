'use client'

import { cn } from "@/lib/utils"
import { SanityProject } from "@/types/projects/projects"
import { Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface MusicCardProps {
  cardDetails: SanityProject,
  aspectRatio?: "square" | "portrait" | "landscape" | "round"
  className?: string
  onClick?: () => void
}

export function ProjectCard({
  cardDetails: { title,
    first_image_url: firstImageUrl,
    slug,
    project_type: _projectType,
    sub_title: subTitle },
  className,
  onClick,
}: MusicCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-2 bg-zinc-800/40 p-4 rounded-md transition-all duration-200 hover:bg-zinc-800",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={cn(
            "relative overflow-hidden",
            "aspect-square",
          )}
        >
          <Image
            src={firstImageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className={cn(
              "object-cover transition-all duration-300 group-hover:scale-105",

            )}
          />
        </div>

        {/* Play button that appears on hover */}
        <button
          className={cn(
            "absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-400",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
          aria-label={`Play ${title}`}
        >
          <Play className="h-6 w-6 fill-current" />
        </button>
      </div>

      <div className="flex flex-col">
        <Link href={`/${slug}`} className="line-clamp-1 font-medium hover:underline">
          {title}
        </Link>
        {subTitle && <span className="line-clamp-2 text-sm text-zinc-400">{subTitle}</span>}
      </div>
    </div>
  )
}