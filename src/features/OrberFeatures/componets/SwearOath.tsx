import { orbInvocRegistryCA } from '@/constant/contract';
// import { useAppSelector } from '@/redux/store';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { ByteArray, byteArray, cairo, CallData, Contract, RpcProvider, shortString, WalletAccount } from 'starknet';
import {useOrbDetailsStore, useWalletStore} from "@/zustand/Wallet"
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
interface invokePros {
  title: string | undefined
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
  time: string
  setTime: React.Dispatch<React.SetStateAction<string>>
  days: number
  setDays: React.Dispatch<React.SetStateAction<number>>
  // setOpenOath: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SwearOath({ title, content, setContent, time, setTime, days, setDays }: invokePros  ) {

  return (
    <main className="transition-all duration-500 ease-in-out transform hover:scale-[1.01]">
      <section className="animate-fadeIn ">
        <div className="mx-auto w-[60%] lgDesktop:w-[80%] mobile:w-[100%] pt-4 pb-4 lgDesktop:pb-2 mobile:pt-4  noto-sans">
          <div className="mt-9 mb-9 lgDesktop:mb-2 lgDesktop:mt-4 smDesk:mt-52 tabletAir:mt-40 tablet:mt-24 mobile:mt-0 items-center py-[15px] px-[20px] gap-8 rounded-lg mx-auto animate-slideIn">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label htmlFor="" className='text-[16px] font-semibold text-[#FFFFFF] capitalize mb-2 animate-fadeIn'>Swear Oath <span className='text-[#E62E2E]'>*</span></label>
              <div className="mt-1">
                <textarea 
                  name="" 
                  id="" 
                  // rows={6} 
                  value={content || ''}
                  required
                  placeholder='I, Orbspace, swear to honor my Orb as long as I am able, or until it is retired. I shall answer any permissible question dutifully to the best of my abilities – as long as answering does not bring me into conflict with the law or my ethical code, or compromise myself or others.' 
                  className='w-[100%]  bg-[#303033] rounded p-3 text-[#FFFFFF] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#99E515] focus:ring-1 focus:ring-[#99E515] transition-all duration-300 hover:shadow-lg hover:shadow-[#99E515]/20 h-[150px] lgDesktop:h-[100px] ' 
                  onChange={(e) => setContent(e.target.value.replace(/\s*\n\s*/g, ' ').trim())}
                />
              </div>
            </div>

            <div className="mt-6 transform transition-all duration-300 hover:scale-[1.02]">
              <label htmlFor="" className='text-[16px] font-semibold text-[#FFFFFF] capitalize animate-fadeIn'>honored until <span className='text-[#E62E2E]'>*</span></label><br />
              <input 
                type="date" 
                required
                placeholder='Select date' 
                value={time || ''}
                className='mt-1 w-[100%] bg-[#303033] rounded p-3 text-[#FFFFFF] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#99E515] focus:ring-1 focus:ring-[#99E515] transition-all duration-300 hover:shadow-lg hover:shadow-[#99E515]/20' 
                onChange={(e) => setTime(e.target.value)} 
              />
              <p className="text-[14px] mt-2 leading-[20px] tracking-[-0.25px] text-[#9EA2B3] font-normal animate-fadeIn">This is the time orb will be active till</p>
            </div>

            <div className="mt-6 transform transition-all duration-300 hover:scale-[1.02]">
              <label htmlFor="" className='text-[16px] font-semibold text-[#FFFFFF] capitalize animate-fadeIn'>Response period <span className='text-[#E62E2E]'>*</span></label>
              <input 
                type="number" 
                required
                placeholder='Response time in days' 
                value={days || ''}
                className='mt-1 w-[100%] bg-[#303033] rounded p-3 text-[#FFFFFF] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#99E515] focus:ring-1 focus:ring-[#99E515] transition-all duration-300 hover:shadow-lg hover:shadow-[#99E515]/20' 
                onChange={(e) => setDays(Number(e.target.value))} 
              />
              <p className="text-[14px] mt-2 leading-[20px] tracking-[-0.25px] text-[#9EA2B3] font-normal animate-fadeIn">Maximum of 7 days</p>
            </div>
          </div>
        </div>
      </section>
     
    </main>
  )
}
