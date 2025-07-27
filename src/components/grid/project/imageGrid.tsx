import { useFullPage, useProject } from '@/redux/slice/projectPageSlice'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

function ImageGrid() {
  const project = useProject()
  const fullScreen = useFullPage()

  if (!project) {
    return <></>
  }

  const images = project.project_images || []
  return (
    <motion.div
      animate={{ scale: fullScreen ? 1.3 : 1 }}
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
    </motion.div>
  )
}

export { ImageGrid }
