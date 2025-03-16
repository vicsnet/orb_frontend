import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from './components/HeroSection'
import CreatorsContent from './components/CreatorsContent'
import KnowMore from './components/KnowMore'
import Footer from '@/components/Footer'
import CreateOrb from '@/components/CreateOrb'

export default function HomeFeatures() {
  const[openCreateOrb, setOpenCreateOrb] = useState(false)
  
  return (
    <main className='h-screen overflow-hidden overflow-y-scroll '>
        <Navbar title="Orb Space" setOpenCreateOrb={setOpenCreateOrb} openCreateOrb={openCreateOrb}/>
        <HeroSection />
        <CreatorsContent />
        <KnowMore/>
        <Footer setOpenCreateOrb={setOpenCreateOrb}/>
        {openCreateOrb && <CreateOrb
         setOpenCreateOrb={setOpenCreateOrb}
         />}
    </main>
  )
}
