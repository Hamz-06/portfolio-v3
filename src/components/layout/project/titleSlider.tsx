'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useFullPage, useProject } from '@/redux/slice/projectPageSlice'
import { useTRPC } from '@/backend/trpc/provider'
import { useQuery } from '@tanstack/react-query'

type TitleSliderProps = {
  slug: string
}
function TitleSlider({ slug }: TitleSliderProps) {
  const fullScreen = useFullPage()
  const trpc = useTRPC()
  const { data: project } = useQuery(trpc.portfolio.getProject.queryOptions({ slug }))
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