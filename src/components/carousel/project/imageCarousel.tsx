"use client"

import { useState } from "react"
import Image from "next/image"
import { useHotkeys } from "react-hotkeys-hook"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { GenericModal } from "@/components/modal/genericModal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/backend/trpc/provider"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"


export function ImageCarousel() {

  const [index, setIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const trpc = useTRPC()
  const params = useParams<{ project_type: string; slug: string }>();
  const { data: project } = useQuery(trpc.portfolio.getProject.queryOptions({ slug: params.slug }))
  const projectImages = project?.project_images || []
  const imagesLength = projectImages.length

  const prev = () => {
    if (imagesLength === 0) return
    setIndex((prev) => (prev - 1 + imagesLength) % imagesLength)
  }

  const next = () => {
    if (imagesLength === 0) return
    setIndex((prev) => (prev + 1) % imagesLength)
  }


  useHotkeys('left', () => prev())
  useHotkeys('right', () => next())

  if (!project) {
    return <></>
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-90">

      <div
        onClick={() => setModalOpen(true)}

        className="relative size-[250px] md:size-[410px] rounded-lg overflow-hidden hover:cursor-zoom-in">
        <Image
          src={projectImages[index] || "/placeholder.png"}
          alt={`Image ${index + 1}`}
          fill
          className="object-cover"
        />


        {/* Page Indicator */}
        <div className="absolute bottom-1 right-2 text-[10px] text-white bg-black/50 px-1 rounded">
          {index + 1} / {imagesLength}
        </div>

        <div className="text-white text-xs flex-row flex items-center justify-center gap-1 p-1 bg-black/50 rounded absolute bottom-1 left-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="bg-zinc-700 rounded-md border border-zinc-500 p-1 hidden sm:flex items-center justify-center w-5 h-5 hover:bg-zinc-600 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="bg-zinc-700 rounded-md border border-zinc-500 p-1 hidden sm:flex items-center justify-center w-5 h-5 hover:bg-zinc-600 active:scale-95 transition-all cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
          <span className="leading-none hidden sm:block">To navigate</span>
          <span className="leading-none block sm:hidden">Click for full screen</span>
        </div>
      </div>

      <div className="inset-0 flex items-center justify-between px-2 mt-4 sm:hidden">
        <Button variant="ghost" size="icon" onClick={prev}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" className="" size="icon" onClick={next}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>


      <GenericModal
        className={cn("!h-[60vh] sm:!h-[80vh] !w-[95vw] !p-0 sm:!w-[80vw] !max-w-none overflow-scroll border-0 z-999")}
        isOpen={modalOpen} onModal={() => setModalOpen(false)} title="Project Images">
        <div
          className="w-full h-full relative p-3 bg-zinc-900/90">
          <Image
            src={projectImages[index] || "/placeholder.png"}
            alt={`Image ${index + 1}`}
            fill
            className="object-contain inset-3"
          />

        </div>
      </GenericModal>
    </div>
  )
}

