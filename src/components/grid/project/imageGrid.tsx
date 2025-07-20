import { useProject } from '@/redux/slice/projectPageSlice'
import Image from 'next/image'
import React from 'react'


function ImageGrid() {
  const project = useProject()
  if (!project) {
    return <></>
  }
  const images = project.project_images || []
  return (
    <div className='w-screen h-screen sticky flex flex-col justify-center items-center gap-6 pointer-events-none z-90 ' id="dcd">

      <div className='grid grid-cols-2 grid-rows-2 gap-4 size-[240px] sm:size-[310px] md:size-[440px]'>
        {images.map((image, index) => (
          <div key={index} className='relative w-full h-full rounded-xl overflow-hidden'>
            <Image
              placeholder='blur'
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
    </div>
  )
}

export { ImageGrid }
