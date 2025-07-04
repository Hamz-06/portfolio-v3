"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useArrowKeyListener } from "@/actions/client-functions/keyStrokes"

const images = [
  "/bart-simpson-cartoon.png",
  "/mona-lisa.png",
  "/bart-simpson-cartoon.png",
]

export function ImageCarousel() {
  const [index, setIndex] = useState(0)
  const total = images.length

  const prev = () => setIndex((prev) => (prev - 1 + total) % total)
  const next = () => setIndex((prev) => (prev + 1) % total)

  useArrowKeyListener({ ArrowLeft: prev, ArrowRight: next })

  return (
    <div className="relative size-[250px] md:size-[410px] rounded-lg overflow-hidden bg-muted">
      <Image
        src={images[index]}
        alt={`Image ${index + 1}`}
        fill
        className="object-cover"
      />

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Button variant="ghost" size="icon" onClick={prev}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={next}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Page Indicator */}
      <div className="absolute bottom-1 right-2 text-[10px] text-white bg-black/50 px-1 rounded">
        {index + 1} / {total}
      </div>
    </div>
  )
}

