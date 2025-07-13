'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ImageCarousel } from '@/components/carousel/project/imageCarousel'
import { ProjectDetailsModal } from '@/components/modal/slider/projectDetailsModal'
import { ProjectSummary } from './projectSummary'
import { footerHeight, headerHeight } from '@/const/dimensions'
import { ImageGrid } from '@/components/grid/project/imageGrid'
import { closeFullPage, useFullPage, useGridMode, useProject }
  from '@/redux/slice/projectSlice'
import { useDispatch } from 'react-redux'
import { ProjectControls } from './projectControls'
import { useHotkeys } from 'react-hotkeys-hook'

/**
 * header: z-38
 * this page: z-999
 * footer: z-36
 */

function ProjectView() {
  const dispatch = useDispatch()

  const project = useProject()
  const fullScreen = useFullPage()
  const gridMode = useGridMode()

  useHotkeys('esc', () => dispatch(closeFullPage()))

  if (!project) {
    return <></>
  }

  return (
    <div
      className='w-full h-full absolute pointer-events-none *:absolute z-999 bg-black overflow-hidden'
      style={{ zIndex: fullScreen ? 999 : 35 }}
    >
      <BackgroundSlidersFullScreen />
      <BackgroundGradient />
      {/* display image  */}
      {
        gridMode ? <ImageGrid /> : <ImageCarousel />
      }

      {/* Controls */}
      <div className="top-0 right-0 m-5 flex items-center z-35 pointer-events-auto">
        <ProjectControls />
      </div>

      {/* Footer Text */}
      <motion.div
        className="z-2 pl-15 pb-10 bottom-0 left-0 text-white"
        animate={{ y: fullScreen ? 0 : `calc(-1 * ${footerHeight} + 150px)` }}
        initial={false}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <p className="text-2xl font-bold">{project.title}</p>
        <p className="font-light -translate-y-1 inline-block text-gray-300">{project.sub_title}</p>
      </motion.div>

      {/* Modal */}
      <ProjectDetailsModal>
        <ProjectSummary />
      </ProjectDetailsModal>
    </div>
  )
}

function BackgroundSlidersFullScreen() {
  const fullScreen = useFullPage();
  const project = useProject()
  if (!project) {
    return <></>
  }

  return (
    <>
      {/* Bottom colored panel */}
      <motion.div
        className="h-[50%] top-1/2 rounded-b-2xl inset-x-3"
        style={{ backgroundColor: project.primary_color }}
        animate={{ y: fullScreen ? '-14px' : `calc(-1 * ${footerHeight} - 6px)` }}
        initial={false}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      />

      {/* Top colored panel */}
      <motion.div
        className=" h-[50%] rounded-t-2xl inset-x-3"
        style={{ backgroundColor: project.primary_color }}
        animate={{ y: fullScreen ? '14px' : `calc(1 * ${headerHeight} + 6px)` }}
        initial={false}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      />
    </>
  )
}

function BackgroundGradient() {
  return (
    <>
      <motion.div className="z-1 inset-0 w-full h-full bg-gradient-to-l from-black/40 via-black/50 to-black/40" />
      <motion.div className="z-1 inset-0 w-full h-full bg-gradient-to-b from-gray-50/5 via-transparent to-transparent" />
    </>
  )
}

export { ProjectView }
