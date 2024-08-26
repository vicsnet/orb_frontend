import Image from 'next/image'
import React from 'react'

export default function HeroSection() {
  return (
    <section className='text-white mt-[64px]'>
        {/* content */}
        <div className="w-[90%] mx-auto">
            <h2 className="text-[64px] font-bold leading-[74.688px] -tracking-[1.5px] text-center text-[#FFFFFF]">Create, Connect, Own</h2>
            <p className="text-[16px] font-bold leading-[22px] tracking-[0.15px] text-center w-[55%] flex mx-auto mt-1 text-[#FFFFFF]">Unleash your creativity with everything you need to reach your audience, build a community, and grow a sustainable business—all on your own terms</p>
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

