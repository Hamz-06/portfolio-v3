'use client';

import { motion, TargetAndTransition } from 'framer-motion'
import { Diamond, Grid2x2, Heart, Minimize2 } from 'lucide-react'
import ToolTip from '@/components/tooltip/tooltip'
import { useDispatch } from 'react-redux';
import { toggleDisplayProjectDetailsModal, toggleFullPage, toggleGridMode, useFullPage, useGridMode } from '@/redux/slice/projectSlice';
import { useEffect, useState } from 'react';
import { handleLikedProjects, isProjectLiked } from '@/actions/client-functions/likedProjects';
import { headerHeight } from '@/const/dimensions'
import { cn } from '@/lib/utils';


type Control = {
  icon: React.ReactNode;
  action: () => void;
  animation: TargetAndTransition | boolean
  divider?: boolean;
  name: string;
}

// TODO: refactor this by using redux state to manage the controls
type ProjectControlsProps = {
  projectName: string
}

function ProjectControls({ projectName }: ProjectControlsProps): React.ReactNode[] {
  const dispatch = useDispatch()
  const fullScreen = useFullPage()
  const gridMode = useGridMode()
  const [liked, setLiked] = useState<boolean>(false)

  useEffect(() => {
    const projectLiked = isProjectLiked(projectName)
    setLiked(projectLiked)
  }, [])

  useEffect(() => {
    handleLikedProjects(projectName, liked)
  }, [liked])


  const controlBaseStyles =
    'stroke-[1.8] opacity-70 h-9 w-9 p-2 mx-1 rounded-full hover:bg-white/50 stroke-gray-400/80 hover:drop-shadow-xl/50 cursor-pointer'

  const controls: Control[] = [
    {
      name: 'Project Information',
      icon: <Diamond className={controlBaseStyles} />,
      action: () => dispatch(toggleDisplayProjectDetailsModal()),
      animation: fullScreen ? { y: -100 } : { y: `${headerHeight}` }
    },
    {
      name: 'Like Project',
      icon: <Heart fill={liked ? 'white' : '#99a1af'} className={cn(controlBaseStyles, liked ? 'stroke-white' : '')} />,
      action: () => setLiked(!liked),
      animation: fullScreen ? { y: -100 } : { y: `${headerHeight}` },
      divider: true,
    },

    {
      name: 'Grid View',
      icon: <Grid2x2 className={cn(controlBaseStyles, gridMode ? 'stroke-white' : '')} />,
      action: () => dispatch(toggleGridMode()),
      animation: fullScreen ? { y: 0 } : { y: `${headerHeight}` },
    },
    {
      name: 'Full Screen',
      icon: <Minimize2 className={cn(controlBaseStyles, fullScreen ? 'stroke-white' : '')} />,
      action: () => dispatch(toggleFullPage()),
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

export { ProjectControls }