'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import { useInView } from "motion/react"
import { useDispatch } from 'react-redux'
import { displayFooter } from '@/redux/slice/layoutSlice'
import { Diamond, Heart, Minimize2 } from 'lucide-react'
import Image from 'next/image'
import clsx from 'clsx'


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
        className="relative flex-1 bg-black overflow-y-scroll"
      >

        {/* Amber full background */}
        {/* <motion.div className='p-5 text-lg font-medium absolute top-0 right-'>
          hello
        </motion.div> */}

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


  const backgroundColor = 'red';
  const blur = useTransform(scrollYprogress, [0, 1], [10, 0])
  const boxShadow = useTransform(scrollYprogress,
    [0, 1],
    ['0px 15px 40px rgba(0,0,0,0.6)', '0px 0px 0px rgba(0,0,0,0)'])


  return (
    <div
      style={{
        zIndex: clicked ? 999 : 35,
      }}
      className={clsx('w-full h-full absolute z-35 pointer-events-none *:absolute',

      )}
    >

      {/* black shade */}
      <motion.div className='z-1  inset-0 w-full h-full  bg-gradient-to-l from-black/60 via-black/50 to-black/40' />
      <motion.div className="z-1  inset-0 bg-gradient-to-b w-full h-full from-gray-50/5 via-transparent to-transparent" />

      {/* // top red */}
      <motion.div
        className={clsx("w-full h-[50%] absolute rounded-t-2xl")}
        style={{ backgroundColor: backgroundColor }}
        animate={clicked ? { y: '0' } : { y: 'var(--desktop-header-height)' }}
        initial={false}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      />


      {/* image */}
      <motion.div
        // style={{ filter: blur, boxShadow }}
        animate={clicked ? { scale: 1.5 } : { scale: 1 }}
        className=" z-37 w-[410px] h-[410px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        rounded-2xl overflow-clip"
        initial={false}
      >
        <Image
          src={"/bart-simpson-cartoon.png"}
          fill={true}
          alt={''}
        />
      </motion.div>

      {/* bottom red */}
      <motion.div
        className="w-full h-[50%] top-1/2 rounded-b-2xl"
        initial={false}
        style={{ backgroundColor: backgroundColor }}
        animate={clicked ? { y: '0' } : { y: 'calc(-1 * var(--desktop-footer-height))' }}
        transition={{ type: 'tween', ease: 'easeInOut' }}
      />


      {/* controls, todo: refactor this */}
      <motion.div
        animate={clicked ? { y: '0' } : { y: 'var(--desktop-header-height)' }}
        className="top-0 right-0 m-5 flex justify-center items-center z-35 pointer-events-auto"
      >
        <Minimize2 className='stroke-[1.8] opacity-70 h-9 w-9 p-2 mx-2 rounded-full hover:bg-white/50 hover:drop-shadow-xl/50' />

        <div className="w-[2px] mx-2 h-7 bg-gray-300"></div>

        <Diamond className='stroke-[1.8] opacity-70 h-9 w-9 p-2 mx-2 rounded-full hover:bg-white/50 hover:drop-shadow-xl/50' />

        <Heart className='stroke-[1.8] opacity-70 h-9 w-9 p-2 mx-2 rounded-full hover:bg-white/50 hover:drop-shadow-xl/50' />
      </motion.div>

      {/* song name  */}
      <motion.div
        className="z-2 pl-10 pb-10 bottom-0 left-0 text-white"
        animate={{ y: clicked ? 0 : 'calc(-1 * var(--desktop-footer-height))' }}
        initial={false}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <a className="text-2xl font-extrabold">Song 123</a> <br />
        <a className="font-light -translate-y-1 inline-block">marlon craft</a>
      </motion.div>

    </div >
  )
}

export { ProjectCard }
