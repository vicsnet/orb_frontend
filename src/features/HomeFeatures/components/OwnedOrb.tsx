"use client";
import { epochToTime } from "@/constant/constant";
import { ProviderUrl, tokenAddress } from "@/constant/contract";
// import { useAppSelector } from "@/redux/store";
import { connect, StarknetWindowObject } from "get-starknet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useWalletStore, useOrbprice, useOrbDetailsStore, useOpenOwnedOrb } from "@/zustand/Wallet"
import { orbPondCA } from "@/constant/contract";

import {
    Contract,
    RpcProvider,
    Provider,
    Account,
    WalletAccount,
    cairo,
    // StarknetWalletProvider

} from "starknet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

import SingleCreator from "./SingleCreator";
import { TbArrowAutofitContent } from "react-icons/tb";

type OrbHeroProps = {
    setOpenCreateOrb: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function OwnedOrb() {
    const router = useRouter();

    const { openOwnedOrb, setOpenOwnedOrb } = useOpenOwnedOrb();

    // const [name, setName] = useState<string>('');
    // const [symbol, setSymbol] = useState<string>('');
    // const [totalSupply, setTotalSupply] = useState<number>(0);
    // // const [tokenURI, setTokenURI] = useState<string>('');
    // const [description, setDescription] = useState<string>('');
    // const [xAccount, setXAccount] = useState<string>('');
    // const [farcaster, setFarcaster] = useState<string>('');
    // const [creatorName, setCreatorName] = useState<string>('');
    // const [file, setFile] = useState<File | null>(null);
    // const [isLoading, setIsLoading] = useState<boolean>(false);

    const { starknetAccount } = useWalletStore();


    const { setOrbDetailsData } = useOrbDetailsStore()

 
    const fetchData = async () => {
        try {
          const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
    
          const { abi: testAbi } = await provider.getClassAt(orbPondCA);
    
          if (testAbi === undefined) {
            throw new Error("no abi.");
          }
    
          const myContractCall = new Contract(testAbi, orbPondCA, provider);
    
          const orbAddresses = await myContractCall.get_all_orb_addresses();
 
          const orbAddressesWithBalance: { address: string; balance: number }[] = [];
          
          for (const address of orbAddresses) {
            try {
                
                const bigintAddress = BigInt(address);
                let hexAddress = bigintAddress.toString(16);
                hexAddress = hexAddress.padStart(64, '0');
                const addressOrb = '0x' + hexAddress;
              const { abi: orbAbi } = await provider.getClassAt(addressOrb);
              const orbContract = new Contract(orbAbi, addressOrb, provider);
              
              // Get balance for the current user's address
              const balance = await orbContract.balance_of(starknetAccount?.address);
              
              // Convert balance to number and check if greater than 0
              const balanceNum = Number(balance);
              if (balanceNum > 0) {
                orbAddressesWithBalance.push({
                  address: addressOrb,
                  balance: balanceNum
                });
              }
            } catch (error) {
              console.error(`Error checking balance for address ${address}:`, error);
            }
          }

          console.log("Orbs with balance:", orbAddressesWithBalance);

          return orbAddressesWithBalance;
      
    
        } catch (error) {
          console.error(error);
        }
      };
      const { refetch, isPending, isLoading, isError, data, error } = useQuery({
        queryKey: ['FetchOrbsOwned'],
        queryFn: async () => {
          const data = await fetchData()
          return data
        },
        refetchInterval: 5000, // Refetch every 5 seconds
        refetchOnWindowFocus: true, // Refetch when window regains focus
        refetchOnMount: true, // Refetch when component mounts
        refetchOnReconnect: true // Refetch when reconnecting
      });


    return (
        <main className={`w-[100%] h-screen  top-0 left-0 backdrop-opacity-5  bg-[#000000] ${openOwnedOrb === true ? 'fixed' : 'hidden'}`}>

            <div className="w-[100%] h-screen">
                <Navbar title="Orb Space" />

                <section className="w-[50%] lgDesktop:w-[60%] smDesktop:w-[65%] smDesk:w-[70%] tabletAir:w-[80%] mobile:w-[90%] mx-auto bg-[#252525] border-[1px] border-[#F4F4F4] rounded-2xl mt-[100px] overflow-y-hidden  no-scrollbar h-[62vh] ">
                    <div className=" mx-auto w-[90%] pt-4 pb-4">
                        <div className="flex justify-between items-center pb-4">
                            <h2 className="text-[24px] leading-[133%] font-bold text-[#FFFFFF] whitespace-nowrap">
                            Orbs Owned
                            </h2>
                            <span className="">
                                <MdClose
                                    size={24}
                                    className="text-[#FFFFFF] cursor-pointer"
                                    onClick={() => setOpenOwnedOrb(false)}
                                />
                            </span>
                        </div>
                        <section className="h-[55vh] overflow-y-scroll no-scrollbar noto-sans">
                          
                          
                            {data && data?.length > 0 ? (
                              data?.map((orb) => (
                                <SingleCreator key={orb.address} address={orb.address} />
                              ))
                            ) : (
                              <div className="mt-[100px] smDesktop:mt-[50px] smDesk:mt-[100px]">

                              <div className="flex flex-col justify-center items-center w-[50%] h-[200px] text-center mx-auto mobile:w-[70%]" 
                                   style={{ background: 'linear-gradient(111deg, rgba(255, 255, 255, 0.16) -1.65%, rgba(255, 255, 255, 0.12) 100%)' }}>
                                <TbArrowAutofitContent className='text-[#99E515] text-[60px] font-bold tracking-[0.15px]' />
                                <p className='text-center text-[20px] font-bold leading-[28px] tracking-[0.15px] text-[#99E515] mt-6'>
                                  No Orbs Owned Yet
                                </p>
                                <p className='text-center text-[16px] leading-[24px] tracking-[0.15px] text-[#A1A3A7] mt-2 w-[80%]'>
                                  Start Purchasing orbs to see them here!
                                </p>
                              </div>
                              </div>
                            )}
                          
                     

                        </section>
                    </div>
                </section>
            </div>
            {/* loading */}
            {isLoading && <Loading />}


        </main>
    );
}
