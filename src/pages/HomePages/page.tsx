import RootLayout from '@/app/layout'
import HomeFeatures from '@/features/HomeFeatures/page'
import React from 'react'

export default function HomePages () {
  return (
    //  overflow-y-scroll
    <main className=' bg-[#000] min-h-screen '>
        <HomeFeatures/>
    </main>
   
  )
}
