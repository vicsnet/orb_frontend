// import { useAppSelector } from '@/redux/store'
import { useOrbDetailsStore } from '@/zustand/Wallet';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { num, RpcProvider, hash, Uint256, uint256 } from 'starknet';

type OrbHeroProps = {
    setCooldownDays: React.Dispatch<React.SetStateAction<number>>

};

export default function AboutOrb({ setCooldownDays }: OrbHeroProps) {
    const { name, address } = useOrbDetailsStore();
    // const orbDetail = useAppSelector((state) => state?.OrbDetailsReducer?.OrbAccountDetails)
    // const contract = useAppSelector((state) => state?.OrbDetailsReducer?.address);

    const [cooldown, setCooldown] = useState<number>(0)


    const getCoolDown = async () => {
        const myFrontendProviderUrl =
            "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";
        const provider = new RpcProvider({ nodeUrl: `${myFrontendProviderUrl}` });

        const lastBlock = await provider.getBlock('latest');
        const keyFilter = [[num.toHex(hash.starknetKeccak('CooldownUpdate')), '0x8']];
        const addr = address as string;
        const eventsList = await provider.getEvents({
            address: addr,
            //   from_block: { block_number: lastBlock.block_number - 9 },
            to_block: { block_number: lastBlock.block_number },
            keys: keyFilter,
            chunk_size: 10,
        });


        const uint256Value: Uint256 = { low: eventsList.events[0].data[0], high: eventsList.events[0].data[1] };
        const result = uint256.uint256ToBN(uint256Value);
        setCooldown(Number(result));
        setCooldownDays(Number(result))
        // console.log('eventList2',result);

    }

    useEffect(() => {
        getCoolDown()
    }, [])
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
                            <p className="text-[14px] font-bold tracking-[0.46px] underline">{name}</p>
                            <Image src='/images/Group.svg' alt={ name !== null && name !== undefined ? name : 'orb creator'} width={16} height={16} />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">Contract</h2>
                        <p className="">.................................................................................</p>

                        <div className="flex items-center">
                            <p className="text-[14px] font-bold tracking-[0.46px] underline">{`${address?.slice(0, 5)}..${address?.slice(-3)}`}</p>
                            <Image src='/images/Group.svg' alt={name !== undefined  && name !== null ? name : 'orb creator'} width={16} height={16} />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">Cooldown</h2>
                        <p className="">........................................................................................</p>

                        <div className="flex items-center">
                            <p className="text-[14px] font-bold tracking-[0.46px] underline">{cooldown} Days</p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
