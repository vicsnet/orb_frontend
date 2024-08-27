"use client"
import React, { useState } from "react";
import AboutOrb from "./AboutOrb";
import Oath from "./Oath";
import Questions from "./Questions";
import OrbActivity from "./OrbActivity";
import Invocation from "./Invocation";

export default function MainSection() {
    const [name, setName] = useState<String>('about')
  return (
    <section>
      <div className="w-[30%] mx-auto flex border-[1px] border-[#99E515] rounded-[12px] px-2 py-4 -mt-[40px] relative z-10" style={{background: 'linear-gradient(111deg, rgba(255, 255, 255, 0.16) -1.65%, rgba(255, 255, 255, 0.12) 100%)'}}>
        <div className={`${name === 'about' ?'bg-[#99E515] text-[#121312] ease-in duration-75' : 'text-[#99E515] ease-out duration-75'} rounded-[6px] w-[150px] h-[40px] px-[8px] py-2 cursor-pointer`} onClick={()=>setName('about')}>
          <h2 className=" text-[14px] font-bold leading-[26px] tracking-[0.46px]  ">
            About the Orb
          </h2>
        </div>
        <div className={` ${name === 'invocation' ?'bg-[#99E515] text-[#121312] ease-in duration-75' : 'text-[#99E515] ease-out duration-75'} rounded-[6px] w-[200px] h-[40px] px-[8px] py-2 cursor-pointer`} onClick={()=>setName('invocation')}>
          <h2 className=" text-[14px] font-bold leading-[26px] tracking-[0.46px]  text-center">
            Orb Invocations
          </h2>
        </div>
        <div className={`${name === 'activity' ?'bg-[#99E515] text-[#121312] ease-in duration-75' : 'text-[#99E515] ease-out duration-75'}  cursor-pointer rounded-[6px] w-[200px] h-[40px] px-[8px] py-2`} onClick={()=>setName('activity')}>
          <h2 className=" text-center text-[14px] font-bold leading-[26px] tracking-[0.46px]  ">
            Orb Activity
          </h2>
        </div>
      </div>
{
    name === 'about' &&
      <section className="">
        <AboutOrb />
        <Oath/>
        <Questions/>
      </section>
}

{
    name === 'activity' &&
    //   {/* Activity */}

      <section className="">
        <OrbActivity/>
      </section>
}

{
    name ===  'invocation' &&
    //   {/* Invocation */}
      <section className="">
        <Invocation/>
      </section>
}

    </section>
  );
}
