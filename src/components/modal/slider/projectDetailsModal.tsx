import React from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { XIcon } from 'lucide-react'
import { toggleDisplayProjectDetailsModal, useDisplayProjectDetailsModal } from '@/redux/slice/projectSlice'
import { useDispatch } from 'react-redux'

type ProjectDetailsModalProps = {
  children: React.ReactNode;
}

function ProjectDetailsModal({ children }: ProjectDetailsModalProps) {
  const dispatch = useDispatch()
  const isModalOpen = useDisplayProjectDetailsModal()
  return (
    <Sheet
      open={isModalOpen}
      onOpenChange={() => dispatch(toggleDisplayProjectDetailsModal())}
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