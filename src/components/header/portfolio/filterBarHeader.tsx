'use client'

import { capitalizeFirstLetter, cn, underscoreToSpace } from "@/lib/utils"
import { motion } from "framer-motion"
import { Button } from "../../ui/button"
import { useTRPC } from "@/backend/trpc/provider"
import { useQuery } from "@tanstack/react-query"
import { ClientCategoryTypes, useCategoryStore } from "@/store/categoryStore"

export function FilterBarHeader() {
  const trpc = useTRPC()

  const { data: categories, isLoading } = useQuery(
    trpc.portfolio.getProjectCategories.queryOptions())

  const { selectedCategory, setCategoryType } = useCategoryStore()

  if (!categories || isLoading) {
    return null // add skeleton loader here
  }

  const onClick = (id: ClientCategoryTypes) => {
    if (selectedCategory === id) {
      setCategoryType('all')
      return
    }
    setCategoryType(id)
  }

  return (
    <div className="sticky top-0 z-10 h-16">
      <motion.div className="scrollable-content flex gap-2 justify-start items-center px-2 sm:px-10 w-full h-full bg-green-600 z-20">
        <motion.div className="z-1 inset-0 w-full h-full bg-gradient-to-l from-black/50 via-black/60 to-black/45 absolute pointer-events-none" />

        <Button
          onClick={() => setCategoryType('all')}
          className={cn(
            "px-4 py-2 rounded-full text-sm bg-gray-400/30 font-light h-8 z-30",
            selectedCategory ? "hover:bg-gray-700/30 text-white" : "bg-white text-gray-900"
          )}
        >
          All
        </Button>
        {
          categories.map((category, idx) => {
            const capitalizedCategory = underscoreToSpace(capitalizeFirstLetter(category))
            const isSelected = selectedCategory === category
            return (
              <Button
                key={idx}
                onClick={() => onClick(category)}
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
