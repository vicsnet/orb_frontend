import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";
import OrbHero from "./componets/OrbHero";
import MainSection from "./componets/MainSection";

export default function OrberFeatures() {
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
        <Navbar title="Vincent's Orb" />

        <div className="">
            <OrbHero/>
        </div>
        </div>

      </div>
            <MainSection/>
      <Footer />
    </section>
  );
}
