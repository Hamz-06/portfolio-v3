
"use client"

import Image from "next/image"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "../ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation"
import { CategorisedProject } from "@/sanity/schema/schema-types"


// TODO: fix onModal function, make it pass the state of the modal
interface SearchDropdownProps {
  isOpen: boolean
  onModal: () => void
  searchList: CategorisedProject[]
  querySearch: string
}

export function SearchModal({ isOpen, onModal, searchList, querySearch }: SearchDropdownProps) {
  const router = useRouter();

  function highlightMatch(text: string, query: string): React.JSX.Element {
    if (!query) return <>{text}</>

    const regex = new RegExp(`(${query})`, 'ig')
    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-gray-400 text-black font-semibold">{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    )
  }

  const redirectToProject = (productName: string, slug: string) => {
    const url = `/portfolio/${productName}/${slug}`
    onModal() // close the modal (refactor)
    router.push(url)
  }

  // TODO: move modal to generinc modal file
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onModal} >
      <DialogContent
        closeButtonElement={<XIcon className="w-3 h-3 stroke-white" />}
        id="search-bar-modal"
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="h-[80%] bg-zinc-800 overflow-scroll border-0 z-999">
        <VisuallyHidden>
          <DialogTitle>
            <p className="text-sm font-bold">Search Projects</p>
          </DialogTitle>
        </VisuallyHidden>
        {/* <DialogDescription> */}
        <div className="space-y-2">
          {searchList.map((item) => (
            <div
              onClick={() => redirectToProject(item.project_type, item.slug)}
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
                <p className="text-sm font-medium text-white truncate text-wrap line-clamp-2">{item.title}</p>
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
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>

  )
}