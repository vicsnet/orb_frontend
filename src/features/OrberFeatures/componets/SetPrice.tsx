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

type OrbHeroProps = {
  setOpenPrice: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SetPrice({ setOpenPrice }: OrbHeroProps) {
  const {starknetAccount} = useWalletStore();
  const {price} = useOrbprice();
  const {address} = useOrbDetailsStore()
  // const data = useAppSelector(
  //   (state) => state?.OrbDetailsReducer?.OrbAccountDetails
  // );

  // const starknetAccount2 = useAppSelector(
  //   (state) => state?.walletReducer?.starknetAccount
  // );

  // const price = useAppSelector((state) => state?.PriceDataReducer?.price);
  // const price:number = Number(633333333333333336)
  console.log("pricee", price);

  // const contract = useAppSelector((state) => state?.OrbDetailsReducer?.address);
  // const contractAddress = useAppSelector(
  //   (state) => state?.OrbDetailsReducer?.address
  // );
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  //   const [flaggingperiod, setFlaggingPeriod] = useState<number>(0);



  const setCooldown = async () => {
    const myFrontendProviderUrl =
      "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";
    if (tokenPrice !== 0) {
      try {
        if (address !== null) {
          console.log("starknetAccount", starknetAccount);
          const ProviderUrl = starknetAccount?.provider.provider.nodeUrl;
          const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
          const buyerAddress = starknetAccount?.account.address;

          const { abi: testAbi } = await provider.getClassAt(address);
          // const { abi: tokenAbi } = await provider.getClassAt(tokenAddress);

          // const signer = starknetAccount?.account.signer;
          const myWalletAccount = new WalletAccount(
            { nodeUrl: myFrontendProviderUrl },
            starknetAccount as any
          );

          if (address !== null && starknetAccount !== null) {
            const contractCall = new Contract(
              testAbi,
              address,
              myWalletAccount
            );


            contractCall.connect(myWalletAccount);
            const decimal: number = 1000000000000000000;
            const price = tokenPrice * decimal

            const myCall = contractCall.populate("set_price", [

              cairo.uint256(Number(price)),


            ]);

            const res = await myWalletAccount.execute(myCall);
            await provider.waitForTransaction(res.transaction_hash);
            console.log(res.transaction_hash);
          }
        }


      } catch (error) {
        console.error(error);
      }
    }
    else {
      console.error('fprice must be greater than 0')
    }
  };



  return (
    <main className="w-[100%] h-screen overflow-hidden absolute top-0 backdrop-opacity-5">
      <section className="w-[30%] mx-auto bg-[#252525] border-[1px] border-[#F4F4F4] rounded-2xl mt-[200px]">
        <div className=" mx-auto w-[90%] pt-4 pb-4">
          <div className="flex justify-between">
            <h2 className="text-[20px] leading-8 text-[#FFFFFF]">
              Set Full Orb Price
            </h2>
            <span className="">
              <MdClose
                size={24}
                className=""
                onClick={() => setOpenPrice(false)}
              />
            </span>
          </div>
          <div className="w-[90%]  mt-9 mb-9 items-center bg-[#303033] py-[15px] px-[20px] gap-8 rounded-lg mx-auto">

            <div className="flex items-center gap-2">
              <input type="number" placeholder="Set price" className="contrast-more:border-slate-400 bg-transparent border-[1px] border-[#DCDEE0] h-[50px] w-[100%] px-4" onChange={(e) => setTokenPrice(Number(e.target.value))} />
              <p className="">STRk</p>
            </div>


          </div>

          <div className="mt-6 mb-4">
            <div
              className=" font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] w-[90%] mx-auto rounded-md p-2 flex items-center justify-center"
              onClick={setCooldown}
            >
              Set Cooldown Period
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
