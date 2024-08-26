"use client";
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router'
import React from 'react'

export default function Footer() {
  // const router = useRouter();
  const pathname = usePathname()
  // const current_path = router.pathname;

  console.log(pathname);
  
  return (
    <section className='relative'>
      
      {/* background image */}
      <div className="" style={{ position: 'relative', width: '100%', height: '589px' }}>
        <Image 
        src="/images/Footer_image.svg"
        alt="Footer"
        fill
        style={{ objectFit: 'cover' }}/>
      </div>
      {/* section */}
      <div className="text-white absolute top-[98px] w-[90%] ml-[5%]">
        {/* landing page section */}
        {
          pathname === '/' ?
        <div className="">
    <h2 className="text-center text-[44px] font-bold leading-[52.8px] -tracking-[0.5px]">Want to create your Orb</h2>
    <p className="text-[16px] font-bold leading-[22px] tracking-[0.15px] text-center">The future of creative independence. Create your first orb in seconds</p>
    <div className=" flex justify-center items-center gap-4 mt-[40px]">

      {/*  */}
      <button className='bg-[#99E515] rounded-[6px] text-[14px] font-bold leading-[26px] tracking-[0.46px] text-[#121312] text-center px-[16px] py-[8px]'> Create Orb </button>
      <button className='flex gap-2 items-center'> 
        <p className="text-[14px] font-bold leading-[26px] tracking-[0.46px] text-[#99E515]">

        Join Our Community 
        </p>
        <Image src="/images/arrrow_right.svg"  alt='Join Our Community' width={24} height={24}/>
        </button>
    </div>

        </div>
    :
        // {/* Orber section */}
        <div className="flex justify-center mt-[40px]">
        <button className='flex gap-2 items-center'> 
        <p className="text-[14px] font-bold leading-[26px] tracking-[0.46px] text-[#99E515]">

        Verified on Starkscan
        </p>
        <Image src="/images/External_link.svg"  alt='Join Our Community' width={24} height={24}/>
        </button>
        <div className="text-white">

        
        </div>
        </div>
        }
    
    {/* main Footer */}
    <div className="mt-[50px]">
      <h1 className='text-[128px] font-normal leading-[163.84px] text-center text-[#E0FE82] logo' >ORB SPACE</h1>
      <p className="text-[20px] font-bold leading-[130%] tracking-[0.15px] text-center">© 2023 Orbspace Technologies. All rights reserved.
        </p>
        <p className="text-[20px] font-bold leading-[130%] tracking-[0.15px] text-center mt-1">
        Questions, feedback, or just want to chat? Email us at hello@orb.space

        </p>
    </div>
    {/* main Footer */}
      </div>
    </section>
  )
}
