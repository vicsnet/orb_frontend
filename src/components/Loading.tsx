import React from 'react'

export default function Loading() {
  return (
    <main className='w-[100%] h-screen top-0 absolute bbackdrop-blur-sm bg-black/30 flex items-center justify-center z-10'>
        <div className="w-[200px] h-[200px] bg-[#99E515] flex flex-col items-center justify-center">

        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#000000]"></div>
          <span className="ml-3 text-[#000000]">Loading...</span>
        </div>
        </div>
    </main>
  )
}
