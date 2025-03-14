import React from "react";
// import {connect, disconnect} from 'get-starknet'

import { connect, disconnect } from "get-starknet";
import { RpcProvider, Provider } from "starknet";
// import { WalletAccount } from 'starknet';
import { WalletAccount } from 'starknet';
// import { useDispatch } from "react-redux";
// import { AppDispatch, useAppSelector } from "@/redux/store";
// import { walletConnect, walletDisConnect } from "@/redux/features/walletSlice";
import { useWalletStore } from "@/zustand/Wallet";

export default function ConnectButton() {
  // const dispatch = useDispatch<AppDispatch>();
  // const accountStarknet = useAppSelector((state) => state.walletReducer.starknetAccount);
  const { setStarknetAccount, setDisconnectAccount, starknetAccount } = useWalletStore()


  const myFrontendProviderUrl =
    "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";

  async function connectWallet() {
    try {
      const starknet = await connect({ modalMode: 'alwaysAsk', modalTheme: 'light' });

      const provider = new Provider({
        // rpc: {
        nodeUrl: myFrontendProviderUrl,
        // },
      });

      if (window.starknet) {
        window.starknet.provider = provider;
      } else {
        console.error("StarkNet wallet is not available.");
        return;
      }

      if (starknet) {
        await starknet.enable();
        // const myWalletAccount = new WalletAccount({ nodeUrl: myFrontendProviderUrl }, starknet);
        // const data  = walletConnect(starknet);
        const data = starknet;
        // console.log('ddddata', data);

        setStarknetAccount(data);
        // dispatch(walletConnect(starknet));
      }
      console.log(starknet);
    } catch (error) {
      console.log("error", error);
    }
  }

  const disconnectWallet = async () => {
    await disconnect();
    setDisconnectAccount();


    // dispatch(walletDisConnect())
  }

  // console.log('ddddata',starknetAccount);

  return (
    <div className="">
      {
        starknetAccount ?
          <div
            onClick={starknetAccount ? disconnectWallet : connectWallet}
            className=" font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2"
          >
            {starknetAccount?.account?.address.slice(0, 4)}
            ...
            {starknetAccount?.account.address.slice(-4)}
          </div>
          :
          <div
            onClick={connectWallet}
            className=" font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2 cursor-pointer mobile:text-[12px] mobile:leading-[14px]"
          >
            Connect Wallet
          </div>
      }

    </div>
  );
}
