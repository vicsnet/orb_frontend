import React from 'react'
import Image from 'next/image'


export default function OrbInvocationContent() {
  return (
    <div className='w-[40%] relative '>
        {/* question */}
        <div className=" flex flex-col gap-2 relative">
            <div className="flex gap-2 items-center ">
                <Image src="/images/Identicon.svg" alt="user" width={40} height={40} />
                    <p className="text-[14px] font-bold leading-[20px] tracking-[0.1px]">
                    0xA77D...98b6
                    </p>
                <p className="text-[12px] font-normal leading-[20px] tracking-[0.17px] text-[#A1A3A7]"> 3 months ago</p>
            </div>
            <div className="relative">
                <p className="text-[16px] font-bold tracking-[0.15px] text-[#FFF] blur">
                Up until now, much of the NFT space has concerned itself primarily with art, pictures, jpegs and galleries. Orbs are different. Orbs are usable 1-of-1 NFTs that belong in inventories, not in galleries. They are for usage, not display. Conceptually, an Orb is a precious item that belongs in your magic item bag. Technically, the Orb is a modified ERC-721 on Ethereum that manages ownership functions through auctions and fractional ownership.
                </p>
                <div className="w-[60%] absolute top-4 left-[100px] px-[20px] py-6  rounded-2xl border-[1px] " style={{background: 'linear-gradient(111deg, rgba(0, 0, 0, 0.80) -1.65%, rgba(0, 0, 0, 0.80) 100%)'}}>
                <p className="text-[14px] font-bold tracking-[0.1px] text-center">
                This is a private invocation,only the Orb Keepers can read it.Buy a fraction of the Orb to read it yourself.
                </p>

                </div>
            </div>
        </div>
        {/* response */}

            <div className="mt-[34px] flex flex-col relative gap-2">
            <div className="flex gap-2 items-center relative">
                    <p className="text-[14px] font-bold leading-[20px] tracking-[0.1px]">
                    0xA77D...98b6 Response
                    </p>
                <p className="text-[12px] font-normal leading-[20px] tracking-[0.17px] text-[#A1A3A7]"> 3 months ago</p>
            </div>
            <div className="relative">
                <p className="text-[16px] font-bold tracking-[0.15px] text-[#FFF] blur">
                Up until now, much of the NFT space has concerned itself primarily with art, pictures, jpegs and galleries. Orbs are different. Orbs are usable 1-of-1 NFTs that belong in inventories, not in galleries. They are for usage, not display. Conceptually, an Orb is a precious item that belongs in your magic item bag. Technically, the Orb is a modified ERC-721 on Ethereum that manages ownership functions through auctions and fractional ownership.
                </p>
                <div className="w-[60%] absolute top-4 left-[100px] px-[20px] py-6  rounded-2xl border-[1px] " style={{background: 'linear-gradient(111deg, rgba(0, 0, 0, 0.80) -1.65%, rgba(0, 0, 0, 0.80) 100%)'}}>
                <p className="text-[14px] font-bold tracking-[0.1px] text-center">
                This is a private response,only the Orb Keepers can read it.Buy a fraction of the Orb to read it yourself.
                </p>

                </div>
            </div>
            </div>
    </div>
  )
}


