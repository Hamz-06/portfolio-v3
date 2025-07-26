'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useFullPage, useProject } from '@/redux/slice/projectPageSlice'

function TitleSlider() {
  const fullScreen = useFullPage()
  const project = useProject()
  if (!project) {
    return <></>
  }
  return (
    <motion.div
      style={{ zIndex: 60 }}
      className="absolute pl-5 sm:pl-10 pb-10  bottom-0 left-0 text-white inline-block"
      animate={{ bottom: fullScreen ? 0 : `-200px` }}
      initial={false}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <p className="text-2xl font-bold">{project.title}</p>
      <p className="font-light -translate-y-1 inline-block text-gray-300">{project.sub_title}</p>
    </motion.div>
  )
}

export default TitleSlider