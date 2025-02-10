"use client"
// import { useAppSelector } from '@/redux/store'
import { useOrbtermsStore } from '@/zustand/Wallet'
import Image from 'next/image'
import { title } from 'process'
import React, { useState } from 'react'

interface data{
    title:string,
    content:string
}
export default function Questions() {
    const[dataId, setDataId] = useState<Number | null>(null)

    const {data} = useOrbtermsStore() ;
  
    
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
                data?.map((details:data, index:number)=>(

        <div key={index} className=" w-[40%] mx-auto border-[1px] rounded-2xl px-4 py-6">
            <div className=" flex justify-between">
                <h2 className="text-[24px] font-bold leading-[32.016px]">{details?.title}</h2>

                <Image src={`/images/${dataId === index? 'Close.svg' :'Plus.svg'}`} alt='FAQ' width={24} height={24} onClick={()=>{handleSetId(index)}} className='ease-in transition duration-300 cursor-pointer'/>

            </div>
            
                <p className ={`text-[14px] font-normal leading-5 tracking-[0.17px] mt-[16px] ${dataId === index ? 'block' : 'hidden'} ease-in duration-500`}>
                {details?.content}
                </p>
          
        </div>
                ))
            }
       

        </section>
    </section>
  )
}
