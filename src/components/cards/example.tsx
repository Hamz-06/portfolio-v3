'use client'
import { useExample } from '@/redux/slice/exampleSlice'
import React from 'react'

function ExampleClient() {
  const example = useExample()
  return (
    console.log('ExampleClient: ', example),
    <div>ExampleClient</div>
  )
}

export default ExampleClient