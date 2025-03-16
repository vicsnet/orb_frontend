"use client";
import React, { useEffect, useState } from "react";
import SingleCreator from "./SingleCreator";
import { CheckpointConfig, starknet } from "@snapshot-labs/checkpoint";

import orbPond from "@/constant/orbPond.json";
import { getAddress } from "@ethersproject/address";
import { orbPondCA, ProviderUrl } from "@/constant/contract";
import { Contract, hash, num, RpcProvider } from "starknet";
import { useQuery } from "@tanstack/react-query";
import { TbArrowAutofitContent } from "react-icons/tb";




export default function CreatorsContent() {
  // const provider = useAppSelector((state)=> state.walletReducer.starknetAccount?.provider);
  // const [orbAddresses, setOrbAddresses] = useState<null | []>(null);

  const fetchData = async () => {
    try {
      const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });

      const { abi: testAbi } = await provider.getClassAt(orbPondCA);

      if (testAbi === undefined) {
        throw new Error("no abi.");
      }

      const myContractCall = new Contract(testAbi, orbPondCA, provider);

      const orbAddresses = await myContractCall.get_all_orb_addresses();
      // setOrbAddresses(orbAddresses);
      // console.log("All orbAddresses",orbAddresses)
      return orbAddresses


    } catch (error) {
      console.error(error);
    }
  };
  const { refetch, isPending, isLoading, isError, data:orbAddresses, error } = useQuery({
    queryKey: ['FetchAllAdresses'],
    queryFn: async () => {
      const data = await fetchData()
      return data
    },
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Refetch when component mounts
    refetchOnReconnect: true // Refetch when reconnecting
  });

 





  const safeOrbAddresses = Array.isArray(orbAddresses) ? orbAddresses : [];



  useEffect(() => {
    refetch();
  }, []);
  
  return (
    <section className="mt-[96px]">
      <div className="">
        <h2 className="text-[44px] text-[#FFFFFF] font-bold leading-[52.8px] -tracking-[0.5px] text-center smDesktop:text-[40px] smDesktop:leading-[50px] mobile:text-[24px] mobile:leading-[36px] mobile:w-[90%]mobile:mx-auto">
          Creators Around the Globe Trust Us
        </h2>
        <p className="w-[52%] text-center mx-auto text-[16px] font-bold leading-6 tracking-[0.15px] text-[#FFFFFF] mt-1 mobile:w-[90%] mobile:text-[14px] mobile:leading-[20px]">
          From artists to writers, podcasters, and more, countless creators are
          thriving with Orbspace
        </p>
      </div>

      <div className="w-[90%] mx-auto mt-9">
        {
          isLoading ? 
          <div className="flex flex-col justify-center items-center w-[500px] h-[300px] mx-auto mt-2 rounded-lg mobile:w-[300px] mobile:h-[200px] mobile:mt-10" style={{ background: 'linear-gradient(111deg, rgba(255, 255, 255, 0.16) -1.65%, rgba(255, 255, 255, 0.12) 100%)' }}>
            
            <p className="text-[16px] font-bold tracking-[0.15px] text-gray-400 italic mt-4">
              Loading creators...
            </p>
          </div>
          :
        <div className="flex gap-9 lgDesktop:gap-6 smDesktop:gap-3 smDesk:gap-6 tabletAir:gap-6 flex-wrap mobile:flex-col mobile:justify-center mobile:items-center">
          {safeOrbAddresses.length > 0 ? (
            <>
              {safeOrbAddresses?.map((data:string, index:number) => 
              {            
                return(
                  <div key={data} className="">
                    <SingleCreator 
                      address={data}
                    />
                  </div>
                )
              })}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center w-[500px] h-[300px] mx-auto mt-2 rounded-lg mobile:w-[300px] mobile:h-[200px] mobile:mt-10" 
                 style={{ background: 'linear-gradient(111deg, rgba(255, 255, 255, 0.16) -1.65%, rgba(255, 255, 255, 0.12) 100%)' }}>
              <TbArrowAutofitContent className='text-[#99E515] text-[120px] font-bold tracking-[0.15px] mobile:text-[60px]' />
              <p className='text-center text-[20px] font-bold leading-[28px] tracking-[0.15px] text-[#99E515] mt-6 mobile:text-[16px]'>
                No Creators Yet
              </p>
              <p className='text-center text-[16px] leading-[24px] tracking-[0.15px] text-[#A1A3A7] mt-2 w-[80%] mobile:text-[14px]'>
                Be the first creator to join Orbspace!
              </p>
            </div>
          )}
        </div>
        }
      </div>
    </section>
  );
}
