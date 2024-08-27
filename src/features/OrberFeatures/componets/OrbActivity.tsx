import Image from 'next/image'
import React from 'react'

export default function OrbActivity() {
  return (
    <section className='w-[90%] mx-auto'>
        <div className="mt-[40px] w-[80%] mx-auto">
            <h2 className="text-[44px] font-bold leading-[52.8px] -tracking-[0.5px]">Orb Activity</h2>

            <p className="text-[16px] font-bold leading-[22px] tracking-[0.15px] w-[38%] mt-[36px]">
            This section shows a list of latest key events for this Orb: whenever it’s won in auction, purchased or had its price adjusted.
            </p>


            {/* Activities */}
<section className="flex flex-col gap-4 mt-[40px]">

            {/* orb purchase */}
            <div className="flex w-[100%] border-[1px] border-[#F4F4F4] justify-between rounded-2xl py-6 px-6" style={{background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.12) 100%)'}}>
                <div className="flex items-center gap-2">

                <Image src='images/Send .svg' alt="Orb purchased" width={24} height={24} />

                <p className="text-[#99E515] text-24 font-bold leading-[32.016px]"> Orb Purchased </p>

                <p className="text-[20px] font-bold leading-[26px] tracking-[0.15px] text-[#FFFFFF]"> for 100 strk</p>

                <p className="text-[14px] font-normal leading-[20px] tracking-[0.17px] text-[#FFFFFF]"> by OxE4...b835</p>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-[14px] font-normal leading-[20px] tracking-[0.17px]">2 months ago</p>

                    <div className="flex items-center gap-1">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">Transaction</p>
                    <Image src='/images/Group.svg' alt={"Vincent"} width={16} height={16}/>
                </div>
                </div>
            </div>


            {/* orb open */}
            <div className="flex w-[100%] border-[1px] border-[#F4F4F4] justify-between rounded-2xl py-6 px-6" style={{background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.12) 100%)'}}>
                <div className="flex items-center gap-2">

                <Image src='images/Unlock.svg' alt="Orb Open " width={24} height={24} />

                <p className="text-[#99E515] text-24 font-bold leading-[32.016px]"> Orb Open </p>

                <p className="text-[14px] font-normal leading-[20px] tracking-[0.17px] text-[#FFFFFF]"> by OxE4...b835</p>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-[14px] font-normal leading-[20px] tracking-[0.17px]">2 months ago</p>

                    <div className="flex items-center gap-1">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">Transaction</p>
                    <Image src='/images/Group.svg' alt={"Vincent"} width={16} height={16}/>
                </div>
                </div>
            </div>
           
            {/* orb open */}
            <div className="flex w-[100%] border-[1px] border-[#F4F4F4] justify-between rounded-2xl py-6 px-6" style={{background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.12) 100%)'}}>
                <div className="flex items-center gap-2">

                <Image src='images/Document.svg' alt="Orb Open " width={24} height={24} />

                <p className="text-[#99E515] text-24 font-bold leading-[32.016px]"> Orb Invoked </p>

                <p className="text-[14px] font-normal leading-[20px] tracking-[0.17px] text-[#FFFFFF]"> by OxE4...b835</p>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-[14px] font-normal leading-[20px] tracking-[0.17px]">2 months ago</p>

                    <div className="flex items-center gap-1">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">Transaction</p>
                    <Image src='/images/Group.svg' alt={"Vincent"} width={16} height={16}/>
                </div>
                </div>
            </div>
</section>
        </div>
    </section>
  )
}
