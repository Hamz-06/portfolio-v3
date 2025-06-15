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

  return (
    <div className="flex-1 bg-amber-300 relative">
      {/* top half for transition */}
      <motion.div
        className="w-full h-[50%] bg-amber-600 z-999 absolute border-black border-2"
        animate={
          clicked ? {
            y: `-${getHeaderHeight()}px`,
          } : {
            padding: '20px',
            y: 0
          }
        }
        transition={{ type: 'tween', ease: 'easeInOut' }}
      >
        <Button className='bg-red-900' onClick={() => handleClick(!clicked)}>Toggle Expand {JSON.stringify(clicked)}</Button>
      </motion.div>


      {/*  bottom half have to add this for smooth transition */}
      <motion.div
        className="w-full h-[50%] top-1/2 bg-amber-600 z-999 absolute border-black border-2"
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
    </div>
  )
}

export { ProjectCard }