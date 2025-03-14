import React from 'react'
import ConnectButton from './ConnectButton'

export default function WalletConnectPopup() {
  return (
    <main className='w-[100%] h-screen top-0 absolute backdrop-opacity-5 flex items-center justify-center z-10'>
        <div className="w-[400px] h-[400px] bg-[#000000] flex flex-col items-center justify-center smDesktop:mt-[100px] tabletAir:mt-[80px] mobile:w-[300px] mobile:h-[300px]">

        <div className="flex items-center justify-center">
         
          <span className="text-[#99E515] text-center mb-8">Connect Wallet to continue</span>
        </div>
        <div className="w-[50%] text-center">
            <ConnectButton/>
        </div>
        </div>
    </main>
  )
}
