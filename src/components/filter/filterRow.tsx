"use client"
import { cn } from "@/lib/utils"
import { removeSelectedCategory, setSelectedCategory, useAllCategories, useSelectedCategories } from "@/redux/slice/projectListSlice"
import { ProjectTypes } from "@/types/projects/projects"
import { useDispatch } from "react-redux"

interface FilterBarProps {
  className?: string
}

export function FilterBar({ className }: FilterBarProps) {
  const dispatch = useDispatch()
  const selectedCategories = useSelectedCategories()
  const allCategories = useAllCategories()

  const handleSelect = (id: ProjectTypes) => {
    const isAlreadySelected = selectedCategories?.includes(id);

    if (isAlreadySelected) {
      dispatch(removeSelectedCategory([id]));
    } else {
      dispatch(setSelectedCategory([id]));
    }
  };


  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {allCategories.map((category, idx) => (
        <button
          key={idx}
          onClick={() => handleSelect(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            selectedCategories?.includes(category) ? "bg-white text-black" : "bg-zinc-800/80 text-white hover:bg-zinc-700",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
