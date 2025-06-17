'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useInView } from "motion/react"
import { useDispatch } from 'react-redux'
import { displayFooter } from '@/redux/slice/layoutSlice'


// main page -> z35
// footer -> z38
// second page -> z37


function ProjectCard() {
  const dispatch = useDispatch()
  const [clicked, setClicked] = useState(false)
  const [inViewStatus, setInViewStatus] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const secondPageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(secondPageRef, { amount: 0.5 });

  const { scrollYProgress } = useScroll({
    container: scrollRef,
  })

  let timer: ReturnType<typeof setTimeout> | null = null
  let isBelowThreshold = false

  const handleScroll = (scrollPercent: number) => {
    if (scrollPercent <= 0.5) {
      if (!isBelowThreshold) {
        isBelowThreshold = true;

        timer = setTimeout(() => {
          // Recheck if still below threshold
          if (isBelowThreshold) {
            setClicked(true);
          }
          timer = null;
        }, 3000);
      }
    } else {
      setClicked(false);

      if (isBelowThreshold) {
        isBelowThreshold = false;

        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      }
    }
  };

  useEffect(() => {
    console.log("ScrollYProgress initialized:", scrollYProgress.get())
    const unsub = scrollYProgress.on("change", (v) => {
      const scrollPercentage = Math.round(v * 100);
      console.log("Scrolled:", Math.round(v * 100), "%");

      handleScroll(scrollPercentage);
    })
    handleScroll(0); //init

    return () => unsub()
  }, [scrollYProgress])


  // when the second page is in view 
  useEffect(() => {
    console.log(isInView, "isInView")
    setInViewStatus(isInView);
    dispatch(displayFooter(!isInView));
  }, [dispatch, isInView])

  const handleClick = (clickedState: boolean) => {
    setClicked(clickedState)

    console.log('Button clicked')
  }

  return (
    <>
      <SliderFrontPage scrollYprogress={scrollYProgress} clicked={clicked} onToggle={() => handleClick(!clicked)} />

      <div ref={scrollRef}
        // style={{ height: isInView ? 'clip' : 'scroll' }}

        className="relative flex-1 bg-amber-300 overflow-y-scroll"
      >

        {/* Amber full background */}

        {/* Orange scrollable content with transparency put it at the bottom */}
        <motion.div
          ref={secondPageRef}
          className="bg-amber-400 bg-opacity-60 translate-y-[125%] absolute h-3/4 w-full p-4 text-black z-37">
          {inViewStatus ? "✅ At least 30% in view" : "❌ Less than 30% in view"}

          Orange scrolls over amber with transparency.<br />
          Scroll down to see the effect.
        </motion.div>
      </div>
    </>
  )
}

type SliderFrontPageProps = {
  clicked: boolean
  onToggle: () => void
  scrollYprogress: MotionValue<number>
}

function SliderFrontPage({ clicked, onToggle, scrollYprogress }: SliderFrontPageProps) {
  // useEffect(() => {
  //   const unsub = scrollYprogress.on("change", (v) => {
  //     const _scrollPercentage = Math.round(v * 100);

  //   })
  //   return () => unsub()
  // }, [scrollYprogress])

  const blur = useTransform(scrollYprogress, [0, 1], [0, 10])
  const boxShadow = useTransform(scrollYprogress,
    [0, 1],
    ['0px 0px 0px rgba(0,0,0,0)', '0px 15px 40px rgba(0,0,0,0.6)'])

  return (
    <div
      style={{ zIndex: clicked ? 999 : 35 }}
      className='w-full h-full absolute z-35 pointer-events-none'>
      <motion.div
        className="w-full h-[50%] bg-amber-600  absolute border-black border-2 pointer-events-none"
        animate={clicked ? { y: '0' } : { y: 'var(--desktop-header-height)' }}
        initial={false}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      >
        <div className="pointer-events-auto">
          <Button className="bg-red-900" onClick={onToggle}>
            Toggle Expand {JSON.stringify(clicked)}
          </Button>
        </div>
      </motion.div>

      <motion.div
        style={{ filter: blur, boxShadow }}
        animate={clicked ? { scale: 1.5 } : { scale: 1 }}
        className="w-40 h-40 z-30 absolute bg-red-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={false}
      />

      <motion.div
        className="w-full h-[50%] top-1/2 bg-amber-600  absolute border-black border-2 pointer-events-none"
        initial={false}
        animate={clicked ? { y: '0' } : { y: 'calc(-1 * var(--desktop-footer-height))' }}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      />
    </div>
  )
}

export { ProjectCard }
