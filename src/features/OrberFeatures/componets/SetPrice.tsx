"use client";
import { epochToTime } from "@/constant/constant";
import { ProviderUrl, tokenAddress } from "@/constant/contract";
// import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import {
  Contract,
  RpcProvider,
  Provider,
  Account,
  WalletAccount,
  cairo,
} from "starknet";
// import { connect } from "@argent/get-starknet"
// import { WalletAccount } from 'starknet';
import {useWalletStore, useOrbprice, useOrbDetailsStore} from "@/zustand/Wallet"
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

type OrbHeroProps = {
  setOpenPrice: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SetPrice({ tokenPrice, setTokenPrice }: { tokenPrice: number, setTokenPrice: React.Dispatch<React.SetStateAction<number>> }) {
 



  return (
    
    <main className="transition-all duration-500 ease-in-out transform hover:scale-[1.01]">
      <section className="animate-fadeIn">
        <div className="mx-auto w-[60%] lgDesktop:w-[80%] mobile:w-[100%] pt-4 pb-4 lgDesktop:pb-2 mobile:pt-4  noto-sans">
          <div className="mt-44 mb-9 lgDesktop:mb-2 lgDesktop:mt-44 smDesktop:mt-24 smDesk:mt-80 tabletAir:mt-72 tablet:mt-52 mobile:mt-24 items-center py-[15px] px-[20px] gap-8 rounded-lg mx-auto animate-slideIn">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <p className="text-[16px] font-semibold text-[#FFFFFF] capitalize mb-2 animate-fadeIn">Orb Price <span className='text-[#E62E2E]'>*</span></p>
              
              <div className="flex items-center gap-2 bg-[#303033] rounded-lg border border-[#3E414C] hover:border-[#99E515] transition-all duration-300 hover:shadow-lg hover:shadow-[#99E515]/20">
                <input 
                  type="number"
                  required
                  placeholder="Set price" 
                  className="bg-transparent rounded p-3 text-[#FFFFFF] placeholder:text-[#9CA3AF] focus:outline-none  h-[50px] w-[100%] px-4 " 
                  value={tokenPrice || ''}
                  onChange={(e) => setTokenPrice(Number(e.target.value))} 
                />
                <p className="p-3 animate-fadeIn">STRk</p>
              </div>
              <p className="text-[14px] mt-2 leading-[20px] tracking-[-0.25px] text-[#9EA2B3] font-normal animate-fadeIn">Valued in STRk</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
