"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState } from "react";
import OrbHero from "./componets/OrbHero";
import MainSection from "./componets/MainSection";
import Purchase from "../OrberFeatures/componets/Purchase";
import AskQuestion from "./componets/AskQuestion";
import SwearOath from "./componets/SwearOath";
import CoolDownPeriod from "./componets/CoolDownPeriod";
import SetPrice from "./componets/SetPrice";
import { useOrbDetailsStore, useWalletStore } from "@/zustand/Wallet";
import WalletConnectPopup from "@/components/WalletConnectPopup";
import Loading from "@/components/Loading";
import OverLayDashboard from "./componets/OverLayDashboard";
import { Contract } from "starknet";
import { RpcProvider } from "starknet";
import { ProviderUrl } from "@/constant/contract";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { padHexAddress } from "@/constant/constant";

export default function OrberFeatures() {

  const { name, creator } = useOrbDetailsStore()
  const [openPurchase, setOpenPurchase] = useState<boolean>(false)
  const [openInvoke, setOpenInvoke] = useState<boolean>(false)
  const [openOath, setOpenOath] = useState<boolean>(false)
  const [openCooldown, setOpenCooldown] = useState<boolean>(false)
  const [openPrice, setOpenPrice] = useState<boolean>(false)
  const [cooldownDays, setCooldownDays] = useState<number>(0)
  const { starknetAccount } = useWalletStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { address } = useOrbDetailsStore()



  const fetchData = async () => {
    try {
      const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });

      // console.log('reloadaddress', address);


      if (address !== null) {

        const { abi: testAbi } = await provider.getClassAt(address);

        if (testAbi === undefined) {
          toast.error("no abi.");
          throw new Error("no abi.");

        }

        const myContractCall = new Contract(testAbi, address, provider);
        const orbStatus = await myContractCall.get_orb_status();
        if (!starknetAccount) {
          return { orbStatus, orbKeeper: '0x', connectedAddress: null }
        }
        // console.log('starknetAccount', starknetAccount);

        const keeper = await myContractCall.main_keeper();
        const hexAddress = keeper.toString(16).padStart(64, '0')
        const orbKeeper = '0x0' + hexAddress;

        const addr = padHexAddress(starknetAccount?.address as string);
        const connectedAddress = addr;


        return { orbStatus, orbKeeper, connectedAddress }

      }
    } catch (error) {
      toast.error('Error fetching data');
      console.error(error);
    }
  };

  const { isPending, isError, data, error, isFetching, refetch } = useQuery({
    queryKey: ['fetchStatus'],
    queryFn: async () => {
      const data = await fetchData()
      return data// Return empty object if data is null/undefined
    },
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Refetch when component mounts
    refetchOnReconnect: true // Refetch when reconnecting
  })


  return (

    <section className="text-white overflow-y-scroll h-screen">
      <div className="relative">
        <div
          className="relative h-[860px] w-[100%] mobile:h-[800px] lgDesktop:h-[860px] smDesktop:h-[860px] smDesk:h-[860px] tabletAir:h-[860px]"
          style={{}}
        >
          <Image
            src="/images/Image.svg"
            alt="Landing Page"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="absolute top-0 w-[100%]">


          <Navbar title={`${name}'s Orb`} />

          <div className="">
            <OrbHero setOpenInvoke={setOpenInvoke} setOpenPurchase={setOpenPurchase} setOpenOath={setOpenOath} setOpenCooldown={setOpenCooldown} setOpenPrice={setOpenPrice} cooldownDays={cooldownDays} setIsLoading={setIsLoading} creator={creator as string} />
          </div>
        </div>

      </div>
      {
        data?.connectedAddress === data?.orbKeeper && data?.orbStatus === false &&
        <OverLayDashboard title={`${name}`} />
      }
      <MainSection setCooldownDays={setCooldownDays} />

      {openPurchase &&

        <Purchase setOpenPurchase={setOpenPurchase} />
      }

      {openInvoke &&
        <AskQuestion setOpenInvoke={setOpenInvoke} title={name as string} />
      }

      <Footer />
      {
        (data?.connectedAddress != data?.orbKeeper && data?.orbStatus === false) &&
        <WalletConnectPopup />
      }

      {/* {(!starknetAccount && data?.orbStatus === true) &&
        <WalletConnectPopup />
      } */}
      {isLoading && <Loading />}
    </section>
  );
}
