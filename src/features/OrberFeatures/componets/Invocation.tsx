import React from 'react'
import OrbInvocationContent from './OrbInvocationContent'
import OrbInvocationPrivate from './OrbInvocationPrivate'

export default function Invocation() {
  return (
    <section className='w-[90%] mx-auto'>
       <h2 className="text-[44px] font-bold leading-[52.8px] -tracking-[0.5px] mt-[100px] mb-[46px]">
       Orb Invocations
       </h2>
        
        {/* invocation content */}
        <section className='flex flex-col gap-4'>

        <OrbInvocationContent/>
        <OrbInvocationPrivate/>
        </section>
        </section >
  )
}
