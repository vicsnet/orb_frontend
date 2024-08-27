import Image from "next/image";
import React from "react";

export default function OrbHero() {
  return (
    <section className="w-[90%] mx-auto mt-[180px] relative">
      <div
        className="w-[30%] border-[1px] rounded-[24px] "
        style={{
          background:
            "linear-gradient(111deg, rgba(255, 255, 255, 0.16) -1.65%, rgba(255, 255, 255, 0.12) 100%)",
        }}
      >
        {/* orb status */}
        <div className="">
          {/* status */}
          <h2 className="text-[20px] font-bold leading-[26px] tracking-[0.15px] capitalize text-white text-center pt-[16px]">
            ORB IS LIVE
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
              200 Strk
            </p>
          </div>

          <div className=" w-[90%] mx-auto flex justify-center flex-col">
            <p className="font-bold text-[20px] leading-[26px] tracking-[0.15px] text-center">
              Owning Vincent’s Orb allows its Keeper to ask Nic a question
              every 7 days. You can purchase a fraction of the orb to be a
              keeper and gain the right to book and ask Vincent questions.
            </p>
          </div>

          <div className="flex justify-center">
            <button className="text-[#121312] bg-[#99E515] text-[14px] font-bold leading-[26px] tracking-[0.46px] px-[14px] h-[30px] rounded-[6px] mt-12 mb-8">
              Purchase a fraction
            </button>

          </div>
            {/* if purchased */}
            {/* <div className="flex gap-1 text-center justify-center mt-12 mb-8 ">
            <h2 className="text-[14px] font-bold leading-[26px] tracking-[0.46px] underline text-[#99E515]">Follow Vincent</h2>
            <Image src='/images/External_link.svg' alt='follow_Vincent' width={16} height={16} />

            </div> */}

            {/* if purchased */}
            {/* <div className="flex justify-center gap-4 mt-12 mb-8">
              <button className="text-[14px] font-bold leading-[26px] tracking-[0.46px] text-[#121312] bg-[#99E515] rounded-md px-[16px] py-[8px]"> Ask Question</button>
              <button className="border-[#99E515] border-[1px] rounded-md text-[#99E515] px-[16px] py-[8px] text-[14px] leading-[26px] tracking-[0.46px] ">Book Meeting</button>
            </div> */}
        </div>
        {/* orb status */}
      </div>
    </section>
  );
}
