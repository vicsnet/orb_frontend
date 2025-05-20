import React, { useState, useEffect } from "react";
// import {connect, disconnect} from 'get-starknet'

import { connect, disconnect, } from "get-starknet";
import { RpcProvider, Provider, ProviderInterface, constants, Contract, cairo } from "starknet";
import { WALLET_API } from "@starknet-io/types-js";
import { WalletAccount, wallet, } from 'starknet';
import { FaRegCopy } from "react-icons/fa6";
import { RiExternalLinkLine } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { SiContinente } from "react-icons/si";
import { MdAccountBalanceWallet } from "react-icons/md";
import { useWalletStore, useOpenOwnedOrb } from "@/zustand/Wallet";
import Image from "next/image";
import { toast } from "react-toastify";
import { orbPondCA, ProviderUrl } from "@/constant/contract";
import Link from "next/link";
import { useRouter } from "next/router";
interface StarknetWalletProvider extends WALLET_API.StarknetWindowObject {
}
export default function ConnectButton({ bg }: { bg: string }) {
  const router = useRouter();
  const navigate = router.push;

  const { setStarknetAccount, setDisconnectAccount, starknetAccount, setStarknet,  } = useWalletStore();
  const { setOpenOwnedOrb } = useOpenOwnedOrb();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [orbOwnerStatus, setOrbOwnerStatus] = useState<boolean>(false);
  const [orbAddress, setOrbAddress] = useState<string>('');

  const myFrontendProviderUrl =
    "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";

  const testnetChainID = "0x534e5f5345504f4c4941";


  const myFrontendProviders: ProviderInterface[] = [
    new RpcProvider({ nodeUrl: "https://starknet-mainnet.public.blastapi.io/rpc/v0_7" }),
    new RpcProvider({ nodeUrl: myFrontendProviderUrl }),
    new RpcProvider({ nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/v0_7" })];

  const connectWallet = async () => {

    const selectedWalletSWO = await connect({ modalMode: 'alwaysAsk', modalTheme: 'light' });

    if (!selectedWalletSWO) {
      return;
    }

    // await selectedWalletSWO.enable({ starknetVersion: 'v5' });

    const myWalletAccount = await WalletAccount.connect(
      myFrontendProviders[2],
      selectedWalletSWO as StarknetWalletProvider
    );




    const writeChainId = await wallet.requestChainId(myWalletAccount.walletProvider);

    await (selectedWalletSWO as any).enable?.({ starknetVersion: 'v5' });

    if (writeChainId !== testnetChainID) {

      await myWalletAccount.switchStarknetChain(constants.StarknetChainId.SN_SEPOLIA);
    }
    setStarknet(selectedWalletSWO);
    // if(myWalletAccount){
    setStarknetAccount(myWalletAccount)
    // }
  }

  const disconnectWallet = async () => {
    await disconnect();
    setDisconnectAccount();

  }

  const readOrb = async () => {
    try {
      const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
      const { abi: testAbi } = await provider.getClassAt(orbPondCA);
      const myContractCall = new Contract(testAbi, orbPondCA, provider);
      const orbStatus = await myContractCall.get_user_status(starknetAccount?.address);
      setOrbOwnerStatus(orbStatus);

      if (orbStatus === true) {
        const orbAddress = await myContractCall.get_my_orb(starknetAccount?.address);
        let contractAddress = BigInt(orbAddress);
        let hexAddress = contractAddress.toString(16);
        hexAddress = hexAddress.padStart(64, '0');
        setOrbAddress('0x' + hexAddress);

      }
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    if (starknetAccount) {
      readOrb();
    }

  }, [starknetAccount]);


  return (
    <div className="relative">

      {
        starknetAccount ?
          <div
            onClick={() => setShowModal(!showModal)}
            className={`font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] ${bg} rounded-md py-2 px-4 w-[200px] cursor-pointer mobile:text-[12px] mobile:leading-[14px] relative transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex items-center gap-2
            ">
              <Image src={starknetAccount?.walletProvider.icon as string} alt="icon" width={20} height={20} />
              <div className="">
                <h2 className="text-[14px] font-bold leading-5 tracking-[0.1px]">{starknetAccount?.walletProvider.name}</h2>
                <div className="flex items-center gap-2 text-[#636669]">
                  <p className="text-[14px] leading-[20px] font-normal tracking-[0.17px]">
                    {starknetAccount?.address.slice(0, 4)}
                    ...
                    {starknetAccount?.address.slice(-4)}
                  </p>
                  <div className="flex items-center gap-2">
                    <FaRegCopy size={16} className="cursor-pointer" onClick={() => {
                      navigator.clipboard.writeText(starknetAccount?.address);
                      toast.success('Address copied to clipboard');
                    }} />
                    <RiExternalLinkLine size={16} className="cursor-pointer " onClick={() => {
                      window.open(`https://sepolia.voyager.online/contract/${starknetAccount?.address}`, '_blank');
                    }} />
                  </div>

                </div>
              </div>
            </div>


          </div>
          :
          <div
            onClick={connectWallet}
            className={`font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] ${bg} rounded-md py-4 text-center w-[200px] cursor-pointer mobile:text-[12px] mobile:leading-[14px] transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          >
            Connect Wallet
          </div>
      }

      <div className={`w-[200px] border-[1px] rounded absolute border-[#ffffff] mt-2 transition-all duration-300 ease-in-out transform z-10  ${showModal ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        {
          orbOwnerStatus === false ?
            <div className="flex items-center gap-2 px-4 pt-6 cursor-pointer" onClick={() => {
              if (window.location.pathname !== '/') {
               navigate('/');
              }
              setOpenOwnedOrb(true);
            }}>  
              <SiContinente size={16} className="text-[#ffffff]" />
              <p className="text-[16px] font-normal leading-[20px] tracking-[0.17px] text-[#ffffff]">Orb Owned</p>
            </div>
            :
            <Link href={`/${orbAddress}`} className="flex items-center gap-2 px-4 pt-6 cursor-pointer">
              <SiContinente size={16} className="text-[#ffffff]" />
              <p className="text-[16px] font-normal leading-[20px] tracking-[0.17px] text-[#ffffff]">View My Orb</p>
            </Link>
        }
        {/* <div className="flex items-center gap-2 px-4 pt-4">
          <IoIosSettings size={16} className="text-[#ffffff]" />
          <p className="text-[16px] font-normal leading-[20px] tracking-[0.17px] text-[#ffffff]">Settings</p>
        </div> */}
        <div className="px-4 pt-4 pb-4">
          <div className="flex items-center gap-2 pt-4 border-t-[1px] border-[#ffffff] cursor-pointer">
            <MdAccountBalanceWallet size={16} className="text-[#F84337] transition-colors duration-300 hover:text-[#ff6b6b]" />
            <p
              onClick={() => { disconnectWallet(); setShowModal(false) }}
              className="text-[16px] font-normal leading-[20px] tracking-[0.17px] text-[#F84337] transition-colors duration-300 hover:text-[#ff6b6b] cursor-pointer"
            >
              Disconnect Wallet
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}
