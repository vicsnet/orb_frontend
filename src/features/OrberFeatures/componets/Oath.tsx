import Image from 'next/image'
import React from 'react'

export default function Oath() {
  return (
    <section className='w-[90%] mx-auto mt-[72px]'>
        <h2 className="text-[44px] font-bold leading-[52.8px] -tracking-[0.5px] ">Oath</h2>

        <div className="w-[40%] border-[1px] px-[1.5%] mt-[20px] rounded-2xl border-[#F4F4F4]" style={{background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.12) 100%)'}}>
            <p className="text-[16px] font-bold  tracking-[0.15px] py-[3%]">
            I, Vincent Brian, swear to honor my Orb as long as I am able, or until it is retired. I shall answer any permissible question dutifully to the best of my abilities – as long as answering does not bring me into conflict with the law or my ethical code, or compromise myself or others. The totality of my aggregate knowledge is at your disposal. This is my Orb, and I shall bear no other Orbs of this kind under the reign of this Orb. The blockchain bears my witness.
            </p>

        </div>

        <div className="flex flex-col gap-4 mt-[40px] w-[40%]">
            <div className="flex items-center gap-4">
                <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">Privacy</h2>
                <p className="">..............</p>

                <div className="flex items-center">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">Private questions and answers allowed, booking allowed</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">Exclusivity</h2>
                <p className="">......................</p>

                <div className="flex items-center">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">Keepers can read past Q&A and reveal their own</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">Oath sworn on</h2>
                <p className="">...................................................................</p>

                <div className="flex items-center">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">July 17th, 2024</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">Oath honoured on</h2>
                <p className="">.............................................................</p>

                <div className="flex items-center">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">July 18th, 2034</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">Oath Content Hash</h2>
                <p className="">...............................................................</p>

                <div className="flex items-center">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">0x8d6..jh7</p>
                    <Image src='/images/Group.svg' alt={"Vincent"} width={16} height={16}/>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">Oath Swearing Transaction</h2>
                <p className="">.......................................................</p>

                <div className="flex items-center">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">Signed</p>
                    <Image src='/images/Group.svg' alt={"Vincent"} width={16} height={16}/>
                </div>
            </div>
            
           
        </div>
    </section>
  )
}
