"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState } from "react";
import OrbHero from "./componets/OrbHero";
import MainSection from "./componets/MainSection";
// import { useAppSelector } from "@/redux/store";
import Purchase from "../OrberFeatures/componets/Purchase";
import AskQuestion from "./componets/AskQuestion";
import SwearOath from "./componets/SwearOath";
import CoolDownPeriod from "./componets/CoolDownPeriod";
import SetPrice from "./componets/SetPrice";
import { useOrbDetailsStore } from "@/zustand/Wallet";

export default function OrberFeatures() {
  // const orbName = useAppSelector((state)=>state?.OrbDetailsReducer.OrbAccountDetails?.name);

  const {name} = useOrbDetailsStore()
  const [openPurchase, setOpenPurchase] = useState<boolean>(false)
  const [openInvoke, setOpenInvoke] = useState<boolean>(false)
  const [openOath, setOpenOath] = useState<boolean>(false)
  const [openCooldown, setOpenCooldown] = useState<boolean>(false)
  const [openPrice, setOpenPrice] = useState<boolean>(false)
  const [cooldownDays, setCooldownDays] = useState<number>(0)
  
  console.log('cooldownDays cooldownDays', cooldownDays);
  return (
    
    <section className="text-white">
      <div className="relative">
        <div
          className=""
          style={{ position: "relative", width: "100%", height: "860px" }}
        >
          <Image
            src="/images/Image.svg"
            alt="Landing Page"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="absolute top-0 w-[100%]">
        <Navbar title={`${name}'s Orb` }/>

        <div className="">
            <OrbHero setOpenInvoke={setOpenInvoke}setOpenPurchase={setOpenPurchase} setOpenOath={setOpenOath} setOpenCooldown={setOpenCooldown} setOpenPrice={setOpenPrice} cooldownDays={cooldownDays} />
        </div>
        </div>

      </div>
            <MainSection setCooldownDays={setCooldownDays}/>
            {openPurchase &&

            <Purchase setOpenPurchase={setOpenPurchase}/>
            }

            { openInvoke &&
              <AskQuestion setOpenInvoke={setOpenInvoke} title={name as string}/>
              }
                { openOath &&
              <SwearOath setOpenOath={setOpenOath} title={name as string}/>
              }

              {
                openCooldown &&
                <CoolDownPeriod setOpenCooldown={setOpenCooldown}/>
              }
              {openPrice &&
              <SetPrice setOpenPrice={setOpenPrice}/>
            }
      <Footer />
    </section>
  );
}
