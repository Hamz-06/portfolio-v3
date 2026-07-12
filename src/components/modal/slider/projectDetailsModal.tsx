'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XIcon } from 'lucide-react'
import { toggleDisplayProjectDetailsModal, useDisplayProjectDetailsModal } from '@/zustand/projectDetailsModal'

type ProjectDetailsModalProps = {
  children: React.ReactNode;
}

function ProjectDetailsModal({ children }: ProjectDetailsModalProps) {
  const isModalOpen = useDisplayProjectDetailsModal()
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const shouldOpen = isModalOpen && isMobileOrTablet

  const handleClose = () => {
    toggleDisplayProjectDetailsModal()
  }

  return (
    <AnimatePresence>
      {shouldOpen && (
        <>
          {/* Semi-transparent Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black z-100 lg:hidden cursor-pointer"
          />

          {/* Slide-up Details Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 h-[90%] bg-zinc-900 border-t border-zinc-800 rounded-t-3xl z-110 lg:hidden flex flex-col overflow-hidden"
          >
            {/* Close Button Header */}
            <div className="flex justify-end p-4 pb-0 z-10 shrink-0">
              <button
                onClick={handleClose}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close details"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export { ProjectDetailsModal }