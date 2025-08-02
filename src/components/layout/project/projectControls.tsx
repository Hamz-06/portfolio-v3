'use client';

import { motion, TargetAndTransition } from 'framer-motion'
import { Info, Grid2x2, Heart, Minimize2 } from 'lucide-react'
import ToolTip from '@/components/tooltip/tooltip'
import { useDispatch } from 'react-redux';
import {
  closeFullPage, currentProjectLiked, setLikedProject, toggleDisplayProjectDetailsModal,
  toggleFullPage, toggleGridMode, useCurrentProjectLiked, useFullPage, useGridMode, useProject
}
  from '@/redux/slice/projectPageSlice';
import { cn } from '@/lib/utils';
import { useHotkeys } from 'react-hotkeys-hook';
import clsx from 'clsx';

type Control = {
  icon: React.ReactNode;
  action: () => void;
  animation: TargetAndTransition | boolean
  divider?: boolean;
  name: string;
}

type ProjectControlsProps = {
  className?: string;
}
function ProjectControls({ className }: ProjectControlsProps): React.ReactElement {
  useHotkeys('esc', () => dispatch(closeFullPage()))
  const dispatch = useDispatch()

  const project = useProject()
  const fullScreen = useFullPage()
  const gridMode = useGridMode()
  const liked = useCurrentProjectLiked()



  if (!project) {
    return <></>
  }

  const controlBaseStyles = clsx(`stroke-[2] opacity-70 h-9 w-9 p-2 mx-1 rounded-full hover:bg-white/50 
    stroke-white hover:drop-shadow-xl/50 cursor-pointer`)


  const controls: Control[] = [
    {
      name: 'Project Information',
      icon: <Info className={cn(controlBaseStyles, 'stroke-white')} />,
      action: () => dispatch(toggleDisplayProjectDetailsModal()),
      animation: fullScreen ? { y: -100 } : { y: 0 }
    },
    {
      name: 'Like Project',
      icon: <Heart fill={liked ? 'red' : 'transparent'} className={cn(controlBaseStyles, liked ? 'stroke-red-600' : '')} />,
      action: () => {
        dispatch(currentProjectLiked(!liked))
        dispatch(setLikedProject(project.slug))
      },
      animation: fullScreen ? { y: -100 } : { y: 0 },
      divider: true,
    },

    {
      name: 'Grid View',
      icon: <Grid2x2 className={cn(controlBaseStyles, gridMode ? 'stroke-white' : '')} />,
      action: () => dispatch(toggleGridMode()),
      animation: fullScreen ? { y: 0 } : { y: 0 },
    },
    {
      name: 'Full Screen',
      icon: <Minimize2 className={cn(controlBaseStyles, fullScreen ? 'stroke-white' : '')} />,
      action: () => dispatch(toggleFullPage()),
      animation: fullScreen ? { y: 0 } : { y: 0 },
    }
  ]
  return (
    <div className={cn(className)}>
      {
        controls.map((control, index) => {
          const { icon, action, divider, animation, name, } = control;

          return (
            <div className={'flex justify-center items-center'} key={index}>
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
    </div>)
}

export { ProjectControls }