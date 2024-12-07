"use client";
import { ProviderUrl } from "@/constant/contract";
import { getOrbTerms } from "@/redux/features/termsSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Contract, RpcProvider, shortString } from "starknet";

interface data{
    oathSworn: string,
    terms: string,
    privacy: string,
    Exclusivity: string,
    swornDate: string
    honoredUntil: string
}
export default function Oath() {
  const contract = useAppSelector((state) => state.OrbDetailsReducer.address);
  const dispatch = useDispatch<AppDispatch>();
  const [orbHashData, setOrbHashData] = useState<null | data>(null);


//   0x1, 0x6261666b7265696878626d657571327174723279776c72706b7262337a6f6b,0x6a79736c6f773334796e7966786b677962736f73757964366a323565,
// 0x1c,
// 0x67296000,
// 0x0,
// 0x1,
// 0x0


  const longString: string[] = shortString
    .splitLongString(
      "bafkreihxbmeuq2qtr2ywlrpkrb3zokjyslow34ynyfxkgybsosuyd6j25e"
    )
    .map((str) => shortString.encodeShortString(str));

  console.log("byteArr", longString);

  const fetchData = async () => {
    try {
      const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
      if (contract !== null){

          const { abi: testAbi } = await provider.getClassAt(contract);

          if (testAbi === undefined) {
            throw new Error("no abi.");
          }

      const myContractCall = new Contract(testAbi, contract, provider);

      const orbHash = await myContractCall.get_oathHash();
      console.log('hash of orb', orbHash);
      const hash = shortString.decodeShortString(orbHash.data.toString()) + shortString.decodeShortString(orbHash.pending_word.toString());
   
      const response = await axios.get(
        `https://gateway.lighthouse.storage/ipfs/${hash}`,
      );
      
      setOrbHashData(response?.data);
      const data = response?.data?.questions;
      dispatch(getOrbTerms({data}));
      console.log(data);
      
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <section className="w-[90%] mx-auto mt-[72px]">
      <h2 className="text-[44px] font-bold leading-[52.8px] -tracking-[0.5px] ">
        Oath
      </h2>

      <div
        className="w-[40%] border-[1px] px-[1.5%] mt-[20px] rounded-2xl border-[#F4F4F4]"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.12) 100%)",
        }}
      >
        <p className="text-[16px] font-bold  tracking-[0.15px] py-[3%] justify-center flex">
          {orbHashData?.oathSworn}
        </p>
          <p className="text-center  text-[20px] font-bold leading-[26px] tracking-[0.15px] mt-8 text-[#99E515]">Orbs Terms of Service</p> <br/>
        <p className="text-[16px] font-bold  tracking-[0.15px] py-[3%] justify-center">
          {orbHashData?.terms}
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-[40px] w-[40%]">
        <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">
            Privacy
          </h2>
          <p className="">..............</p>

          <div className="flex items-center">
            <p className="text-[14px] font-bold tracking-[0.46px] underline">
             {orbHashData?.privacy}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">
            Exclusivity
          </h2>
          <p className="">......................</p>

          <div className="flex items-center">
            <p className="text-[14px] font-bold tracking-[0.46px] underline">
              {orbHashData?.Exclusivity}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">
            Oath sworn on
          </h2>
          <p className="">
            ...................................................................
          </p>

          <div className="flex items-center">
            <p className="text-[14px] font-bold tracking-[0.46px] underline">
              {orbHashData?.swornDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">
            Oath honoured on
          </h2>
          <p className="">
            .............................................................
          </p>

          <div className="flex items-center">
            <p className="text-[14px] font-bold tracking-[0.46px] underline">
              {orbHashData?.honoredUntil}
            </p>
          </div>
        </div>
        {/* <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">
            Oath Content Hash
          </h2>
          <p className="">
            ...............................................................
          </p>

          <div className="flex items-center">
            <p className="text-[14px] font-bold tracking-[0.46px] underline">
              0x8d6..jh7
            </p>
            <Image
              src="/images/Group.svg"
              alt={"Vincent"}
              width={16}
              height={16}
            />
          </div>
        </div> */}
        {/* <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px]">
            Oath Swearing Transaction
          </h2>
          <p className="">
            .......................................................
          </p>

          <div className="flex items-center">
            <p className="text-[14px] font-bold tracking-[0.46px] underline">
              Signed
            </p>
            <Image
              src="/images/Group.svg"
              alt={"Vincent"}
              width={16}
              height={16}
            />
          </div>
        </div> */}
      </div>
    </section>
  );
}
