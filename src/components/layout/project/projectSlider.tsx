'use client'
import React from 'react'
import { motion, TargetAndTransition } from 'framer-motion'
import { footerHeight } from '@/const/dimensions';
import { useFullPage, useProject } from '@/redux/slice/projectPageSlice';
import { cn } from '@/lib/utils';


type SliderProps = {
  children: React.ReactNode;
  title: 'top' | 'bottom';
}

export const Slider = ({ children, title }: SliderProps) => {
  const fullScreen = useFullPage()
  const SLIDER_INSET_Y = '10px'
  const project = useProject()

  const animation: TargetAndTransition = title === 'top'
    ? { top: fullScreen ? SLIDER_INSET_Y : 'auto' }
    : { bottom: fullScreen ? SLIDER_INSET_Y : `${footerHeight}` };

  return (
    <>
      <motion.div
        style={{ background: project?.primary_color || 'blue', height: '60vh' }}
        className={cn("fixed z-50 inset-x-3", (title === 'top' ? 'rounded-t-2xl' : 'rounded-b-2xl'))}
        animate={animation}
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <BackgroundGradient />
        {children}
      </motion.div>
    </>
  )

}

function BackgroundGradient() {
  return (
    <>
      <div className="z-1 pointer-events-none inset-0 w-full h-full bg-gradient-to-l from-black/40 via-black/50 to-black/40" />
      <div className="z-1 pointer-events-none inset-0 w-full h-full bg-gradient-to-b from-gray-50/5 via-transparent to-transparent" />
    </>
  )
}