import React from 'react'
import ConnectButton from './ConnectButton'

export default function WalletConnectPopup() {
  return (
    <main className='w-[100%] h-screen top-0 absolute backdrop-blur-sm bg-black/50 flex items-center justify-center z-50'>
        <div className="w-[400px] bg-[#1A1A1A] flex flex-col items-center justify-center p-8 smDesktop:mt-[100px] tabletAir:mt-[80px] mobile:w-[90%] border border-[#99E515] rounded-xl shadow-lg shadow-[#99E515]/20">
            <div className="flex flex-col items-center justify-center gap-6">
                <div className="w-16 h-16 rounded-full bg-[#99E515]/10 flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-[#99E515]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="text-[#FFFFFF] text-2xl font-bold">Orb Not Started</h2>
                <p className="text-[#99E515] text-center text-sm leading-relaxed max-w-[280px]">This Orb has not been activated yet. </p>
                <button 
                    onClick={() => window.location.href = '/'}
                    className="mt-4 px-6 py-2 bg-[#99E515] text-[#121312] font-bold rounded-md hover:bg-[#99E515]/90 transition-colors"
                >
                    Back to Home
                </button>
            </div>
        </div>
    </main>
  )
}
