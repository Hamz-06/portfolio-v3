'use client'

import { MAIN_CONTENT_ID } from "@/app/(home)/portfolio/page"
import { cn } from "@/lib/utils"
import { setSelectedCategory, useAllCategories, useSelectedCategory } from "@/redux/slice/projectListSlice"
import { ProjectTypes } from "@/types/projects/projects"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Button } from "../ui/button"


//todo: split this file into filter and toggle sidebar
// Threshold for scroll event, animate > 50
const THRESHOLD_IN_PX = 30;

export function FilterBar() {
  const dispatch = useDispatch()

  const selectedCategory = useSelectedCategory()
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
    // already selected, ignore 
    if (selectedCategory === id) {
      dispatch(setSelectedCategory(null))
      return
    }
    dispatch(setSelectedCategory(id))
  }

  return (
    <>

      <motion.div
        className="flex gap-2 justify-start items-center px-10 w-full h-full"
      // animate={{
      //   backgroundColor: animateFilterHeader ? "oklch(48.8% 0.243 264.376)" // green with transparency (acts like a tint)
      //     : "rgba(0, 0, 0, 0)",
      // }}
      // transition={{
      //   duration: 1,
      //   ease: 'easeInOut',
      // }}
      >
        {/* <div className="w-full h-full absolute bg-black/60"></div> */}
        {
          allCategories.map((category, idx) => {
            const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1)
            const isSelected = selectedCategory === category
            return (
              <Button
                key={idx}
                onClick={() => handleSelect(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm bg-gray-400/30 font-light h-8",
                  isSelected
                    ? "bg-white text-gray-900"
                    : "bg-gray-400/30 text-white",
                )}
              >
                {capitalizedCategory}
              </Button>
            )
          })
        }
      </motion.div>
    </>
  )
}
