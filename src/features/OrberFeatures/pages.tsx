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


export default function OrberFeatures() {

  const { name } = useOrbDetailsStore()
  const [openPurchase, setOpenPurchase] = useState<boolean>(false)
  const [openInvoke, setOpenInvoke] = useState<boolean>(false)
  const [openOath, setOpenOath] = useState<boolean>(false)
  const [openCooldown, setOpenCooldown] = useState<boolean>(false)
  const [openPrice, setOpenPrice] = useState<boolean>(false)
  const [cooldownDays, setCooldownDays] = useState<number>(0)
  const {starknetAccount} = useWalletStore()  
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // console.log('cooldownDays cooldownDays', cooldownDays);
  return (

    <section className="text-white overflow-y-scroll h-screen">
      <div className="relative">
        <div
          className="relative h-[860px] w-[100%] mobile:h-[800px] lgDesktop:h-[860px] smDesktop:h-[860px] smDesk:h-[860px] tabletAir:h-[860px]"
          style={{ }}
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
            <OrbHero setOpenInvoke={setOpenInvoke} setOpenPurchase={setOpenPurchase} setOpenOath={setOpenOath} setOpenCooldown={setOpenCooldown} setOpenPrice={setOpenPrice} cooldownDays={cooldownDays} setIsLoading={setIsLoading} />
          </div>
        </div>
      
      </div>
      <MainSection setCooldownDays={setCooldownDays} />

      {openPurchase &&

        <Purchase setOpenPurchase={setOpenPurchase} />
      }

      {openInvoke &&
        <AskQuestion setOpenInvoke={setOpenInvoke} title={name as string} />
      }
      {openOath &&
        <SwearOath setOpenOath={setOpenOath} title={name as string} />
      }

      {
        openCooldown &&
        <CoolDownPeriod setOpenCooldown={setOpenCooldown} />
      }
      {openPrice &&
        <SetPrice setOpenPrice={setOpenPrice} />
      }
      <Footer />
      {
        !starknetAccount &&
      <WalletConnectPopup />
      }
      { isLoading && <Loading />}
    </section>
  );
}
