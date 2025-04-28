"use client"
import React from 'react'
import Logo from './Logo'
import { usePathname } from 'next/navigation'
import ConnectButton from './ConnectButton';
type NavbarProps = {
  title: string;
  // setOpenCreateOrb?: React.Dispatch<React.SetStateAction<boolean>>;
  // openCreateOrb?: boolean;
};
export default function Navbar({ title}: NavbarProps) {
  const pathname = usePathname();
  return (
    <section className='w-[90%] mx-auto mt-12'>
      {pathname !== '/' && (
      <div className="flex items-center gap-4 pl-0 pr-4 py-2 text-[12px]">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-white hover:text-[#99E515] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
      )}
      <div className={`flex justify-between items-center`}>
        <Logo title={title} />
      
            <ConnectButton bg='bg-[#FFFFFF]' />
      
      </div>
    </section>
  )
}
