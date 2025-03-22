"use client";
import { ProviderUrl } from "@/constant/contract";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cairo, Contract, RpcProvider, shortString, WalletAccount } from "starknet";
import { currentDate, epochToTime } from "@/constant/constant";
import { LuDot } from "react-icons/lu";
import { useOrbDetailsStore, useOrbprice, useWalletStore } from "@/zustand/Wallet"
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";


type OrbHeroProps = {
  setOpenPurchase: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenInvoke: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenOath: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCooldown: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenPrice: React.Dispatch<React.SetStateAction<boolean>>;
  cooldownDays: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OrbHero({ setOpenPurchase, setOpenInvoke, setOpenOath, setOpenCooldown, setOpenPrice, cooldownDays, setIsLoading }: OrbHeroProps) {

  const { setOrbPrice, price } = useOrbprice();
  const { starknetAccount } = useWalletStore();

  const { address, description } = useOrbDetailsStore();

  // const [myOrbprice, setMyOrbPrice] = useState<any>(0);
  // const [orbStatus, setOrbStatus] = useState<boolean>(false);
  const [totalFracOrb, setTotalFracOrb] = useState<any>(0);
  const [AddressFrac, setAddressFrac] = useState<any>(0);
  // const [orbEndDate, setOrbEndDate] = useState("");
  // const [orbToken, setOrbToken] = useState<any>(0);
  // const [oathHash, setOathHash] = useState<string>("")
  const decimal: number = 1000000000000000000;

  const fetchData = async () => {
    try {
      const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
      console.log('reloadaddress', address);
      

      if (address !== null) {
        // console.log('contract', address);

        const { abi: testAbi } = await provider.getClassAt(address);

        if (testAbi === undefined) {
          toast.error("no abi.");
          throw new Error("no abi.");
    
        }

        const myContractCall = new Contract(testAbi, address, provider);

        const priceHash = await myContractCall.get_orb_price();
        // setMyOrbPrice(priceHash.toString());

        setOrbPrice(priceHash.toString());
        
        

        const oathHash = await myContractCall.get_oathHash();
        // setOathHash(oathHash);


        const orbStatus = await myContractCall.get_orb_status();
        // setOrbStatus(orbStatus);

        const orbEndTime = await myContractCall.get_honored_until();
        const epochTimeConversion = epochToTime(orbEndTime.toString());
        // setOrbEndDate(epochTimeConversion);

        const totalOrb = await myContractCall.get_total_supply();
        // console.log('totalOrb', totalOrb);

        setTotalFracOrb(totalOrb.toString());
        const totalAddressFrac = await myContractCall.my_fractioned_balance(
          address
        );
        setAddressFrac(totalAddressFrac.toString());
        if (starknetAccount) {
          const buyerAddress = starknetAccount?.account.address;
          const myFracBalance = await myContractCall.my_fractioned_balance(
            buyerAddress
          );
          // setOrbToken(myFracBalance);

          return ({ myOrbprice: priceHash.toString(), oathHash: oathHash, totalFracOrb: totalOrb.toString(), orbStatus: orbStatus, orbEndDate: epochTimeConversion, AddressFrac:totalAddressFrac.toString(),  orbToken: myFracBalance })
        }
        return ({ myOrbprice: priceHash.toString(), oathHash: oathHash, totalFracOrb: totalOrb.toString(), orbStatus: orbStatus, orbEndDate: epochTimeConversion, AddressFrac:totalAddressFrac.toString(), orbToken: 0 })
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startMyOrb = async () => {
    setIsLoading(true);
    const myFrontendProviderUrl =
      "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";

    try {
      if (address !== null) {
        console.log("starknetAccount", starknetAccount);
        const ProviderUrl = starknetAccount?.provider.provider.nodeUrl;
        const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });

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


          contractCall.connect(myWalletAccount);

          const myCall = contractCall.populate("start_orb", []);

          const res = await myWalletAccount.execute(myCall);
          await provider.waitForTransaction(res.transaction_hash);
          console.log(res.transaction_hash);
        }
        toast.success('Orb started successfully');
        setIsLoading(false);
      }


    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const { isPending, isError, data, error, isFetching, refetch } = useQuery({
    queryKey: ['FetchHeroData'],
    queryFn: async () => {
      const data = await fetchData()
      return data// Return empty object if data is null/undefined
    },
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Refetch when component mounts
    refetchOnReconnect: true // Refetch when reconnecting
  })

  // console.log('daraaa', data);
  // console.log('daraaa3', data?.orbToken);

  useEffect(() => {
   refetch()
    // console.log('orbToken', orbToken);

  }, []);
  return (
    <section className="w-[96%] mx-auto mt-[100px] mobile:mt-[50px] relative">
      <div
        className="w-[35%] lgDesktop:w-[40%] smDesktop:w-[50%] smDesk:w-[60%] mobile:w-[100%] border-[1px] rounded-[24px] "
        style={{
          background:
            "linear-gradient(111deg, rgba(255, 255, 255, 0.16) -1.65%, rgba(255, 255, 255, 0.12) 100%)",
        }}
      >
        {/* orb status */}
        <div className="">
          {isPending ? (
            <div className="flex flex-col justify-center items-center h-[300px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#99E515]"></div>
              <p className="text-[16px] font-bold tracking-[0.15px] text-gray-400 italic mt-4">
                Loading orb details...
              </p>
            </div>
          ) : (
          <>
          {/* status */}
          <h2 className="text-[20px] font-bold leading-[26px] tracking-[0.15px] capitalize text-white text-center pt-[16px]">
           
            
                {data?.orbStatus && data?.orbEndDate > currentDate() && "ORB IS LIVE"}

                {data?.orbStatus && data?.orbEndDate < currentDate() && "ORB HAS ENDED"}
                {!data?.orbStatus && "ORB NOT STARTED"}
            
            
          </h2>

          {/* PRICE */}

          <div
            className=" flex flex-col border-[1px] rounded-[6px] px-[6px] py-[10px] w-[110px] mt-[30px] mb-[30px] mx-auto"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.16) 100%)",
            }}
          >
            <h2 className="font-normal text-[16px] leading-[22px] tracking-[0.15px] text-center">
              Orb Price
            </h2>
            <p className="text-white font-bold leading-[32.016px] text-center">
            
                {(Number(data?.myOrbprice) / decimal).toFixed(2)} Strk
           
            </p>
          </div>

          <div className=" w-[90%] mx-auto flex justify-center flex-col">
            <p className="font-bold text-[20px] leading-[26px] tracking-[0.15px] text-center">
             
              {data?.orbStatus && data?.orbEndDate > currentDate() &&  description && description.length > 201 ? description.slice(0, 201) + ' ...' : description}
              {data?.orbStatus &&
                data?.orbEndDate < currentDate() &&
                "And now his watch has ended. Orb is over, and no further activity will happen. Thank you to everyone who participated."}
            
            </p>
          </div>
          {/* for non orb user */}
          <div className="w-[65%] mx-auto mt-5">
            <div className="bg-[#636669BF] rounded-full flex w-[35%] lgDesktop:w-[43%] tabletAir:w-[45%] mobile:w-[60%] ">
              <p className="font-bold text-white text-[16px] leading-5  py-[6px] text-center px-[20px]">
                
                {Number(data?.AddressFrac)}/{Number(data?.totalFracOrb)} available
               
              </p>
            </div>
          </div>
          {/* for user */}
          <div className="flex items-center w-[90%] mx-auto mt-5">
            <LuDot size={40} className="text-[#99E515]" />
            <p className="text-[16px] font-bold leading-5 text-[#FFFFFF] -ml-2">
              Active
            </p>
          </div>
          {/* for admin swear oath */}
          <div className="flex justify-center items-center w-[90%] mx-auto gap-4 ">
         
            {data?.oathHash === "" && (
              <button
                className="text-[#121312] bg-[#99E515] text-[14px] font-bold leading-[26px] tracking-[0.46px] px-[14px] h-[42px] lgDesktop:leading-[18px]  mobile:leading-[18px] mobile:h-[50px] rounded-[6px] mt-12 mb-8"
                onClick={() => setOpenOath(true)}
              >
                Swear Oath
              </button>
            )}
           
           {/* set cooldown period */}

            {cooldownDays === 0 && <button
              className="text-[#121312] bg-[#99E515] text-[14px] font-bold leading-[26px] tracking-[0.46px] px-[14px] h-[42px] lgDesktop:leading-[18px]  mobile:leading-[18px] mobile:h-[50px] rounded-[6px] mt-12 mb-8"
              onClick={() => setOpenCooldown(true)}
            >
              Set Cooldown Period
            </button>}

            {/* set price */}
            {Number(price) === 0 &&
              <button
                className="text-[#121312] bg-[#99E515] text-[14px] font-bold leading-[26px] tracking-[0.46px] px-[14px] h-[42px] lgDesktop:leading-[18px]  mobile:leading-[18px] mobile:h-[50px] rounded-[6px] mt-12 mb-8"
                onClick={() => setOpenPrice(true)}
              >
                Set Price
              </button>
            }
           
            
            {
              !data?.orbStatus &&
              <button
                className="text-[#121312] bg-[#99E515] text-[14px] font-bold leading-[26px] tracking-[0.46px] px-[14px] h-[42px] lgDesktop:leading-[18px]  mobile:leading-[18px] mobile:h-[50px] rounded-[6px] mt-12 mb-8"
                onClick={() => startMyOrb()}
              >
                Start Orb
              </button>
            }
              
          </div>
         
          {Number(data?.orbToken) === 0 && Number(price) !== 0 && (
            <div className="flex justify-center">
              {data?.orbStatus && (
                <button
                  className="text-[#121312] bg-[#99E515] text-[14px] font-bold leading-[26px] tracking-[0.46px] px-[14px] h-[42px] lgDesktop:leading-[18px]  mobile:leading-[18px] mobile:h-[50px] rounded-[6px] mt-12 mb-8"
                  onClick={() => setOpenPurchase(true)}
                >
                  Purchase a fraction
                </button>
              )}
            </div>
          )}

          {Number(data?.orbToken) === 1 && (
            <>
              {/* if purchased */}

              <div className="flex gap-1 text-center justify-center mt-12 mb-8 ">
                <h2 className="text-[14px] font-bold leading-[26px] tracking-[0.46px] underline text-[#99E515]">
                  Follow Vincent
                </h2>
                <Image
                  src="/images/External_link.svg"
                  alt="follow_Vincent"
                  width={16}
                  height={16}
                />
              </div>

              {/* if purchased */}
              <div className="flex justify-center gap-4 mt-12 mb-8">
                <button className="text-[14px] font-bold leading-[26px] tracking-[0.46px] text-[#121312] bg-[#99E515] rounded-md px-[16px] py-[8px]" onClick={() => setOpenInvoke(true)}>
                  {" "}
                  Ask Question
                </button>
                <button className="border-[#99E515] border-[1px] rounded-md text-[#99E515] px-[16px] py-[8px] text-[14px] leading-[26px] tracking-[0.46px] mobile:px-[10px] mobile:py-[6px] mobile:text-[12px] mobile:leading-[18px] ">
                  Book Meeting
                </button>
              </div>
            </>
          )}
          </>
          )}
        </div>
        {/* orb status */}
      </div>
    
    </section>
  );
}
