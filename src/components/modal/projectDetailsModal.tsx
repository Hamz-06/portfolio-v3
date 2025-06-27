import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog'

type ProjectDetailsModalProps = {
  isOpen: boolean
  onModal: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode;
}
function ProjectDetailsModal({ isOpen, onModal, children }: ProjectDetailsModalProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onModal}
    >
      <DialogContent
        className="!w-[80vw] !max-w-none !sm:max-w-none h-[90%] bg-amber-400 overflow-scroll p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

export { ProjectDetailsModal }