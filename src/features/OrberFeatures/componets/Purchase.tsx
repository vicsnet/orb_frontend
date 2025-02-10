"use client";
import { epochToTime } from "@/constant/constant";
import { ProviderUrl, tokenAddress } from "@/constant/contract";
// import { useAppSelector } from "@/redux/store";
import { connect, StarknetWindowObject } from "get-starknet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import {useWalletStore, useOrbprice, useOrbDetailsStore} from "@/zustand/Wallet"

import {
  Contract,
  RpcProvider,
  Provider,
  Account,
  WalletAccount,
  cairo,
  // StarknetWalletProvider
  
} from "starknet";
// import { StarknetWalletProvider } from "get-starknet"
// import { WalletAccount } from 'starknet';


type OrbHeroProps = {
  setOpenPurchase: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Purchase({ setOpenPurchase }: OrbHeroProps) {
  const {starknetAccount} = useWalletStore()
  const {price} = useOrbprice()

  // const data = useAppSelector(
  //   (state) => state?.OrbDetailsReducer?.OrbAccountDetails
  // );

        const { name,
            description,
            image,
            creator,
            x_account,
            farcaster,
            address } = useOrbDetailsStore();
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
  const [invocPeriod, setInvocPeriod] = useState<any>(0);
  const [honoredTime, setHonoredTime] = useState<any>(0);

  const fetchData = async () => {
    try {
      const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
      if (address !== null) {
        const { abi: testAbi } = await provider.getClassAt(address);

        if (testAbi === undefined) {
          throw new Error("no abi.");
        }

        const myContractCall = new Contract(testAbi, address, provider);

        const InvocationTime = await myContractCall.get_invocation_period();
        console.log("InvocationTime", InvocationTime);

        setInvocPeriod(InvocationTime.toString());

        const honoredUntilTime = await myContractCall.get_honored_until();
        const time = epochToTime(honoredUntilTime);
        setHonoredTime(time);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const purchaseFraction = async () => {
    const myFrontendProviderUrl =
      "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";
    try {
      if (address !== null) {
        console.log("starknetAccount", starknetAccount);
        const ProviderUrl = starknetAccount?.provider.provider.nodeUrl;
        const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
        const buyerAddress = starknetAccount?.account.address;
        // console.log();
        
        const { abi: testAbi } = await provider.getClassAt(address);
        const { abi: tokenAbi } = await provider.getClassAt(tokenAddress);

        const selectedWalletSWO = await connect({ modalMode: 'alwaysAsk', modalTheme: 'light' });
        // const signer = starknetAccount?.account.signer;
        if (starknetAccount !== null){

          const myWalletAccount = new WalletAccount(
            { nodeUrl: myFrontendProviderUrl },
            starknetAccount as any
          );
  
          console.log(myWalletAccount, `myWalletAccount`);
          
          if (address !== null && starknetAccount !== null) {
            const contractCall = new Contract(
              testAbi,
              address,
              myWalletAccount
            );
            const tokencontractCall = new Contract(
              tokenAbi,
              tokenAddress,
              myWalletAccount
            );
            tokencontractCall.connect(myWalletAccount);
            const myTokenCall = tokencontractCall.populate("approve", [
              address,
              cairo.uint256(Number(price)),
            ]);
  
            const resToken = await myWalletAccount.execute(myTokenCall);
            await provider.waitForTransaction(resToken.transaction_hash);
            console.log("resToken", resToken.transaction_hash);
  
            if (resToken) {
              contractCall.connect(myWalletAccount);
  
              const myCall = contractCall.populate("buy_orb", [
                buyerAddress,
                cairo.uint256(Number(price)),
                tokenAddress,
                cairo.uint256(Number(1)),
              ]);
  
              const res = await myWalletAccount.execute(myCall);
              await provider.waitForTransaction(res.transaction_hash);
              console.log(res.transaction_hash);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <main className="w-[100%] h-screen overflow-hidden absolute top-0 backdrop-opacity-5">
      <section className="w-[30%] mx-auto bg-[#252525] border-[1px] border-[#F4F4F4] rounded-2xl mt-[200px]">
        <div className=" mx-auto w-[90%] pt-4 pb-4">
          <div className="flex justify-between">
            <h2 className="text-[20px] leading-8 text-[#FFFFFF]">
              Own a fraction
            </h2>
            <span className="">
              <MdClose
                size={24}
                className=""
                onClick={() => setOpenPurchase(false)}
              />
            </span>
          </div>
          <div className="flex justify-between mt-9 mb-9 items-center bg-[#303033] py-[15px] px-[20px] rounded-lg">
            <div className="flex gap-4 items-center">
              <Image
                src={image ? image : "/images/hero.png"}
                alt=""
                width={80}
                height={80}
              />
              <div className="">
                <p className="text-[16px] font-bold leading-5 tracking-[0.1px] text-[#FFFFFF]">
                  {name}&apos;s Orb
                </p>
                <p className="text-[14px]">
                  Created by {creator} @{x_account}
                </p>
              </div>
            </div>
            <div className="border-l-[1px] border-l-[#040404] pl-4">
              <p className="font-normal text-[14px] leading-5 text-[#FFFFFF]">
                Orb Price
              </p>
              <p className="font-bold text-[#FFFFFF]">
                {" "}
                {price ? parseFloat(price) / 1000000000000000000 : "0"} strk
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-[14px] leading-5 text-[#DDDEE0] font-normal tracking-[0.17px]">
                Term Length
              </p>
              <p className="font-bold text-[14px] tracking-[0.1px] leading-5 text-[#FFFFFF]">
                {honoredTime}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[14px] leading-5 text-[#DDDEE0] font-normal tracking-[0.17px]">
                Invocation Period
              </p>
              <p className="font-bold text-[14px] tracking-[0.1px] leading-5 text-[#FFFFFF]">
                {invocPeriod} {invocPeriod >= 2 ? "day's" : "day"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[14px] leading-5 text-[#DDDEE0] font-normal tracking-[0.17px]">
                Orb Use
              </p>
              <p className="font-bold text-[14px] tracking-[0.1px] leading-5 text-[#FFFFFF]">
                Invocation
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[14px] leading-5 text-[#DDDEE0] font-normal tracking-[0.17px]">
                Transaction Type
              </p>
              <p className="font-bold text-[14px] tracking-[0.1px] leading-5 text-[#FFFFFF]">
                Purchase
              </p>
            </div>
          </div>
          <div className="mt-6 mb-4">
            <div
              className=" font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2 flex items-center justify-center"
              onClick={purchaseFraction}
            >
              Purchase
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
