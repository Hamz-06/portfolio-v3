'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

function ProjectCard() {
  const [clicked, setClicked] = useState(false)

  const handleClick = (clicked: boolean) => {
    setClicked(clicked)
    console.log('Button clicked')
  }

  const getHeaderHeight = () => {
    const headerHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--desktop-header-height')
    );
    console.log('Header Height: ', headerHeight);
    return headerHeight;
  }

  const getFooterHeight = () => {
    const footerHeight = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--desktop-footer-height')
    );
    return footerHeight;
  }
  // TODO: both functions and divs, can be refactored
  return (
    <div className="flex-1 bg-amber-300 relative">
      {/* top half for transition */}
      <motion.div
        className="w-full h-[50%] bg-amber-600 z-20 absolute border-black border-2"
        animate={
          clicked ? {
            y: `-${getHeaderHeight()}px`,
          } : {
            y: 0
          }
        }
        transition={{ type: 'tween', ease: 'easeInOut' }}
      >
        <Button className='bg-red-900' onClick={() => handleClick(!clicked)}>Toggle Expand {JSON.stringify(clicked)}</Button>
      </motion.div>

      <motion.div
        className='w-40 h-40 z-30 absolute bg-red-600 
    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        animate={{
          scale: clicked ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
          mass: 0.7,
        }}
      />


      {/*  bottom half have to add this for smooth transition */}
      <motion.div
        className="w-full h-[50%] top-1/2 bg-amber-600 z-20 absolute border-black border-2"
        animate={
          clicked ? {
            y: `+${getFooterHeight()}px`,
          } : {
            padding: '20px',
            y: 0
          }
        }
        transition={{ type: 'tween', ease: 'easeInOut' }}
      >
        <Button className='bg-red-900' onClick={() => handleClick(!clicked)}>Toggle Expand {JSON.stringify(clicked)}</Button>
      </motion.div>

      {/* create paralax effect on this div
      <motion.div className='w-56 h-56  z-999 absolute top-full bg-pink-600'>
        lolllll
      </motion.div> */}
    </div >
  )
}

export { ProjectCard }