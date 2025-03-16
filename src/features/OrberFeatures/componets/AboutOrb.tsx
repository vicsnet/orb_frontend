// import { useAppSelector } from '@/redux/store'
import { useOrbDetailsStore } from '@/zustand/Wallet';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { num, RpcProvider, hash, Uint256, uint256 } from 'starknet';

type OrbHeroProps = {
    setCooldownDays: React.Dispatch<React.SetStateAction<number>>

};

export default function AboutOrb({ setCooldownDays }: OrbHeroProps) {
    const { name, address, description  } = useOrbDetailsStore();
    // const orbDetail = useAppSelector((state) => state?.OrbDetailsReducer?.OrbAccountDetails)
    // const contract = useAppSelector((state) => state?.OrbDetailsReducer?.address);

    // const [cooldown, setCooldown] = useState<number>(0)


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
        // setCooldown(Number(result));
        setCooldownDays(Number(result))
        
        return ({cooldown:Number(result)})

    }

    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['FetchAllAdresses'],
        queryFn: async () => {
          const data = await getCoolDown()
          return data
        },
        refetchInterval: 5000, // Refetch every 5 seconds
        refetchOnWindowFocus: true, // Refetch when window regains focus
        refetchOnMount: true, // Refetch when component mounts
        refetchOnReconnect: true // Refetch when reconnecting
      })
// console.log('dataCooldown',data?.cooldown);


    useEffect(() => {
        // getCoolDown()
        refetch()
    }, [])
    
    return (
        <section className='w-[90%] mx-auto'>
            <div className="w-[40%] lgDesktop:w-[50%] smDesktop:w-[65%] tabletAir:w-[80%] mobile:w-[100%]">
                <h2 className="text-[44px] font-bold leading-[52.8px] -tracking-[0.50px] text-[#FFFFFF] mt-[140px] tabletAir:mt-[100px] mobile:mt-[70px] mobile:text-[24px]">
                    About the Orb
                </h2>
                {!description && (
                    <p className="text-[16px] font-bold leading-[22px] tracking-[0.15px] mobile:text-[14px] mobile:leading-[20px] mt-[20px] text-justify text-gray-400 italic">
                        No description available
                    </p>
                )}
                <p className="text-[16px] font-bold leading-[22px] tracking-[0.15px] mobile:text-[14px] mobile:leading-[20px] mt-[20px] text-justify">
                    {description}
                </p>

                <div className="flex flex-col gap-4 mt-[40px]">
                    <div className="flex items-center gap-4">
                        <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px] mobile:text-[14px] mobile:leading-[20px]">Created by</h2>
                        <p className="mobile:hidden">..................................................................................</p>
                        <p className="hidden mobile:block">.............................</p>

                        <div className="flex items-center">
                            <p className="text-[14px] font-bold tracking-[0.46px] underline">{name}</p>
                            <Image src='/images/Group.svg' alt={ name !== null && name !== undefined ? name : 'orb creator'} width={16} height={16} />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px] mobile:text-[14px] mobile:leading-[20px]">Contract</h2>
                        <p className="mobile:hidden">.................................................................................</p>
                        <p className="hidden mobile:block">....................................</p>

                        <div className="flex items-center">
                            <p className="text-[14px] font-bold tracking-[0.46px] underline">{`${address?.slice(0, 5)}..${address?.slice(-3)}`}</p>
                            <Image src='/images/Group.svg' alt={name !== undefined  && name !== null ? name : 'orb creator'} width={16} height={16} />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px] mobile:text-[14px] mobile:leading-[20px]">Cooldown</h2>
                        <p className="mobile:hidden">........................................................................................</p>
                        <p className="hidden mobile:block">.............................................</p>

                        <div className="flex items-center">
                            <p className="text-[14px] font-bold tracking-[0.46px] underline">{data?.cooldown} Days</p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
