import Image from 'next/image'
import React from 'react'

export default function OrbInvocationContent() {
  return (
    <div className='w-[40%] '>
        {/* question */}
        <div className=" flex flex-col gap-2">
            <div className="flex gap-2 items-center ">
                <Image src="/images/Identicon.svg" alt="user" width={40} height={40} />
                    <p className="text-[14px] font-bold leading-[20px] tracking-[0.1px]">
                    0xA77D...98b6
                    </p>
                <p className="text-[12px] font-normal leading-[20px] tracking-[0.17px] text-[#A1A3A7]"> 3 months ago</p>
            </div>
            <div className="">
                <p className="text-[16px] font-bold tracking-[0.15px] text-[#FFF]">
                Up until now, much of the NFT space has concerned itself primarily with art, pictures, jpegs and galleries. Orbs are different. Orbs are usable 1-of-1 NFTs that belong in inventories, not in galleries. They are for usage, not display. Conceptually, an Orb is a precious item that belongs in your magic item bag. Technically, the Orb is a modified ERC-721 on Ethereum that manages ownership functions through auctions and fractional ownership.
                </p>
            </div>
        </div>
        {/* response */}

            <div className="mt-[34px] flex flex-col gap-2">
            <div className="flex gap-2 items-center ">
                    <p className="text-[14px] font-bold leading-[20px] tracking-[0.1px]">
                    0xA77D...98b6 Response
                    </p>
                <p className="text-[12px] font-normal leading-[20px] tracking-[0.17px] text-[#A1A3A7]"> 3 months ago</p>
            </div>
            <div className="">
                <p className="text-[16px] font-bold tracking-[0.15px] text-[#FFF]">
                Up until now, much of the NFT space has concerned itself primarily with art, pictures, jpegs and galleries. Orbs are different. Orbs are usable 1-of-1 NFTs that belong in inventories, not in galleries. They are for usage, not display. Conceptually, an Orb is a precious item that belongs in your magic item bag. Technically, the Orb is a modified ERC-721 on Ethereum that manages ownership functions through auctions and fractional ownership.
                </p>
            </div>
            </div>
    </div>
  )
}
