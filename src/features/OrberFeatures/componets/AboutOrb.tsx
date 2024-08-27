import Image from 'next/image'
import React from 'react'

export default function AboutOrb() {
  return (
    <section className='w-[90%] mx-auto'>
        <div className="w-[40%]">
        <h2 className="text-[44px] font-bold leading-[52.8px] -tracking-[0.50px] text-[#FFFFFF] mt-[160px]">
            About the Orb
        </h2>

        <p className="text-[16px] font-bold leading-[22px] tracking-[0.15px] mt-[20px]">
        Up until now, much of the NFT space has concerned itself primarily with art, pictures, jpegs and galleries. Orbs are different. Orbs are usable 1-of-1 NFTs that belong in inventories, not in galleries. They are for usage, not display. Conceptually, an Orb is a precious item that belongs in your magic item bag. Technically, the Orb is a modified ERC-721 on Ethereum that manages ownership functions through auctions and fractional ownership.
        </p>

        <div className="flex flex-col gap-4 mt-[40px]">
            <div className="flex items-center gap-4">
                <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">Created by</h2>
                <p className="">..................................................................................</p>

                <div className="flex items-center">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">Vincent</p>
                    <Image src='/images/Group.svg' alt={"Vincent"} width={16} height={16}/>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">Contract</h2>
                <p className="">.................................................................................</p>

                <div className="flex items-center">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">0x8d6..jh7</p>
                    <Image src='/images/Group.svg' alt={"Vincent"} width={16} height={16}/>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">Cooldown</h2>
                <p className="">........................................................................................</p>

                <div className="flex items-center">
                    <p className="text-[14px] font-bold tracking-[0.46px] underline">7 Days</p>
                    
                </div>
            </div>
        </div>
        </div>
    </section>
  )
}
