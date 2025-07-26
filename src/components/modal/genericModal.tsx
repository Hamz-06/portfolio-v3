// eventually move all modals to this file

import { XIcon } from "lucide-react"
import { Dialog, DialogContent } from "../ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { DialogTitle } from "@radix-ui/react-dialog"

interface GenericModalProps {
  isOpen: boolean
  onModal: () => void
  title: string
  children: React.ReactNode
}

export function GenericModal({ isOpen, onModal, title, children }: GenericModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onModal}>
      <DialogContent
        closeButtonElement={<XIcon className="w-3 h-3 stroke-white" />}
        id="generic-modal"
        className="h-[80%] bg-zinc-800 overflow-scroll border-0 z-999 ">
        {/* Content goes here */}
        <VisuallyHidden>
          <DialogTitle>
            <p className="text-sm font-bold">{title}</p>
          </DialogTitle>
        </VisuallyHidden>
        {children}
      </DialogContent>
    </Dialog>
  )
}