"use client";
import React, { useEffect, useState } from "react";
import SingleCreator from "./SingleCreator";
import { CheckpointConfig, starknet } from "@snapshot-labs/checkpoint";

import orbPond from "@/constant/orbPond.json";
import { getAddress } from "@ethersproject/address";
import { orbPondCA, ProviderUrl } from "@/constant/contract";
import { Contract, hash, num, RpcProvider } from "starknet";
import { useQuery } from "@tanstack/react-query";




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


  const { isPending, isLoading, isError, data:orbAddresses, error } = useQuery({
    queryKey: ['FetchAllAdresses'],
    queryFn: async () => {
      const data = await fetchData()
      return data
    },
  })

  const safeOrbAddresses = Array.isArray(orbAddresses) ? orbAddresses : [];



  // useEffect(() => {
  //   fetchData(); 
    
  // },[]);

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
          <p className="text-[white]">Loading...</p> 
          :
        <div className="flex gap-9 lgDesktop:gap-6 smDesktop:gap-3 smDesk:gap-6 tabletAir:gap-6 flex-wrap mobile:flex-col mobile:justify-center mobile:items-center">
          {
            safeOrbAddresses.length > 0 &&
            <>
          {safeOrbAddresses?.map((data:string, index:number) => 
        
          {            
          return(
            
            <div key={index} className="" >

              <SingleCreator
              address={data}
              />
            </div>
          )})}
            </>
          }
        </div>
        }
      </div>
    </section>
  );
}
