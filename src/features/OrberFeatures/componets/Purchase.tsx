"use client";
import { epochToTime } from "@/constant/constant";
import { ProviderUrl, tokenAddress } from "@/constant/contract";
// import { useAppSelector } from "@/redux/store";
import { connect, StarknetWindowObject } from "get-starknet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useWalletStore, useOrbprice, useOrbDetailsStore } from "@/zustand/Wallet"

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
import Loading from "@/components/Loading";
// import { StarknetWalletProvider } from "get-starknet"
// import { WalletAccount } from 'starknet';


type OrbHeroProps = {
  setOpenPurchase: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Purchase({ setOpenPurchase }: OrbHeroProps) {
  const { starknetAccount } = useWalletStore()
  const { price } = useOrbprice()
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  console.log("pricee", price);

  

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

        // setInvocPeriod(InvocationTime.toString());

        const honoredUntilTime = await myContractCall.get_honored_until();
        const time = epochToTime(honoredUntilTime);
        // setHonoredTime(time);

        return ({ invocPeriod: InvocationTime.toString(), honoredTime: time })
      }
    } catch (error) {
      console.error(error);
    }
  };

  const purchaseFraction = async () => {
    setIsLoading(true);
    const myFrontendProviderUrl =
      "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";
    try {
      if (address !== null) {
        console.log("starknetAccount", starknetAccount);
        // const ProviderUrl = starknetAccount?.provider.provider.nodeUrl;
        const provider = new RpcProvider({ nodeUrl: `${myFrontendProviderUrl}` });
        const buyerAddress = starknetAccount?.address;
        // console.log();

        const { abi: testAbi } = await provider.getClassAt(address);
        const { abi: tokenAbi } = await provider.getClassAt(tokenAddress);

        const selectedWalletSWO = await connect({ modalMode: 'alwaysAsk', modalTheme: 'light' });
        // const signer = starknetAccount?.account.signer;
        if (starknetAccount !== null) {

          // const myWalletAccount = new WalletAccount(
          //   { nodeUrl: myFrontendProviderUrl },
          //   starknetAccount as any
          // );

          // console.log(myWalletAccount, `myWalletAccount`);

          if (address !== null && starknetAccount !== null) {
            const contractCall = new Contract(
              testAbi,
              address,
              starknetAccount
            );
            const tokencontractCall = new Contract(
              tokenAbi,
              tokenAddress,
              starknetAccount
            );
            tokencontractCall.connect(starknetAccount);
            const myTokenCall = tokencontractCall.populate("approve", [
              address,
              cairo.uint256(Number(price)),
            ]);

            const resToken = await starknetAccount.execute(myTokenCall);
            await provider.waitForTransaction(resToken.transaction_hash);
            console.log("resToken", resToken.transaction_hash);
if(!buyerAddress){
  toast.error('Please connect your wallet');
  setIsLoading(false);
  return;
}
            if (resToken) {
              contractCall.connect(starknetAccount);

              const myCall = contractCall.populate("buy_orb", [
                buyerAddress,
                cairo.uint256(Number(price)),
                tokenAddress,
                cairo.uint256(Number(1)),
              ]);

              const res = await starknetAccount.execute(myCall);
              await provider.waitForTransaction(res.transaction_hash);
              console.log(res.transaction_hash);
              toast.success('Purchase successful');
              setIsLoading(false);
              setOpenPurchase(false);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Purchase failed');
      setIsLoading(false);
    }
  };

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ['FetchPurchaseData'],
    queryFn: async () => {
      const data = await fetchData()
      return data
    },
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Refetch when component mounts
    refetchOnReconnect: true // Refetch when reconnecting
  })

  useEffect(() => {
    refetch()
  }, [])

  console.log('FetchPurchaseData', data);

  // const mutation = useMutation({
  //   mutationFn: (Purchase) => {
  //     const data = purchaseFraction()
  //     return data;
  //   },
  // });

  // if (mutation.isSuccess) {
  //   // setOpenRespond(false)
  //   toast.success(`tx:hash:${mutation.data}`)
  // }
  // if (mutation.error) {
  //   toast.error(`${mutation.error}`)
  // }

  return (
    <main className="w-[100%] h-screen absolute top-0 backdrop-blur-sm bg-black/30 z-10 overflow-y-scroll  no-scrollbar">
      <section className="w-[30%] lgDesktop:w-[40%] smDesktop:w-[50%] smDesk:w-[50%] tabletAir:w-[60%] mobile:w-[90%]  mx-auto bg-[#252525] border-[1px] border-[#F4F4F4] rounded-2xl mt-[200px] lgDesktop:mt-[150px] smDesktop:mt-[100px] smDesk:mt-[50px] tabletAir:mt-[140px] mobile:mt-[50px]">
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
                <p className="text-[16px] font-bold leading-5 tracking-[0.1px] text-[#FFFFFF] mobile:text-[14px]">
                  {name}&apos;s Orb
                </p>
                <p className="text-[14px] ">
                  Created by {creator} @{x_account}
                </p>
              </div>
            </div>
            <div className="border-l-[1px] border-l-[#040404] pl-4">
              <p className="font-normal text-[14px] leading-5 text-[#FFFFFF] ">
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
                {data?.honoredTime}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[14px] leading-5 text-[#DDDEE0] font-normal tracking-[0.17px]">
                Invocation Period
              </p>
              <p className="font-bold text-[14px] tracking-[0.1px] leading-5 text-[#FFFFFF]">
                {data?.invocPeriod} {data?.invocPeriod >= 2 ? "day's" : "day"}
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
              onClick={() => purchaseFraction()}
            >
              Purchase
             
            </div>
          </div>
        </div>
      </section>
      {isLoading && <Loading   />}
    </main>
  );
}
