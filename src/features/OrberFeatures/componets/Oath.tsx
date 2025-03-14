"use client";
import { ProviderUrl } from "@/constant/contract";
// import { getOrbTerms } from "@/redux/features/termsSlice";
// import { AppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Contract, RpcProvider, shortString } from "starknet";
import { PinataSDK } from "pinata-web3";
import { useOrbDetailsStore, useOrbtermsStore } from "@/zustand/Wallet";
import { useQuery } from "@tanstack/react-query";

interface data {
  oathSworn: string,
  // terms: string,
  privacy: string,
  Exclusivity: string,
  swornDate: string
  // honoredUntil: string
}

interface OrbData {
  oathSworn: string;
  privacy: string;
  Exclusivity: string;
  swornDate: string;
  questions: Question[];
}

interface Question {
  title: string;
  content: string;
}

export default function Oath() {

  // const [honoredUntil, setHonoredUntil] = useState<string>('')
  const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYTBjNjg3MS04NGIxLTRlMDgtODg2ZC1iYmU5ODY5ZDQ4OWMiLCJlbWFpbCI6InZpbmNlLmFkZXNhbm1pMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWQ2MGI4MzZiNGI3M2Q3OGU5NmYiLCJzY29wZWRLZXlTZWNyZXQiOiI2N2FjNWNmZTBhODIzYWEyYzA1ZDA5MDNhMDRiZWQ5YjM1MzllMDVkODkxZWMwNTRiYjM2OTBkMDUyMDdjN2NhIiwiZXhwIjoxNzcwMTEyODA3fQ.5zF5vDwlY_RHXz4lkckjovm1xbFxowIbqZvDf69QD0Y";

  const pinata = new PinataSDK({
    pinataJwt: JWT,
    pinataGateway: "https://emerald-big-beaver-890.mypinata.cloud",
  });

  // const contract = useAppSelector((state) => state.OrbDetailsReducer.address);
  const {address} = useOrbDetailsStore()
  const {setOrbTerms} = useOrbtermsStore()
  // const dispatch = useDispatch<AppDispatch>();
  // const [orbHashData, setOrbHashData] = useState<null | data>(null);


  //   0x1, 0x6261666b7265696878626d657571327174723279776c72706b7262337a6f6b,0x6a79736c6f773334796e7966786b677962736f73757964366a323565,
  // 0x1c,
  // 0x67296000,
  // 0x0,
  // 0x1,
  // 0x0


  // const longString: string[] = shortString
  //   .splitLongString(
  //     "bafkreihxbmeuq2qtr2ywlrpkrb3zokjyslow34ynyfxkgybsosuyd6j25e"
  //   )
  //   .map((str) => shortString.encodeShortString(str));

  // console.log("byteArr", longString);

  const fetchData = async () => {
    try {
      const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
      if (address !== null) {

        const { abi: testAbi } = await provider.getClassAt(address);

        if (testAbi === undefined) {
          throw new Error("no abi.");
        }

        const myContractCall = new Contract(testAbi, address, provider);

        const orbHash = await myContractCall.get_oathHash();
        const honoredUntil = await myContractCall.get_honored_until();
        const epochTime = Number(honoredUntil)
        const honoredDate = new Date(epochTime * 1000);
        // setHonoredUntil(honoredDate.toString());
        // console.log('hash of orb', orbHash);

        if (orbHash !== "") {



          const response = await pinata.gateways.get(orbHash);
          if (response.data && typeof response.data === 'object') {

            const orbData = response.data as unknown as OrbData;
            console.log('ddddd2', response.data);
            // setOrbHashData(orbData);
            const data = orbData.questions;
            // dispatch(getOrbTerms({ data }));
            setOrbTerms(data);

            console.log('orb terms data', data);
            return({honoredUntil:honoredDate.toString(),orbHashData:orbData})
          }

        }
        return({honoredUntil:honoredDate.toString()})


      }
    } catch (error) {
      console.error(error);
    }
  };
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['FetchOrbHashData'],
    queryFn: async () => {
      const data = await fetchData()
      return data
    },
  })

  // console.log('dataorbHashData',data?.orbHashData);
  

  // useEffect(() => {
  //   fetchData()
  // },[]);


  return (
    <section className="w-[90%] mx-auto mt-[72px]">
      <h2 className="text-[44px] font-bold leading-[52.8px] -tracking-[0.5px] mobile:text-[24px] mobile:leading-[30px] ">
        Oath
      </h2>

      <div
        className="w-[40%] lgDesktop:w-[50%] smDesktop:w-[65%] tabletAir:w-[80%] mobile:w-[100%] border-[1px] px-[1.5%] mt-[20px] rounded-2xl border-[#F4F4F4]"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.12) 100%)",
        }}
      >
        <p className="text-[16px] font-bold  tracking-[0.15px] py-[3%] justify-center text-justify flex mobile:text-[14px] mobile:leading-[20px]">
          {data?.orbHashData?.oathSworn}
        </p>

        {/* //   <p className="text-center  text-[20px] font-bold leading-[26px] tracking-[0.15px] mt-8 text-[#99E515]">Orbs Terms of Service</p> <br/>
        // <p className="text-[16px] font-bold  tracking-[0.15px] py-[3%] justify-center">
        //   {orbHashData?.terms}


        </p> */}
      </div>
      <div className="flex flex-col gap-4 mt-[40px] w-[40%] lgDesktop:w-[50%] smDesktop:w-[65%] tabletAir:w-[80%] mobile:w-[100%]">
        <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px] mobile:text-[14px] mobile:leading-[20px]">
            Privacy
          </h2>
          <p className="">..............</p>

          <div className="flex items-center">
            <p className="text-[14px] font-bold tracking-[0.46px] underline">
              {data?.orbHashData?.privacy}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px] mobile:text-[14px] mobile:leading-[20px]">
            Exclusivity
          </h2>
          <p className="">......................</p>

          <div className="flex items-center">
            <p className="text-[14px] font-bold tracking-[0.46px] underline">
              {data?.orbHashData?.Exclusivity}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px] mobile:text-[14px] mobile:leading-[20px]">
            Oath sworn on
          </h2>
          <p className="lgDesktop:hidden">
            ........................................................
          </p>
          <p className="hidden lgDesktop:block mobile:hidden">
            ..............................................
          </p>
          <p className="hidden mobile:block">
            ................
          </p>

          <div className="flex items-center">
            <p className="text-[14px] font-bold tracking-[0.46px] underline">
              {data?.orbHashData?.swornDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h2 className="text-[16px] font-bold leading-[22px] tracking-[0.15px] mobile:text-[14px] mobile:leading-[20px]">
            Oath honoured on
          </h2>
          <p className="mobile:hidden">
            ................................
          </p>
          <p className="hidden mobile:block">
            ............
          </p>

          <div className="flex items-center">
            <p className="text-[14px] font-bold tracking-[0.46px] underline">
              {data?.honoredUntil}
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
