'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CategorisedProject } from "@/sanity/schema/schema-types"
import { Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"


interface ProjectCardProps {
  cardDetails: CategorisedProject,
}

export function ProjectCard({
  cardDetails,
}: ProjectCardProps) {
  const {
    title,
    slug,
    first_image_url: firstImageUrl,
    sub_title: subTitle,
    project_type: projectType,
  } = cardDetails;

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  const redirectToProject = (): string => {
    return `/portfolio/${projectType}/${slug}`
  }

  return (
    <div
      className={`h-[245px] w-[170px] sm:w-[195px] group relative flex flex-col  gap-2 p-2 rounded-sm transition-all 
        duration-200 hover:bg-zinc-800/40 cursor-pointer`}

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={redirectToProject()} className="line-clamp-1 text-sm text-white">

        <div className="relative">
          <div
            className="relative overflow-hidden aspect-square rounded-xl"
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
          <Button
            // onClick={() => router.push(redirectToProject())}
            className={cn(
              `absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-500
             text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-400`,
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            )}
            aria-label={`Play ${title}`}
          >
            <Play className="h-6 w-6 fill-current shadow-2xl" />
          </Button>
        </div>

        <div className="flex flex-col">
          <p className="line-clamp-1">{title}</p>

          {subTitle && <span className="line-clamp-2 text-sm text-zinc-400">{subTitle}</span>}
        </div>
      </Link>
    </div>
  )
}