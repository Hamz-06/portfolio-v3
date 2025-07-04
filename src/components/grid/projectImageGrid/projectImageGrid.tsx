import Image from 'next/image'
import React from 'react'

const images = [
  "/bart-simpson-cartoon.png",
  "/mona-lisa.png",
  "/bart-simpson-cartoon.png",
  "/mona-lisa.png",
]

function ProjectImageGrid() {
  return (
    <div className='w-screen h-screen sticky flex flex-col justify-center items-center gap-6 pointer-events-none ' id="dcd">

      <div className='grid grid-cols-2 grid-rows-2 gap-4 size-[240px] sm:size-[310px] md:size-[440px]'>
        {images.map((image, index) => (
          <div key={index} className='relative w-full h-full rounded-xl overflow-hidden'>
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              fill
              className='object-cover'
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export { ProjectImageGrid }
