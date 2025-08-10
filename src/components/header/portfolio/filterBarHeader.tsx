'use client'

import { capitalizeFirstLetter, cn, underscoreToSpace } from "@/lib/utils"
import { setSelectedCategory, useSelectedCategory } from "@/redux/slice/projectDataSlice"
// import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { Button } from "../../ui/button"
import { CategorisedProjects, ProjectTypes } from "@/sanity/schema/schema-types"
import { useEffect } from "react"



type FilterBarHeaderProps = {
  projectCategories: (keyof CategorisedProjects)[]
}
export function FilterBarHeader({ projectCategories }: FilterBarHeaderProps) {
  const dispatch = useDispatch()

  const selectedCategory = useSelectedCategory()


  const handleSelect = (id: ProjectTypes) => {
    console.log('id', id)
    // already selected, ignore 
    if (selectedCategory === id) {
      dispatch(setSelectedCategory(null))
      return
    }
    dispatch(setSelectedCategory(id))
  }

  useEffect(() => {
    console.log(selectedCategory)
  }, [])
  return (
    <div className="sticky top-0 z-10 h-16">
      <motion.div className="scrollable-content flex gap-2 justify-start items-center px-2 sm:px-10 w-full h-full bg-green-600 z-20">
        <motion.div className="z-1 inset-0 w-full h-full bg-gradient-to-l from-black/50 via-black/60 to-black/45 absolute pointer-events-none" />

        <Button
          onClick={() => dispatch(setSelectedCategory(null))}
          className={cn(
            "px-4 py-2 rounded-full text-sm bg-gray-400/30 font-light h-8 z-30",
            !selectedCategory
              ? "bg-white text-gray-900"
              : "hover:bg-gray-700/30 text-white",
          )}
        >
          All
        </Button>
        {
          projectCategories.map((category, idx) => {
            const capitalizedCategory = underscoreToSpace(capitalizeFirstLetter(category))
            const isSelected = selectedCategory === category
            return (
              <Button
                key={idx}
                onClick={() => handleSelect(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm bg-gray-400/30 font-light h-8 z-30",
                  isSelected
                    ? "bg-white text-gray-900"
                    : "hover:bg-gray-700/30 text-white",
                )}
              >
                {capitalizedCategory}
              </Button>
            )
          })
        }
      </motion.div>
    </div>
  )
}
