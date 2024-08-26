import Navbar from '@/components/Navbar'
import React from 'react'
import HeroSection from './components/HeroSection'
import CreatorsContent from './components/CreatorsContent'
import KnowMore from './components/KnowMore'
import Footer from '@/components/Footer'

export default function HomeFeatures() {
  return (
    <main className=''>
        <Navbar/>
        <HeroSection />
        <CreatorsContent />
        <KnowMore/>
        <Footer />
    </main>
  )
}
