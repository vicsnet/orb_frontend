import Image from 'next/image'
import React from 'react'

interface CreatorProps{
    image: string,
    orber: string,
    creator: string,
}
export default function SingleCreator(props:CreatorProps) {
  return (
    <div className=' px-auto flex max-w-[368px] min-w-[300px] h-[160px] rounded-2xl gap-4 border-[1px] border-[#303033] p-[9px]' style={{background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.12) 100%)', boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.10)'}}>
        <div className="">
            <Image alt={props.orber} src={props.image} width={140} height={140} className='rounded-[8px] '/>
        </div>
        <div className="text-[#FFFFFF] flex flex-col gap-2">
            <h2 className="text-[24px] font-bold leading-[32.016px]">{props.orber}&#39;s Orb</h2>
            <p className="text-[14px] font-bold tracking-[0.1px]">[@{props.creator}]</p>
            <p className="text-[14px] font-bold tracking-[0.1px]">created by {props.creator}</p>
            <button className='bg-[#99E515] mt-3 text-[14px] font-bold leading-[24px] tracking-[0.4px] text-center w-[156px] h-[32px] rounded-[6px] text-[#121312]'>View Orb</button>
        </div>
    </div>
  )
}
