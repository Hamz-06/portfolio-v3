"use client"


import React, { useEffect } from "react"
import Image from "next/image"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const images = [
  "/bart-simpson-cartoon.png",
  "/mona-lisa.png",
  "/bart-simpson-cartoon.png",
  // Add more as needed
]


type ImageCarouselProps = {
  fullScreen: boolean
}
export function ImageCarousel({ fullScreen }: ImageCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(1)
  const [count, setCount] = React.useState(0)

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);

    // Handle arrow key navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        api.scrollNext();
      } else if (event.key === "ArrowLeft") {
        api.scrollPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let interval: NodeJS.Timeout | null = null;

    if (!fullScreen) {
      interval = setInterval(() => {
        api.scrollNext();
      }, 10000);
    }

    return () => {
      api.off("select", onSelect);
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [api, fullScreen]);


  return (
    <>
      <div className="w-[410px] h-[410px]">
        <Carousel setApi={setApi} className="w-[410px]">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                {/* <Card className="**:m-0"> */}
                {/* <CardContent className="w-[410px] h-[410px] p-0 relative overflow-hidden"> */}
                <div className="w-[410px] h-[410px] p-0 relative overflow-hidden">

                  <Image
                    src={src || "/placeholder.svg?height=410&width=410"}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                {/* </CardContent> */}
                {/* </Card> */}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      {
        fullScreen && <div className="py-2 text-center text-[8px] text-muted-foreground">
          {current} of {count}
        </div>
      }
    </>
  )
}
