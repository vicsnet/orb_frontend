"use client"
import { ProviderUrl } from '@/constant/contract';
// import { getOrbData } from '@/redux/features/orbSlice';
// import { AppDispatch } from '@/redux/store';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { cairo, Contract, RpcProvider, shortString } from 'starknet';
import {useOrbDetailsStore} from '@/zustand/Wallet'

interface CreatorProps {
  address: string,
  // image: string,
  // orber: string,
  // creator: string,
}
interface Data {
  name: string,
  description: string,
  image: string,
  creator: string,
  x_account: string,
  farcater: string
}
export default function SingleCreator(props: CreatorProps) {

  const [data, setData] = useState<Data | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {setOrbDetailsData} = useOrbDetailsStore()

  // const dispatch = useDispatch<AppDispatch>()

  const fetchData = async () => {
    const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });

    try {
      setLoading(true)
      if (props.address) {

        const addr = shortString.decodeShortString(props.address);

        const add = BigInt(props.address);
        let hexAddress = add.toString(16)
        hexAddress = hexAddress.padStart(64, '0');

        const addressOrb = '0x' + hexAddress;
        setAddress(addressOrb);
        const { abi: testAbi } = await provider.getClassAt(addressOrb);

        if (testAbi === undefined) {
          throw new Error("no abi.");
        }


        const myContractCall = new Contract(testAbi, addressOrb, provider);

        const tokenURI = await myContractCall.token_uri();
        const feltUri1 = tokenURI[0].toString();
        const feltUri2 = tokenURI[1].toString();
        const feltToShortString1 = shortString.decodeShortString(feltUri1)
        const feltToShortString2 = shortString.decodeShortString(feltUri2)

        const fullURI = feltToShortString1 + feltToShortString2;

        const response = await axios.get(
          `https://emerald-big-beaver-890.mypinata.cloud/ipfs/${fullURI}`,
        );


        setData(response?.data);
        console.log('myURI', addressOrb, response.data);

      }

      setLoading(false);


    } catch (error) {
      console.error(error);
    }
  }

  function hexToString(hex: string) {
    const bytes = Buffer.from(hex, "hex");

    let result = new TextDecoder("utf-8").decode(bytes);

    return result;
  }
  useEffect(() => {
    if (props.address)
      fetchData();
  }, [props.address])
  return (
    <div className=' px-auto flex max-w-[368px] min-w-[300px] h-[160px] rounded-2xl gap-4 border-[1px] border-[#303033] p-[9px]' style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.12) 100%)', boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.10)' }}>
      <div className="">
        <Image alt={"vince"} src={!loading && data !== null ? data?.image : '/images/hero.png'} width={140} height={140} className='rounded-[8px] ' />
      </div>
      <div className="text-[#FFFFFF] flex flex-col gap-2">
        <h2 className="text-[24px] font-bold leading-[32.016px]">{!loading && data?.name}&#39;s Orb</h2>
        <p className="text-[14px] font-bold tracking-[0.1px]">[@{!loading && data?.x_account}]</p>
        <p className="text-[14px] font-bold tracking-[0.1px]">created by {!loading && data?.creator}</p>
        <button onClick={() => { data !== null && 
          // dispatch(getOrbData({ data, account: address })) 
          setOrbDetailsData(data.name, data.description, data.image, data.creator, data.x_account, data.farcater, address)
          
          }} className='bg-[#99E515] mt-3 text-[14px] font-bold leading-[24px] tracking-[0.4px] text-center w-[156px] h-[32px] rounded-[6px] text-[#121312]'>
          <Link href={{
            pathname: `/${address}`,
            query: { orb: `${data?.name}` },

          }} >
            View Orb
          </Link>
        </button>
      </div>
    </div>
  )
}
