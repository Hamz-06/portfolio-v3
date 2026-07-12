
"use client"

import Image from "next/image"
import { XIcon, ChevronRight, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "../ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useRouter } from "next/navigation"
import { CategorisedProject } from "@/sanity/schema/schema-types"
import { useState, useEffect, useCallback } from "react"
import { Badge } from "../ui/badge"
import { PROJECT_PAGE_ROUTE } from "@/constants/pageRoutes"

interface SearchDropdownProps {
  isOpen: boolean
  onModal: () => void
  searchList: CategorisedProject[]
  querySearch: string
}

export function SearchModal({
  isOpen,
  onModal,
  searchList,
  querySearch,
}: SearchDropdownProps) {
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    setSelectedIndex(0)
  }, [searchList])

  const redirectToProject = useCallback(
    (productName: string, slug: string) => {
      onModal()
      router.push(PROJECT_PAGE_ROUTE(productName, slug))
    },
    [onModal, router]
  )

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault()
        setSelectedIndex((prev) =>
          e.shiftKey
            ? (prev - 1 + searchList.length) % searchList.length
            : (prev + 1) % searchList.length
        )
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (searchList[selectedIndex]) {
          const item = searchList[selectedIndex]
          redirectToProject(item.project_type, item.slug)
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + searchList.length) % searchList.length)
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % searchList.length)
      } else if (e.key === "Escape") {
        onModal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, selectedIndex, searchList, redirectToProject, onModal])

  function highlightMatch(
    text: string,
    query: string
  ): React.JSX.Element {
    if (!query) return <>{text}</>

    const regex = new RegExp(`(${query})`, "ig")
    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={i}
              className="bg-amber-500 text-zinc-900 font-semibold"
            >
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    )
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      web: "bg-blue-500/20 text-blue-300",
      mobile: "bg-purple-500/20 text-purple-300",
      design: "bg-pink-500/20 text-pink-300",
      fullstack: "bg-green-500/20 text-green-300",
      backend: "bg-red-500/20 text-red-300",
      frontend: "bg-cyan-500/20 text-cyan-300",
    }
    return colors[category.toLowerCase()] || "bg-zinc-700/50 text-zinc-300"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onModal}>
      <DialogContent
        closeButtonElement={<XIcon className="w-4 h-4 stroke-white" />}
        id="search-bar-modal"
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-h-[80vh] bg-gradient-to-b from-zinc-800 to-zinc-900 border-zinc-700 border z-999 p-0 shadow-2xl"
      >
        <VisuallyHidden>
          <DialogTitle>
            <p className="text-sm font-bold">Search Projects</p>
          </DialogTitle>
        </VisuallyHidden>

        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-zinc-700">
            <Search className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-400">
              {searchList.length} result{searchList.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
            {searchList.length > 0 ? (
              searchList.map((item, index) => (
                <button
                  key={item.slug}
                  onClick={() => redirectToProject(item.project_type, item.slug)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 text-left group",
                    selectedIndex === index
                      ? "bg-gradient-to-r from-amber-500/30 to-amber-500/10 border-l-2 border-amber-500"
                      : "hover:bg-zinc-700/50"
                  )}
                >
                  {/* Image */}
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg shadow-md">
                    <Image
                      src={item.first_image_url || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className={cn(
                          "text-xs font-medium",
                          getCategoryColor(item.project_type)
                        )}
                        variant="secondary"
                      >
                        {item.project_type.charAt(0).toUpperCase() +
                          item.project_type.slice(1)}
                      </Badge>
                      {item.sub_title && (
                        <p className="text-xs text-zinc-400 truncate">
                          {highlightMatch(item.sub_title, querySearch)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 flex-shrink-0 transition-all duration-200",
                      selectedIndex === index
                        ? "text-amber-500 translate-x-1"
                        : "text-zinc-600"
                    )}
                  />
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="w-8 h-8 text-zinc-700 mb-3" />
                <p className="text-sm text-zinc-400">No projects found</p>
              </div>
            )}
          </div>

          {/* Footer with keyboard hints */}
          {searchList.length > 0 && (
            <div className="border-t border-zinc-700 px-6 py-3 bg-zinc-900/50">
              <div className="flex gap-4 text-xs text-zinc-500">
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-zinc-400">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-zinc-400">
                    ⏎
                  </kbd>
                  <span>Select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-zinc-800 rounded border border-zinc-700 text-zinc-400">
                    Esc
                  </kbd>
                  <span>Close</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}