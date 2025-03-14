"use client"
import React, { useState } from "react";
import AboutOrb from "./AboutOrb";
import Oath from "./Oath";
import Questions from "./Questions";
import OrbActivity from "./OrbActivity";
import Invocation from "./Invocation";

type OrbHeroProps = {
  setCooldownDays: React.Dispatch<React.SetStateAction<number>>

};
export default function MainSection({ setCooldownDays }: OrbHeroProps) {
  const [name, setName] = useState<String>('about')



  return (
    <section>
      <div className="w-[30%] lgDesktop:w-[40%] smDesktop:w-[50%] smDesk:w-[60%] mobile:w-[90%] mx-auto flex gap-4 mobile:gap-0 border-[1px] border-[#99E515] rounded-[12px] px-2 py-4 -mt-[40px] relative z-10" style={{ background: 'linear-gradient(111deg, rgba(255, 255, 255, 0.16) -1.65%, rgba(255, 255, 255, 0.12) 100%)' }}>
        <div className={`${name === 'about' ? 'bg-[#99E515] text-[#121312] ease-in duration-75' : 'text-[#99E515] ease-out duration-75'} rounded-[6px] w-[150px] h-[40px] px-[8px] py-2 mobile:h-[44px] cursor-pointer`} onClick={() => setName('about')}>
          <h2 className=" text-[14px] font-bold leading-[26px] tracking-[0.46px] mobile:leading-[16px] text-center  ">
            About the Orb
          </h2>
        </div>
        <div className={` ${name === 'invocation' ? 'bg-[#99E515] text-[#121312] ease-in duration-75' : 'text-[#99E515] ease-out duration-75'} rounded-[6px] w-[180px] h-[40px] px-[8px] py-2 mobile:h-[44px] cursor-pointer`} onClick={() => setName('invocation')}>
          <h2 className=" text-[14px] font-bold leading-[26px] tracking-[0.46px] mobile:leading-[16px] text-center ">
            Orb Invocations
          </h2>
        </div>
        <div className={`${name === 'activity' ? 'bg-[#99E515] text-[#121312] ease-in duration-75' : 'text-[#99E515] ease-out duration-75'}  cursor-pointer rounded-[6px] w-[160px] h-[40px] px-[8px] py-2 mobile:py-4 mobile:h-[44px] cursor-pointer`} onClick={() => setName('activity')}>
          <h2 className=" text-center text-[14px] font-bold leading-[26px] tracking-[0.46px] mobile:leading-[16px] mobile:text-center ">
            Orb Activity
          </h2>
        </div>
      </div>
      {
        name === 'about' &&
        <section className="">
          <AboutOrb setCooldownDays={setCooldownDays} />
          <Oath />
          <Questions />
        </section>
      }

      {
        name === 'activity' &&
        //   {/* Activity */}

        <section className="">
          <OrbActivity />
        </section>
      }

      {
        name === 'invocation' &&
        //   {/* Invocation */}
        <section className="">
          <Invocation />
        </section>
      }

    </section>
  );
}
