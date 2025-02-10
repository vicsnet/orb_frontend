"use client";
import React, { useEffect, useState } from "react";
import SingleCreator from "./SingleCreator";
import { CheckpointConfig, starknet } from "@snapshot-labs/checkpoint";

import orbPond from "@/constant/orbPond.json";
import { getAddress } from "@ethersproject/address";
import { orbPondCA, ProviderUrl } from "@/constant/contract";
import { Contract, hash, num, RpcProvider } from "starknet";
// import { useAppSelector } from "@/redux/store";
// import {
//   ApolloClient,
//   ApolloProvider,
//   InMemoryCache,
//   HttpLink,
//   gql,
//   useQuery,
// } from "@apollo/client";



export default function CreatorsContent() {
  // const provider = useAppSelector((state)=> state.walletReducer.starknetAccount?.provider);
  const [orbAddresses, setOrbAddresses] = useState<null | []>(null);

  const fetchData = async () => {
    try {
      const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });

      const { abi: testAbi } = await provider.getClassAt(orbPondCA);

      if (testAbi === undefined) {
        throw new Error("no abi.");
      }

      const myContractCall = new Contract(testAbi, orbPondCA, provider);

      const orbAddresses = await myContractCall.get_all_orb_addresses();
      setOrbAddresses(orbAddresses);
      // console.log("All orbAddresses",orbAddresses)


    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(); 
    
  },[]);

  return (
    <section className="mt-[96px]">
      <div className="">
        <h2 className="text-[44px] text-[#FFFFFF] font-bold leading-[52.8px] -tracking-[0.5px] text-center">
          Creators Around the Globe Trust Us
        </h2>
        <p className="w-[52%] text-center mx-auto text-[16px] font-bold leading-6 tracking-[0.15px] text-[#FFFFFF] mt-1">
          From artists to writers, podcasters, and more, countless creators are
          thriving with Orbspace
        </p>
      </div>

      <div className="w-[90%] mx-auto mt-9">
        <div className="flex gap-4 flex-wrap">
          {
            orbAddresses !== null &&
            <>
          {orbAddresses?.map((data, index) => 
        
          {
            // console.log('orb data', data);
            
          return(
            
            <div key={index} className="" >

              <SingleCreator
              address={data}
                // image={props.image}
                // orber={props.orber}
                // creator={props.creator}
              />
            </div>
          )})}
            </>
          }
        </div>
      </div>
    </section>
  );
}
