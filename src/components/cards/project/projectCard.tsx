'use client'

import React, { useEffect, useState } from 'react'
import { motion, TargetAndTransition } from 'framer-motion'
import { Diamond, Heart, Minimize2 } from 'lucide-react'
import clsx from 'clsx'
import { ImageCarousel } from '@/components/carousel/imageCarousel'
import { ProjectDetailsModal } from '@/components/modal/projectDetailsModal'
import { ProjectDetails } from './projectDetailsCard'
import { footerHeight, headerHeight } from '@/const/dimensions'
import { isProjectLiked, removeLikedProject, saveLikedProjects } from '@/actions/client-functions/likedProjects'

// Layout z-index notes
// - Main page: z-35
// - header: z-38
// - Footer: z-36
// - Second page: z-37

function ProjectCard() {
  return (
    <>
      {/* absolute div used to fill the entire screen hack, todo potentially use portal to render outside of the main layout */}
      <SliderFrontPage />
      <div className="relative flex-1 bg-black overflow-y-scroll" />
    </>
  )
}

function SliderFrontPage() {
  const projectName = 'Song 123'
  const [liked, setLiked] = useState<boolean>(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const projectLiked = isProjectLiked(projectName)
    setLiked(projectLiked)
  }, [])
  // TODO: make this dynamic based on the project
  const backgroundColor = 'red'

  const fullScreenToggle = () => {
    setFullScreen(!fullScreen)
  }

  const displayModalToggle = () => {
    setModalOpen(!isModalOpen)
  }
  const projectLikeToggle = () => {

    if (!liked) {
      saveLikedProjects(projectName)
    } else {
      removeLikedProject(projectName)
    }
    setLiked(!liked)
  }

  return (
    <div
      className={clsx(
        'w-full h-full absolute pointer-events-none *:absolute z-35'
      )}
      style={{ zIndex: fullScreen ? 999 : 35 }}
    >
      {/* Background gradients */}
      <motion.div className="z-1 inset-0 w-full h-full bg-gradient-to-l from-black/60 via-black/50 to-black/40" />
      <motion.div className="z-1 inset-0 w-full h-full bg-gradient-to-b from-gray-50/5 via-transparent to-transparent" />

      {/* Top colored panel */}
      <motion.div
        className="w-full h-[50%] rounded-t-2xl"
        style={{ backgroundColor }}
        animate={{ y: fullScreen ? '0' : `var(--desktop-header-height)` }}
        initial={false}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      />

      {/* Center image carousel */}
      <motion.div
        animate={{ scale: fullScreen ? 1.5 : 1 }}
        initial={false}
        className="z-37 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-clip pointer-events-auto"
      >
        <ImageCarousel fullScreen={fullScreen} />
      </motion.div>

      {/* Bottom colored panel */}
      <motion.div
        className="w-full h-[50%] top-1/2 rounded-b-2xl"
        style={{ backgroundColor }}
        animate={{ y: fullScreen ? '0' : `calc(-1 * ${footerHeight})` }}
        initial={false}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      />

      {/* Controls */}
      <div className="top-0 right-0 m-5 flex items-center z-35 pointer-events-auto">
        <ProjectControls
          projectLikeToggle={projectLikeToggle}
          liked={liked}
          fullScreen={fullScreen}
          displayModalToggle={displayModalToggle}
          fullScreenToggle={fullScreenToggle}
        />
      </div>

      {/* Footer Text */}
      <motion.div
        className="z-2 pl-10 pb-10 bottom-0 left-0 text-white"
        animate={{ y: fullScreen ? 0 : `calc(-1 * ${footerHeight})` }}
        initial={false}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <p className="text-2xl font-extrabold">Song 123</p>
        <p className="font-light -translate-y-1 inline-block">marlon craft</p>
      </motion.div>

      {/* Modal */}
      <ProjectDetailsModal isOpen={isModalOpen} onModal={setModalOpen}>
        <ProjectDetails />
      </ProjectDetailsModal>
    </div>
  )
}

type Control = {
  icon: React.ReactNode;
  action: () => void;
  animation: TargetAndTransition | boolean
  divider?: boolean;
}

type ProjectControlsProps = {
  liked: boolean
  fullScreen: boolean
  fullScreenToggle: () => void
  displayModalToggle: () => void
  projectLikeToggle: () => void;
}
function ProjectControls({ fullScreen, fullScreenToggle, displayModalToggle, liked, projectLikeToggle }: ProjectControlsProps): React.ReactNode[] {
  console.log('ProjectControls rendered,', liked)
  const controlBaseStyles =
    'stroke-[1.8] opacity-70 h-9 w-9 p-2 mx-2 rounded-full hover:bg-white/50 hover:drop-shadow-xl/50'

  const controls: Control[] = [
    {
      icon: <Diamond className={controlBaseStyles} />,
      action: () => displayModalToggle(),
      animation: fullScreen ? { y: -100 } : { y: `${headerHeight}` }
    },
    {
      icon: <Heart className={clsx(controlBaseStyles, liked ? 'fill-red-500' : '')} />,
      action: () => projectLikeToggle(),
      animation: fullScreen ? { y: -100 } : { y: `${headerHeight}` },
      divider: true,
    },
    {
      icon: <Minimize2 className={controlBaseStyles} />,
      action: () => fullScreenToggle(),
      animation: fullScreen ? { y: 0 } : { y: `${headerHeight}` },
    },
  ]
  return controls.map((control, index) => {
    const { icon, action, divider, animation } = control
    return (
      <div className='flex justify-center items-center' key={index}>
        <motion.div
          animate={animation}
          onClick={action}
        >
          {icon}
        </motion.div>
        {divider && <motion.div animate={animation} className="w-[2px] mx-2 h-7 bg-gray-300" />}
      </div>

    )
  })
}

export { ProjectCard }
