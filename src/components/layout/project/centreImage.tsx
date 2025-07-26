'use client'
import React from 'react'
import { ImageGrid } from '@/components/grid/project/imageGrid'
import { useGridMode } from '@/redux/slice/projectPageSlice'
import { ImageCarousel } from '@/components/carousel/project/imageCarousel'

function CentreImage() {
  const gridMode = useGridMode()

  return gridMode ? <ImageGrid /> : <ImageCarousel />
}

export default CentreImage