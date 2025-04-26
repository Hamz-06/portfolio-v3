import React from 'react'

function Page() {
  return (
    <div className="flex flex-col h-full w-full overflow-auto">
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-lg">This page does not exist.</p>
      </div>
    </div>
  )
}

export default Page