"use client"
import React from 'react'
import Logo from './Logo'
import { usePathname } from 'next/navigation'
import ConnectButton from './ConnectButton';
type NavbarProps = {
  title: string;
  setOpenCreateOrb?: React.Dispatch<React.SetStateAction<boolean>>;
  openCreateOrb?: boolean;
};
export default function Navbar({ title, setOpenCreateOrb, openCreateOrb }: NavbarProps) {
  const pathname = usePathname();
  return (
    <section className='w-[90%] mx-auto'>
      <div className="flex justify-between pt-[64px] items-center">
        <Logo title={title} />
        {
          pathname === '/' && !openCreateOrb ?
            <>
              <button 
                onClick={() => setOpenCreateOrb && setOpenCreateOrb(true)} 
                className='font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2 mobile:text-[12px] mobile:leading-[14px]'
              > 
                Create your own Orb
              </button>
            </>
            :
            <ConnectButton />
        }
      </div>
    </section>
  )
}
