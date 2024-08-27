"use client"
import React from 'react'
import Logo from './Logo'
import { usePathname } from 'next/navigation'

export default function Navbar({title}) {
  const pathname = usePathname();
  return (
    <section className='w-[90%] mx-auto'>
        <div className="flex justify-between pt-[64px] items-center">
            <Logo title={title} />
            {
              pathname === '/' ? 

              <button className=' font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2'> Create your own Orb</button>
              :
        <button className=' font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2'> Connect Wallet</button>
            }
        </div>
    </section>
  )
}
