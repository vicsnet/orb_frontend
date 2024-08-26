import React from 'react'
import Logo from './Logo'

export default function Navbar() {
  return (
    <section className='w-[90%] mx-auto'>
        <div className="flex justify-between pt-[64px] items-center">
            <Logo title='orb space' />
        <button className=' font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2'> Create your own Orb</button>
        </div>
    </section>
  )
}
