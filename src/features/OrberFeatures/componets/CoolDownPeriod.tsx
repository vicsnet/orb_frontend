"use client";

import React, { useEffect, useState } from "react";

// };
export default function CoolDownPeriod({ cooldownPeriod, setCooldownPeriod, flaggingperiod, setFlaggingPeriod }: { cooldownPeriod: number, setCooldownPeriod: React.Dispatch<React.SetStateAction<number>>, flaggingperiod: number, setFlaggingPeriod: React.Dispatch<React.SetStateAction<number>> }) {



  return (
    <main className="transition-all duration-500 ease-in-out transform hover:scale-[1.01]">
      <section className="animate-fadeIn">
        <div className="mx-auto w-[60%] lgDesktop:w-[80%] mobile:w-[100%] pt-4 pb-4 lgDesktop:pb-2 mobile:pt-4  noto-sans"> 
          <div className="mt-9 mb-9 lgDesktop:mb-2 lgDesktop:mt-4 smDesk:mt-52 tabletAir:mt-40 tablet:mt-24 mobile:mt-0 items-center py-[15px] px-[20px] gap-8 rounded-lg mx-auto animate-slideIn">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label htmlFor="" className='text-[16px] font-semibold text-[#FFFFFF] capitalize mb-2 animate-fadeIn'> Cooldown Period in Days <span className='text-[#E62E2E]'>*</span></label>
              <div className="flex items-center gap-2 bg-[#303033] rounded-lg border border-[#3E414C] hover:border-[#99E515] transition-all duration-300 hover:shadow-lg hover:shadow-[#99E515]/20">
                <input 
                  required
                  type="number" 
                  placeholder="Enter duration before users make new invocation" 
                  className="bg-transparent rounded p-3 text-[#FFFFFF] placeholder:text-[#9CA3AF] focus:outline-none h-[50px] w-[100%] px-4 " 
                  value={cooldownPeriod || ''}
                  onChange={(e) => setCooldownPeriod(Number(e.target.value))} 
                />
                <p className="p-3 animate-fadeIn">Days</p>
              </div>
              <p className="text-[14px] mt-2 leading-[20px] tracking-[-0.25px] text-[#9EA2B3] font-normal animate-fadeIn">Maximum of 14 days</p>
            </div>

            <div className="mt-6 transform transition-all duration-300 hover:scale-[1.02]">
              <label htmlFor="" className='text-[16px] font-semibold text-[#FFFFFF] capitalize mb-2 animate-fadeIn'>Flagging Period in Days <span className='text-[#E62E2E]'>*</span></label>
              <div className="flex items-center gap-2 bg-[#303033] rounded-lg border border-[#3E414C] hover:border-[#99E515] transition-all duration-300 hover:shadow-lg hover:shadow-[#99E515]/20">
                <input 
                  required
                  type="number" 
                  placeholder="Enter duration users can dislike invocation" 
                  className="bg-transparent rounded p-3 text-[#FFFFFF] placeholder:text-[#9CA3AF] focus:outline-none  h-[50px] w-[100%] px-4 " 
                  value={flaggingperiod || ''}
                  onChange={(e) => setFlaggingPeriod(Number(e.target.value))} 
                />
                <p className="p-3 animate-fadeIn">Days</p>
              </div>
              <p className="text-[14px] mt-2 leading-[20px] tracking-[-0.25px] text-[#9EA2B3] font-normal animate-fadeIn">Maximum of 7 days</p>
            </div>
          </div>
        </div>
      </section>
   
    </main>
  );
}
