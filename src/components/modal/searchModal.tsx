
"use client"

import Image from "next/image"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { SanityProject } from "@/types/projects/projects"
import { Dialog, DialogContent } from "../ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"

interface SearchDropdownProps {
  isOpen: boolean
  onModal: () => void
  searchList: SanityProject[]
  querySearch: string
}

export function SearchDropdown({ isOpen, onModal, searchList, querySearch }: SearchDropdownProps) {
  // const router = useRouter()

  function highlightMatch(text: string, query: string): React.JSX.Element {
    if (!query) return <>{text}</>

    const regex = new RegExp(`(${query})`, 'ig')
    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-yellow-300 text-black font-semibold">{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    )
  }
  // hard redirect to skip the interceptor
  const hardRedirect = (productName: string, slug: string) => {
    const url = `/portfolio/${productName}/${slug}`
    window.location.replace(url);
  }

  return (

    <Dialog
      open={isOpen}
      onOpenChange={onModal} >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="h-[80%] bg-amber-400  overflow-scroll">
        <DialogTitle>
          <p className="text-sm font-bold">Search</p>
        </DialogTitle>
        {/* <DialogDescription> */}
        <div className="space-y-2">
          {searchList.map((item) => (
            <div
              onClick={() => hardRedirect(item.project_type, item.slug)}
              key={item.slug} className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-700 cursor-pointer">
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden">
                <Image
                  src={item.first_image_url || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className={cn("object-cover rounded-full")}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <p className="text-xs text-zinc-400 truncate">
                  {item.project_type.charAt(0).toUpperCase() + item.project_type.slice(1)}
                  {item.sub_title && (
                    <span>
                      {" • "}
                      {highlightMatch(item.sub_title, querySearch)}
                    </span>
                  )}
                </p>
              </div>
              <button className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-600">
                <Clock className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>

  )
}