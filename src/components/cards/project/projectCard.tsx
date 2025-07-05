'use client'

import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { ImageCarousel } from '@/components/carousel/imageCarousel'
import { ProjectDetailsModal } from '@/components/modal/slider/projectDetailsModal'
import { ProjectDetails } from './projectDetailsCard'
import { footerHeight, headerHeight } from '@/const/dimensions'
import { useEscKeyListener } from '@/actions/client-functions/keyStrokes'
import { ProjectImageGrid } from '@/components/grid/projectImageGrid/projectImageGrid'
import { closeFullPage, toggleDisplayProjectDetailsModal, useDisplayProjectDetailsModal, useFullPage, useGridMode, useProject }
  from '@/redux/slice/projectSlice'
import { useDispatch } from 'react-redux'
import { ProjectControls } from './projectControls'

// Layout z-index notes
// - Main page: z-35
// - header: z-38
// - Footer: z-36
// - Second page: z-37


function ProjectCard() {
  const project = useProject()

  const dispatch = useDispatch()

  const fullScreen = useFullPage()
  const gridMode = useGridMode()
  const isModalOpen = useDisplayProjectDetailsModal()

  useEscKeyListener(() => {
    dispatch(closeFullPage())
  })

  // will not happen as the state is passed on first render, just used to satisfy typescript
  if (!project) {
    return <></>
  }

  return (
    <div
      className={clsx(
        'w-full h-full absolute pointer-events-none *:absolute z-999 bg-black overflow-hidden'
      )}
      style={{ zIndex: fullScreen ? 999 : 35 }}
    >
      <BackgroundSlidersFullScreen />
      <BackgroundGradient />

      {/* display image  */}
      {
        gridMode ? <ProjectImageGrid /> : <ImageCarousel fullScreen={fullScreen} />
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
        <p className="text-2xl font-bold">Song 123</p>
        <p className="font-light -translate-y-1 inline-block text-gray-300">marlon craft</p>
      </motion.div>

      {/* Modal */}
      <ProjectDetailsModal isOpen={isModalOpen} onModal={() => dispatch(toggleDisplayProjectDetailsModal())}>
        <ProjectDetails />
      </ProjectDetailsModal>
    </div>
  )
}


function BackgroundSlidersFullScreen() {
  const fullScreen = useFullPage();

  // TODO: make this dynamic based on the project
  const backgroundColor = 'magenta'

  return (
    <>
      {/* Bottom colored panel */}
      <motion.div
        className="h-[50%] top-1/2 rounded-b-2xl inset-x-3"
        style={{ backgroundColor }}
        animate={{ y: fullScreen ? '-14px' : `calc(-1 * ${footerHeight} - 6px)` }}
        initial={false}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      />

      {/* Top colored panel */}
      <motion.div
        className=" h-[50%] rounded-t-2xl inset-x-3"
        style={{ backgroundColor }}
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

export { ProjectCard }
