'use client'

import React from 'react'
import { ProjectSummary } from './projectSummary'
import { X } from 'lucide-react'
import { toggleDisplayProjectDetailsModal, useDisplayProjectDetailsModal } from '@/zustand/projectDetailsModal'

export function ProjectDetailSidePane() {
  const isVisible = useDisplayProjectDetailsModal()

  if (!isVisible) return null

  const handleCollapse = () => {
    toggleDisplayProjectDetailsModal()
  }

  return (
    <div className="hidden lg:flex flex-col w-[30%] shrink-0 h-full rounded-2xl bg-zinc-900 overflow-hidden relative mr-2 ml-2">
      {/* Collapse button header */}
      <div className="flex justify-end p-4 pb-0 z-10 shrink-0">
        <button
          onClick={handleCollapse}
          className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Collapse side panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ProjectSummary />
      </div>
    </div>
  )
}
