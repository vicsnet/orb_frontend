"use client";
import Loading from "@/components/Loading";
import { epochToTime } from "@/constant/constant";
import { ProviderUrl, tokenAddress } from "@/constant/contract";
// import { useAppSelector } from "@/redux/store";
import { useOrbDetailsStore, useWalletStore } from "@/zustand/Wallet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
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

type OrbHeroProps = {
  setOpenCooldown: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CoolDownPeriod({ setOpenCooldown }: OrbHeroProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { starknetAccount } = useWalletStore();
  const { address } = useOrbDetailsStore();

  const [cooldownPeriod, setCooldownPeriod] = useState<number>(0);
  const [flaggingperiod, setFlaggingPeriod] = useState<number>(0);



  const setCooldown = async () => {
    if (!starknetAccount) {
      toast.error('Please connect your wallet');
      setIsLoading(false);
      return;
    }
    if (cooldownPeriod === 0 || flaggingperiod === 0) {
      toast.error('All fields are required');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const myFrontendProviderUrl =
      "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";
    if (flaggingperiod !== 0 && cooldownPeriod !== 0) {
      try {
        if (address !== null) {
          console.log("starknetAccount", starknetAccount);
          const ProviderUrl = starknetAccount?.provider.provider.nodeUrl;
          const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
          const buyerAddress = starknetAccount?.account.address;

          const { abi: testAbi } = await provider.getClassAt(address);

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
            const newCooldownPeriod = Number(cooldownPeriod) * 24 * 60 * 60 ;
            const newFlaggingPeriod = Number(flaggingperiod) * 24 * 60 * 60;
            contractCall.connect(myWalletAccount);

            const myCall = contractCall.populate("set_cool_down", [
              cairo.uint256(newCooldownPeriod),
              cairo.uint256(newFlaggingPeriod),
            ]);

            const res = await myWalletAccount.execute(myCall);
            await provider.waitForTransaction(res.transaction_hash);
            console.log(res.transaction_hash);
            toast.success('Cooldown period set successfully');
            setIsLoading(false);
            setOpenCooldown(false);
          }
        }


      } catch (error) {
        console.error(error);
        toast.error('Cooldown period not set');
        setIsLoading(false);
      }
    }

  };



  return (
    <main className="w-[100%] h-screen absolute top-0 backdrop-blur-sm bg-black/30 z-10 overflow-y-scroll  no-scrollbar">
      <section className="w-[30%] lgDesktop:w-[40%] smDesktop:w-[45%] smDesk:w-[50%] tabletAir:w-[60%] mobile:w-[90%]    mx-auto bg-[#252525] border-[1px] border-[#F4F4F4] rounded-2xl mt-[200px] lgDesktop:mt-[150px] smDesktop:mt-[150px] smDesk:mt-[200px] tabletAir:mt-[200px] mobile:mt-[150px] ">
        <div className=" mx-auto w-[90%] pt-4 pb-4">
          <div className="flex justify-between">
            <h2 className="text-[20px] leading-8 text-[#FFFFFF]">
              Set Cooldown Period
            </h2>
            <span className="">
              <MdClose
                size={24}
                className=""
                onClick={() => setOpenCooldown(false)}
              />
            </span>
          </div>
          <div className="w-[90%]  mt-9 mb-9 items-center bg-[#303033] py-[15px] px-[20px] gap-8 rounded-lg mx-auto">

            <div className="">
              <input type="number" placeholder="Cooldown Period in Days" className="w-[100%] bg-transparent border border-[#DCDEE0] rounded-lg p-3 text-[#FFFFFF] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#99E515] focus:ring-1 focus:ring-[#99E515] transition-colors" onChange={(e) => setCooldownPeriod(Number(e.target.value))} />
            </div>

            <div className="mt-4">
              <input type="number" placeholder="Flagging Period in Days" className="w-[100%] bg-transparent border border-[#DCDEE0] rounded-lg p-3 text-[#FFFFFF] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#99E515] focus:ring-1 focus:ring-[#99E515] transition-colors" onChange={(e) => setFlaggingPeriod(Number(e.target.value))} />
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
      {isLoading && <Loading />}
    </main>
  );
}
