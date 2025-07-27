"use client"

import { useState } from "react"
import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useFullPage, useProject } from "@/redux/slice/projectPageSlice"
import { useHotkeys } from "react-hotkeys-hook"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { GenericModal } from "@/components/modal/genericModal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"


export function ImageCarousel() {
  const fullScreen = useFullPage()
  const project = useProject()
  const [index, setIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const projectImages = project?.project_images || []
  const imagesLength = projectImages.length

  const prev = () => setIndex((prev) => (prev - 1 + imagesLength) % imagesLength)
  const next = () => setIndex((prev) => (prev + 1) % imagesLength)


  useHotkeys('left', () => prev())
  useHotkeys('right', () => next())

  return (
    <motion.div
      animate={{ scale: fullScreen ? 1.3 : 1 }}
      initial={false}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-90"
    >

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

        <div className="text-white text-xs flex-row flex items-center justify-center gap-1 p-1 bg-black/50 rounded
       absolute bottom-1 left-2 ">
          <kbd className="bg-zinc-700 rounded-md border border-zinc-500 p-1 hidden sm:flex items-center justify-center w-5 h-5">
            <ChevronLeft className="w-3 h-3" />
          </kbd>
          <kbd className="bg-zinc-700 rounded-md border border-zinc-500 p-1 hidden sm:flex items-center justify-center w-5 h-5">
            <ChevronRight className="w-3 h-3" />
          </kbd>
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
    </motion.div >
  )
}

