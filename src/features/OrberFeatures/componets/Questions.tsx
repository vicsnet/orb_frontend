"use client"
import Image from 'next/image'
import { title } from 'process'
import React, { useState } from 'react'

const data =[
    {id:1, title:'What function does Vincent’s Orb have?', content:' Different Orbs have different functions. Vincent’s Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days.'},
    {id:2, title:'What’s a Keeper?', content:' Different Orbs have different functions. Vincent’s Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days.'},
    {id:3, title:'Who is the Orb for?', content:' Different Orbs have different functions. Vincent’s Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days.'},
    {id:4, title:'What’s a “cooldown?', content:' Different Orbs have different functions. Vincent’s Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days.'},
    {id:5, title:'I’m still confused. Why am I paying money to hold the Orb!?', content:' Different Orbs have different functions. Vincent’s Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days.'},
]
export default function Questions() {
    const[dataId, setDataId] = useState<Number | null>(null)

    const handleSetId =async(id:Number)=>{
        setDataId(dataId === id ? null : id)
        
    }

  return (
    <section>
        <div className="mt-[72px]">
            <h2 className="text-center text-[44px] font-bold leading-[52.8px] -tracking-[0.5px]">Questions you might want to ask </h2>

            <p className="text-center text-[16px] font-bold leading-[22px] tracking-[0.15px] w-[60%] mx-auto pt-2">
            Building beyond subscriber base—fostering a connected community and offering digital memberships that you truly owns and utilize across the web
            </p>
        </div>
        <section className=" flex flex-col gap-4 mt-[40px]">
            {
                data.map((details)=>(

        <div key={details.id} className=" w-[40%] mx-auto border-[1px] rounded-2xl px-4 py-6">
            <div className=" flex justify-between">
                <h2 className="text-[24px] font-bold leading-[32.016px]">{details.title}</h2>

                <Image src={`/images/${dataId === details.id ? 'Close.svg' :'Plus.svg'}`} alt='FAQ' width={24} height={24} onClick={()=>{handleSetId(details.id)}} className='ease-in transition duration-300 cursor-pointer'/>

            </div>
            
                <p className ={`text-[14px] font-normal leading-5 tracking-[0.17px] mt-[16px] ${dataId === details.id ? 'block' : 'hidden'} ease-in duration-500`}>
                {details.content}
                </p>
          
        </div>
                ))
            }
       

        </section>
    </section>
  )
}
