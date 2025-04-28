"use client"
import Image from 'next/image'
import React from 'react'

type NavbarProps = {
  setOpenCreateOrb?: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateOrb?: boolean;
};
export default function HeroSection({setOpenCreateOrb, openCreateOrb}: NavbarProps) {
  
  return (
    <section className='text-white mt-[64px]'>
      {/* content */}
      <div className="w-[90%] mx-auto">
        <h2 className="text-[64px] font-bold leading-[74.688px] -tracking-[1.5px] text-center text-[#FFFFFF] smDesktop:text-[60px] smDesktop:leading-[70px] mobile:text-[48px] mobile:leading-[60px]">Create, Connect, Own</h2>
        <p className="text-[16px] font-bold leading-[22px] tracking-[0.15px] text-center w-[55%] flex mx-auto mt-1 text-[#FFFFFF] smDesktop:text-[16px] smDesktop:leading-[25px] mobile:w-[90%]">Unleash your creativity with everything you need to reach your audience, build a community, and grow a sustainable business—all on your own terms</p>
        <div className="flex justify-center mt-10">
      <button
                onClick={() => setOpenCreateOrb && setOpenCreateOrb(true)}
                className='font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2 mobile:text-[12px] mobile:leading-[14px] cursor-pointer '
              >
                Create your own Orb
              </button>
        </div>
      </div>

      {/* Hero image */}
      <div className="" style={{ width: '100%', height: 'auto' }}>
        <Image src="/images/hero.svg"
          alt='hero section'
          layout='responsive'
          width={700} // Set the original width of the image
          height={475} // Set the original height of the image
          sizes="(max-width: 768px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw" //
        />
      </div>

      {/* section */}
      <div className="pt-[96px]" style={{ width: '100%', height: 'auto' }}>
        <Image src="/images/Image_Section_groups.svg"
          alt='hero section'
          layout='responsive'
          width={700} // Set the original width of the image
          height={475} // Set the original height of the image
          sizes="(max-width: 768px) 100vw, 
                   (max-width: 1200px) 50vw, 
                   33vw" //
        />
      </div>
    </section>
  )
}

