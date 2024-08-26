import Image from 'next/image'
import React from 'react'

export default function KnowMore() {
  return (
    <section className='mt-[96px]'>
        <h2 className="text-[44px] leading-[52.8px] font-bold text-[#FFF] text-center ">Know more about an Orb</h2>
        <p className="w-[50%] text-center font-bold text-[16px] leading-[22px] trcking-[0.15px] text-[#FFF] mx-auto">Discover the unique features and endless possibilities that each orb offers. Dive into the details and see how it can elevate your creative journey</p>

        {/* conteent */}

        <div className="mt-[40px] flex w-[90%] mx-auto">
            <div className="flex gap-2 w-[33.33%] px-2">
                <Image src='/images/Batch.svg' alt="what is an orb" width={24} height={24} className='mt-[-94px]'/>
                <div className=''>
                    <h2 className="text-[24px] font-bold leading-[32.016px] text-[#FFF]">What is an Orb?</h2>
                    <p className="text-[16px] font-normal leading-[22px] tracking-[0.15px] text-[#FFF]">An Orb is an NFT with a recurring use case.
                    It allows you to call upon a person a service they provide (for now, asking a question and receiving an answer). It&#39;s like a magic game item, except it works in real life.</p>
                </div>
            </div>
            <div className="flex gap-2 w-[33.33%] px-2">
                <Image src='/images/Experimental.svg' alt="what is an orb" width={24} height={24} className='mt-[-94px]'/>
                <div className=''>
                    <h2 className="text-[24px] font-bold leading-[32.016px] text-[#FFF]">How secure is an Orb?</h2>
                    <p className="text-[16px] font-normal leading-[22px] tracking-[0.15px] text-[#FFF]">They are enshrined forever into the blockchain. Every action made by the creator, from the moment they created their Orb to the last time they respond to the Orb&#39;s request, is etched into the chain.</p>
                </div>
            </div>
            <div className="flex gap-2 w-[33.33%] px-2">
               
                <Image src='/images/Token.svg' alt="what is an orb" width={24} height={24} className='mt-[-94px]'/>
                <div className=''>
                    <h2 className="text-[24px] font-bold leading-[32.016px] text-[#FFF]">How can I keep an Orb?</h2>
                    <p className="text-[16px] font-normal leading-[22px] tracking-[0.15px] text-[#FFF]">You can own an Orb by subscribing at a set a price at which the creator is willing to let go of a fraction of the Orb at. A percentage of that price is with every block in the blockchain to the creator.</p>
                </div>
            </div>

        </div>
    </section>
  )
}
