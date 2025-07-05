import React from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { XIcon } from 'lucide-react'

type ProjectDetailsModalProps = {
  isOpen: boolean
  onModal: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode;
}
function ProjectDetailsModal({ isOpen, onModal, children }: ProjectDetailsModalProps) {
  return (
    <Sheet
      open={isOpen}
      onOpenChange={onModal}
    >
      <SheetContent
        closeButton={
          <XIcon className="w-6 h-6 stroke-zinc-400 cursor-pointer hover:stroke-white" />
        }
        className="!w-[100vw] sm:!w-[80vw] !max-w-none !sm:max-w-none h-full  overflow-scroll p-0 z-999"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {children}
      </SheetContent>
    </Sheet>
  )
}

export { ProjectDetailsModal }