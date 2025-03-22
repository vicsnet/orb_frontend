import { orbInvocRegistryCA } from '@/constant/contract';
// import { useAppSelector } from '@/redux/store';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { ByteArray, byteArray, cairo, CallData, Contract, RpcProvider, shortString, WalletAccount } from 'starknet';
import {useOrbDetailsStore, useWalletStore} from "@/zustand/Wallet"
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
interface invokePros {
  title: string | undefined
  setOpenOath: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SwearOath({ title, setOpenOath }: invokePros) {
  const [content, setContent] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [days, setDays] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {starknetAccount} = useWalletStore();

  const {address} = useOrbDetailsStore()



  const invokeOrb = async () => {
    if(!starknetAccount){
      toast.error('Please connect your wallet');
      setIsLoading(false);
      return;
    }
    if(content === '' || time === '' || days === 0){
      toast.error('All fields are required');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const myFrontendProviderUrl =
      "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";

    try {

      console.log('started calling');
      const currentDate = new Date()

      const dataJson = {
        oathSworn: content,
        privacy: "Private questions and answers allowed, booking allowed",
        Exclusivity: "Keepers can read past Q&A and reveal their own",
        swornDate: currentDate,
        questions: [{
          "title": "What function does Domain's Orb have?",
          "content": "Different Orbs have different functions. Domain's Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days."
        },
        {
          "title": "Who is a Keeper?",
          "content": "Different Orbs have different functions. Vincent’s Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days."
        },
        {
          "title": "Who is the Orb for?",
          "content": "Different Orbs have different  functions. Vincent’s Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days."
        },
        {
          "title": "What’s a “cooldown?",
          "content": "Different Orbs have different functions. Vincent’s Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days."
        },
        {
          "title": "I’m still confused. Why am I paying money to hold the Orb!?",
          "content": "Different Orbs have different functions. Vincent’s Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days."
        }
        ]

      }

      const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYTBjNjg3MS04NGIxLTRlMDgtODg2ZC1iYmU5ODY5ZDQ4OWMiLCJlbWFpbCI6InZpbmNlLmFkZXNhbm1pMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWQ2MGI4MzZiNGI3M2Q3OGU5NmYiLCJzY29wZWRLZXlTZWNyZXQiOiI2N2FjNWNmZTBhODIzYWEyYzA1ZDA5MDNhMDRiZWQ5YjM1MzllMDVkODkxZWMwNTRiYjM2OTBkMDUyMDdjN2NhIiwiZXhwIjoxNzcwMTEyODA3fQ.5zF5vDwlY_RHXz4lkckjovm1xbFxowIbqZvDf69QD0Y";

      const formData = new FormData();
      const jsonData = JSON.stringify(dataJson);


      const file = new File([jsonData], `${title}oath.json`, { type: "application/json" });
      formData.append("file", file);
      
      const request = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {

          Authorization: `Bearer ${JWT}`,
        },
        body: formData,
      });
      const response = await request.json();

      console.log('resp...', response.IpfsHash);
      const dataContent = response.IpfsHash;

      const ProviderUrl = starknetAccount?.provider.provider.nodeUrl;
      const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
      if (address !== null) {

        const { abi: testAbi } = await provider.getClassAt(address);
        if (testAbi === undefined) {
          toast.error('no abi');
          setIsLoading(false);
          return;
        }

        const myWalletAccount = new WalletAccount(
          { nodeUrl: myFrontendProviderUrl },
          starknetAccount as any
        );
        const contractCall = new Contract(
          testAbi,
          address,
          myWalletAccount
        );

        const date = new Date(time);
        // setOpenOath
        const epochTime = date.getTime() / 1000;
        const convertedDays = days * 24 * 60 * 60 * 1000;

        contractCall.connect(myWalletAccount);
        const myInvokeCall = contractCall.populate("swear_oath", [
          dataContent,
          cairo.uint256(epochTime),
          cairo.uint256(convertedDays),
        ]);

        const resToken = await myWalletAccount.execute(myInvokeCall);
        await provider.waitForTransaction(resToken.transaction_hash);
        console.log("resToken", resToken.transaction_hash);
        console.log('ended');
        setOpenOath(false);
        toast.success('OATH SWORN SUCCESSFULLY');
        setIsLoading(false);
      }




    } catch (error) {
      console.error(error);
      toast.error('OATH NOT SWORN');
      setIsLoading(false);
    }


  }
  return (
    <main className='w-[100%] h-screen absolute top-0 backdrop-blur-sm bg-black/30 z-10 overflow-y-scroll  no-scrollbar'>
      <section className="w-[30%] lgDesktop:w-[40%] smDesktop:w-[45%] smDesk:w-[50%] tabletAir:w-[60%] mobile:w-[90%]  mx-auto bg-[#252525] border-[1px] border-[#F4F4F4] rounded-2xl mt-[200px] lgDesktop:mt-[150px] smDesktop:mt-[100px] smDesk:mt-[50px] tabletAir:mt-[140px] mobile:mt-[50px] ">
        <div className=" mx-auto w-[90%] pt-4 pb-4">
          <div className="flex justify-between">
            {/* <p className=""></p> */}
            <h2 className="text-[20px] leading-8 text-[#FFFFFF] text-center">
              Swear Oath
            </h2>
            <span className="cursor-pointer" >
              <MdClose
                size={24}
                className=""
                onClick={() => setOpenOath(false)}
              />
            </span>
          </div>

          <div className=" mt-9 mb-9 items-center bg-[#303033] py-[15px] px-[20px] mx-auto rounded-lg">
            <div className="">
              <textarea name="" id="" rows={10} placeholder='I, Orbspace, swear to honor my Orb as long as I am able, or until it is retired. I shall answer any permissible question dutifully to the best of my abilities – as long as answering does not bring me into conflict with the law or my ethical code, or compromise myself or others.' className='w-[100%] bg-transparent border border-[#DCDEE0] rounded-lg p-3 text-[#FFFFFF] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#99E515] focus:ring-1 focus:ring-[#99E515] transition-colors' onChange={(e) => setContent(e.target.value)}></textarea>
            </div>

            <div className="mt-4">
              <label htmlFor="" className='capitalize'>honored until</label><br />
              <input type="date" placeholder='date' className='bg-transparent border border-[#DCDEE0] rounded-lg p-3 text-[#FFFFFF] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#99E515] focus:ring-1 focus:ring-[#99E515] transition-colors' onChange={(e) => setTime(e.target.value)} />
            </div>

            <div className="mt-4">
              <label htmlFor="" className='text-[14px] font-medium text-[#FFFFFF] capitalize mb-2 block'>Response period</label>
              <input type="number" placeholder='Response time in days' className=' bg-transparent border border-[#DCDEE0] rounded-lg p-3 text-[#FFFFFF] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#99E515] focus:ring-1 focus:ring-[#99E515] transition-colors' onChange={(e) => setDays(Number(e.target.value))} />
            </div>
          </div>

          <div className="mt-6 mb-4">
            <div
              className=" font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2 flex items-center justify-center cursor-pointer"
              onClick={invokeOrb}
            >
              Invoke
            </div>
          </div>
        </div>
      </section>
      {isLoading && <Loading />}
    </main>
  )
}
