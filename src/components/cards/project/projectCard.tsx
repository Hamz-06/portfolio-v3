'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useInView } from "motion/react"
import { useDispatch } from 'react-redux'
import { displayFooter } from '@/redux/slice/layoutSlice'

function ProjectCard() {
  const dispatch = useDispatch()
  const [clicked, setClicked] = useState(false)
  const [inViewStatus, setInViewStatus] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const secondPageRef = useRef<null>(null);
  const isInView = useInView(secondPageRef, { amount: 0.2 });

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let timer: ReturnType<typeof setTimeout> | null = null
    let isBelowThreshold = false

    const handleScroll = () => {
      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight
      const clientHeight = el.clientHeight

      const percent = (scrollTop / (scrollHeight - clientHeight)) * 100

      if (percent <= 0.5) {
        if (!isBelowThreshold) {
          isBelowThreshold = true
          timer = setTimeout(() => {
            setClicked(true)
            timer = null
          }, 3000)
        }
      } else {
        setClicked(false)
        if (isBelowThreshold) {
          isBelowThreshold = false
          if (timer) {
            clearTimeout(timer)
            timer = null
          }
        }
      }
    }

    // Initial call to set state correctly on mount
    handleScroll()

    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

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
      <SliderFrontPage clicked={clicked} onToggle={() => handleClick(!clicked)} />

      <div ref={scrollRef} className="relative flex-1 bg-amber-300 overflow-auto">
        {/* Amber full background */}

        {/* Orange scrollable content with transparency */}
        <motion.div
          ref={secondPageRef}
          className="bg-amber-400 bg-opacity-60 translate-y-full absolute h-full w-full p-4 z-999 text-black">
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
}

function SliderFrontPage({ clicked, onToggle }: SliderFrontPageProps) {
  return (
    <>
      <motion.div
        className="w-full h-[50%] bg-amber-600 z-20 absolute border-black border-2 pointer-events-none"
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
        className="w-40 h-40 z-30 absolute bg-red-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: clicked ? 1.5 : 1 }}
        initial={false}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 20,
          mass: 0.7,
        }}
      />

      <motion.div
        className="w-full h-[50%] top-1/2 bg-amber-600 z-20 absolute border-black border-2 pointer-events-none"
        initial={false}
        animate={clicked ? { y: '0' } : { y: 'calc(-1 * var(--desktop-footer-height))' }}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      />
    </>
  )
}

export { ProjectCard }
