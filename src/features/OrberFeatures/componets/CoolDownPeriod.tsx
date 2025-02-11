"use client";
import { epochToTime } from "@/constant/constant";
import { ProviderUrl, tokenAddress } from "@/constant/contract";
// import { useAppSelector } from "@/redux/store";
import { useOrbDetailsStore, useWalletStore } from "@/zustand/Wallet";
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

type OrbHeroProps = {
  setOpenCooldown: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CoolDownPeriod({ setOpenCooldown }: OrbHeroProps) {
  // const data = useAppSelector(
  //   (state) => state?.OrbDetailsReducer?.OrbAccountDetails
  // );

  const { starknetAccount } = useWalletStore();
  const { address } = useOrbDetailsStore();

  // const starknetAccount = useAppSelector(
  //   (state) => state?.walletReducer?.starknetAccount
  // );

  // const price = useAppSelector((state) => state?.PriceDataReducer?.price);
  // const price:number = Number(633333333333333336)
  // console.log("pricee", price);

  // const contract = useAppSelector((state) => state?.OrbDetailsReducer?.address);
  // const contractAddress = useAppSelector(
  //   (state) => state?.OrbDetailsReducer?.address
  // );
  const [cooldownPeriod, setCooldownPeriod] = useState<number>(0);
  const [flaggingperiod, setFlaggingPeriod] = useState<number>(0);



  const setCooldown = async () => {
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
            //   const tokencontractCall = new Contract(
            //     tokenAbi,
            //     tokenAddress,
            //     myWalletAccount
            //   );
            //   tokencontractCall.connect(myWalletAccount);
            //   const myTokenCall = tokencontractCall.populate("approve", [
            //     contractAddress,
            //     cairo.uint256(Number(price)),
            //   ]);

            //   const resToken = await myWalletAccount.execute(myTokenCall);
            //   await provider.waitForTransaction(resToken.transaction_hash);
            //   console.log("resToken", resToken.transaction_hash);

            contractCall.connect(myWalletAccount);

            const myCall = contractCall.populate("set_cool_down", [

              cairo.uint256(Number(cooldownPeriod)),

              cairo.uint256(Number(flaggingperiod)),
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
      console.error('flagging period and cooldownPeriod can not be 0')
    }
  };

  useEffect(() => {
    // fetchData();
  }, []);

  return (
    <main className="w-[100%] h-screen overflow-hidden absolute top-0 backdrop-opacity-5">
      <section className="w-[30%] mx-auto bg-[#252525] border-[1px] border-[#F4F4F4] rounded-2xl mt-[200px]">
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
              <input type="number" placeholder="Cooldown Period" className="contrast-more:border-slate-400 bg-transparent border-[1px] border-[#DCDEE0] h-[50px] w-[100%] px-4" onChange={(e) => setCooldownPeriod(Number(e.target.value))} />
            </div>

            <div className="mt-4">
              <input type="number" placeholder="Flagging Period" className="w-[100%] contrast-more:border-slate-400 bg-transparent border-[1px] border-[#DCDEE0] h-[50px] px-4" onChange={(e) => setFlaggingPeriod(Number(e.target.value))} />
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
