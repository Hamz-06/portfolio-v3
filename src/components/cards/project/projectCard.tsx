'use client'

import React, { useEffect, useState } from 'react'
import { motion, TargetAndTransition } from 'framer-motion'
import { Diamond, Grid2x2, Heart, Minimize2 } from 'lucide-react'
import clsx from 'clsx'
import { ImageCarousel } from '@/components/carousel/imageCarousel'
import { ProjectDetailsModal } from '@/components/modal/slider/projectDetailsModal'
import { ProjectDetails } from './projectDetailsCard'
import { footerHeight, headerHeight } from '@/const/dimensions'
import { isProjectLiked, removeLikedProject, saveLikedProjects } from '@/actions/client-functions/likedProjects'
import { cn } from '@/lib/utils'
import ToolTip from '@/components/tooltip/tooltip'
import { useEscKeyListener } from '@/actions/client-functions/keyStrokes'
import { ProjectImageGrid } from '@/components/grid/projectImageGrid/projectImageGrid'

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
  const [gridMode, setGridMode] = useState(false)

  useEscKeyListener(() => onEscapeKey())

  useEffect(() => {
    const projectLiked = isProjectLiked(projectName)
    setLiked(projectLiked)
  }, [])
  // TODO: make this dynamic based on the project
  const backgroundColor = 'magenta'

  const fullScreenToggle = () => {
    setFullScreen(!fullScreen)
  }
  const onEscapeKey = () => {
    setFullScreen(false)
  }

  const displayModalToggle = () => {
    setModalOpen(!isModalOpen)
  }
  const projectLikeToggle = () => {
    //todo fix this by using redux type state
    if (!liked) {
      saveLikedProjects(projectName)
    } else {
      removeLikedProject(projectName)
    }
    setLiked(!liked)
  }

  const setGridModeToggle = () => {
    setGridMode(!gridMode)
  }

  return (
    <div
      className={clsx(
        'w-full h-full absolute pointer-events-none *:absolute z-999 bg-black overflow-hidden'
      )}
      style={{ zIndex: fullScreen ? 999 : 35 }}
    >
      {/* Background gradients */}
      <motion.div className="z-1 inset-0 w-full h-full bg-gradient-to-l from-black/60 via-black/50 to-black/40" />
      <motion.div className="z-1 inset-0 w-full h-full bg-gradient-to-b from-gray-50/5 via-transparent to-transparent" />

      {/* Top colored panel */}
      <motion.div
        className=" h-[50%] rounded-t-2xl inset-x-3"
        style={{ backgroundColor }}
        animate={{ y: fullScreen ? '14px' : `calc(1 * ${headerHeight} + 6px)` }}
        initial={false}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      />


      {/* display image  */}

      {
        gridMode ? <ProjectImageGrid /> : <ImageCarousel fullScreen={fullScreen} />
      }

      {/* Bottom colored panel */}
      <motion.div
        className="h-[50%] top-1/2 rounded-b-2xl inset-x-3"
        style={{ backgroundColor }}
        animate={{ y: fullScreen ? '-14px' : `calc(-1 * ${footerHeight} - 6px)` }}
        initial={false}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      />

      {/* Controls */}
      <div className="top-0 right-0 m-5 flex items-center z-35 pointer-events-auto">
        <ProjectControls
          gridMode={gridMode}
          projectLikeToggle={projectLikeToggle}
          liked={liked}
          fullScreen={fullScreen}
          displayModalToggle={displayModalToggle}
          fullScreenToggle={fullScreenToggle}
          setGridModeToggle={setGridModeToggle}
        />
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
  name: string;
}

// TODO: refactor this by using redux state to manage the controls
type ProjectControlsProps = {
  liked: boolean
  fullScreen: boolean
  gridMode: boolean
  fullScreenToggle: () => void
  displayModalToggle: () => void
  projectLikeToggle: () => void;
  setGridModeToggle: () => void
}
function ProjectControls({ fullScreen, fullScreenToggle, displayModalToggle, gridMode, liked, projectLikeToggle, setGridModeToggle }: ProjectControlsProps): React.ReactNode[] {
  console.log('ProjectControls rendered,', liked)
  const controlBaseStyles =
    'stroke-[1.8] opacity-70 h-9 w-9 p-2 mx-1 rounded-full hover:bg-white/50 stroke-gray-400/80 hover:drop-shadow-xl/50 cursor-pointer'

  const controls: Control[] = [
    {
      name: 'Project Information',
      icon: <Diamond className={controlBaseStyles} />,
      action: () => displayModalToggle(),
      animation: fullScreen ? { y: -100 } : { y: `${headerHeight}` }
    },
    {
      name: 'Like Project',
      icon: <Heart fill={liked ? 'white' : '#99a1af'} className={cn(controlBaseStyles, liked ? 'stroke-white' : '')} />,
      action: () => projectLikeToggle(),
      animation: fullScreen ? { y: -100 } : { y: `${headerHeight}` },
      divider: true,
    },

    {
      name: 'Grid View',
      icon: <Grid2x2 className={cn(controlBaseStyles, gridMode ? 'stroke-white' : '')} />,
      action: () => setGridModeToggle(),
      animation: fullScreen ? { y: 0 } : { y: `${headerHeight}` },
    },
    {
      name: 'Full Screen',
      icon: <Minimize2 className={cn(controlBaseStyles, fullScreen ? 'stroke-white' : '')} />,
      action: () => fullScreenToggle(),
      animation: fullScreen ? { y: 0 } : { y: `${headerHeight}` },
    }
  ]
  return controls.map((control, index) => {
    const { icon, action, divider, animation, name, } = control;

    return (
      <div className='flex justify-center items-center' key={index}>
        <ToolTip tooltipSide='bottom' tooltipContent={name} >

          <motion.div
            animate={animation}
            onClick={action}
          >
            {icon}
          </motion.div>
        </ToolTip>
        {divider && <motion.div animate={animation} className="w-[2px] mx-2 h-7 bg-gray-400/80" />}
      </div>
    )
  })
}

export { ProjectCard }
