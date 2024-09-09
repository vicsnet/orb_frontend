import React from "react";
// import {connect, disconnect} from 'get-starknet'

import { connect, disconnect } from "@argent/get-starknet";
import { RpcProvider, Provider } from "starknet";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { walletConnect, walletDisConnect } from "@/redux/features/walletSlice";

export default function ConnectButton() {
  const dispatch = useDispatch<AppDispatch>();
  const accountStarknet  = useAppSelector((state) => state.walletReducer.starknetAccount);

  const myFrontendProviderUrl =
    "https://free-rpc.nethermind.io/sepolia-juno/v0_7";

  async function connectWallet() {
    try {
      const starknet = await connect();

      const provider = new Provider({
        rpc: {
          nodeUrl: myFrontendProviderUrl,
        },
      });

      if (window.starknet) {
        window.starknet.provider = provider;
      } else {
        console.error("StarkNet wallet is not available.");
        return;
      }

      if (starknet) {
        await starknet.enable();
        dispatch(walletConnect(starknet));
      }
      console.log(starknet);
    } catch (error) {
      console.log("error", error);
    }
  }

  const disconnectWallet = async ()=>{
  await disconnect();
  dispatch(walletDisConnect())
  }

  return (
    <div className="">
        {
            accountStarknet ? 
    <div 
      onClick={accountStarknet ? disconnectWallet: connectWallet }
      className=" font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2"
    >
   {accountStarknet.account.address.slice(0,4)}
   ...
   {accountStarknet.account.address.slice(-4)}
    </div>
    :
    <div
      onClick={connectWallet}
      className=" font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2"
    >
      Connect Wallet
    </div>
        }

    </div>
  );
}
