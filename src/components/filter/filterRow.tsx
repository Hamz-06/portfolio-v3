'use client'

import { MAIN_CONTENT_ID } from "@/app/(home)/portfolio/page"
import { cn } from "@/lib/utils"
import { removeSelectedCategory, setSelectedCategory, useAllCategories, useSelectedCategories } from "@/redux/slice/projectListSlice"
import { ProjectTypes } from "@/types/projects/projects"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"


// Threshold for scroll event, animate > 50
const THRESHOLD_IN_PX = 30;

export function FilterBar() {
  const dispatch = useDispatch()
  const selectedCategories = useSelectedCategories()
  const allCategories = useAllCategories()
  const [animateFilterHeader, setAnimateFilterHeader] = useState(false)

  useEffect(() => {
    const el = document.getElementById(MAIN_CONTENT_ID)
    if (!el) return

    const handleScroll = () => {
      const scrollY = el.scrollTop;

      if (scrollY > THRESHOLD_IN_PX) {
        setAnimateFilterHeader(true)
      } else {
        setAnimateFilterHeader(false)
      }
    }
    el.addEventListener('scroll', handleScroll, { passive: true })

    handleScroll()

    return () => {
      el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    console.log(animateFilterHeader)
  }, [animateFilterHeader])


  const handleSelect = (id: ProjectTypes) => {
    const isAlreadySelected = selectedCategories?.includes(id);

    if (isAlreadySelected) {
      dispatch(removeSelectedCategory([id]));
    } else {
      dispatch(setSelectedCategory([id]));
    }
  }

  return (
    <>

      <motion.div
        className="flex gap-2 justify-start items-center px-10 w-full h-full bg-blue-700/80"
        animate={{
          backgroundColor: animateFilterHeader ? "#1447e6" // green with transparency (acts like a tint)
            : "rgba(0, 0, 0, 0)",
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        {/* <div className="w-full h-full absolute bg-black/60"></div> */}
        {allCategories.map((category, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              selectedCategories?.includes(category)
                ? "bg-white text-black"
                : "bg-zinc-800/80 text-white hover:bg-zinc-700",
            )}
          >
            {category}
          </button>
        ))}
      </motion.div>
    </>
  )
}
