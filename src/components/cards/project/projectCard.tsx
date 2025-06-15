'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'


// TODO: find a better way to do this 
function ProjectCard() {
  const [clicked, setClicked] = useState(false)
  const scrollRef = useRef<null | HTMLDivElement>(null);


  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;
      const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
      console.log(`Scrolled: ${percent.toFixed(2)}%`);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (clicked: boolean) => {
    setClicked(clicked)
    console.log('Button clicked')
  }


  // TODO: both functions and divs, can be refactored


  return (
    <>
      <motion.div
        className="w-full h-[50%] bg-amber-600 z-20 absolute border-black border-2 pointer-events-none"
        animate={
          clicked ? {
            y: `0`,
          } : {
            y: `var(--desktop-header-height)`
          }
        }
        transition={{ type: 'tween', ease: 'easeInOut' }}
      >
        <div className='pointer-events-auto'>

          <Button className='bg-red-900' onClick={() => handleClick(!clicked)}>Toggle Expand {JSON.stringify(clicked)}</Button>
        </div>
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

      <motion.div
        className="w-full h-[50%] top-1/2 bg-amber-600 z-20 absolute border-black border-2 pointer-events-none"
        animate={
          clicked ? {
            y: `0`,
          } : {
            y: `calc(-1 * var(--desktop-footer-height))`
          }
        }
        transition={{ type: 'tween', ease: 'easeInOut' }}
      >
      </motion.div>

      <div
        ref={scrollRef}
        className="relative flex-1 overflow-auto bg-amber-300">
        {/* Amber full background */}
        <motion.div
          className="absolute inset-0 bg-amber-600 -z-10"
        >
          {/* You can put content here if needed */}
        </motion.div>

        {/* Orange scrollable content with transparency */}
        <motion.div className="relative bg-amber-400 bg-opacity-60 h-[200vh] p-4 z-10 text-black">
          Orange scrolls over amber with transparency.<br />
          Scroll down to see the effect.
        </motion.div>
      </div>
    </>
  )
}

export { ProjectCard }