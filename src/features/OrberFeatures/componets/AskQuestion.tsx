import Loading from '@/components/Loading';
import { orbInvocRegistryCA } from '@/constant/contract';
// import { useAppSelector } from '@/redux/store';
import { useOrbDetailsStore, useWalletStore } from '@/zustand/Wallet';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify';
import { byteArray, cairo, CallData, Contract, RpcProvider, WalletAccount } from 'starknet';

// import {StarknetWalletProvider }from 'get-starknet'


interface invokePros {
  title: string | undefined
  setOpenInvoke: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function AskQuestion({ title, setOpenInvoke }: invokePros) {
  const [content, setContent] = useState<string>('');
  const { address } = useOrbDetailsStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { starknetAccount } = useWalletStore()



  const invokeOrb = async () => {
    if(content === ''){
      toast.error('Please enter question');
      return;
    }
    setIsLoading(true);
    const myFrontendProviderUrl =
      "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";

    try {
      // const ProviderUrl = starknetAccount?.provider.provider.nodeUrl;
      const provider = new RpcProvider({ nodeUrl: `${myFrontendProviderUrl}` });
      if (address !== null) {

        const { abi: testAbi } = await provider.getClassAt(address);
        if (testAbi === undefined) {
          throw new Error("no abi.");
        }

        const myOrbContractCall = new Contract(testAbi, address, provider);
        const buyerAddress = starknetAccount?.address;
        const myOrbId = await myOrbContractCall.get_token_owners_id(buyerAddress);

        const { abi: invokeAbi } = await provider.getClassAt(orbInvocRegistryCA);
        // const contentHash = content;
        const contentHash = CallData.compile([byteArray.byteArrayFromString(content)]);
        if (starknetAccount !== null) {

          // const myWalletAccount = new WalletAccount(
          //   { nodeUrl: myFrontendProviderUrl },
          //   starknetAccount as any
          // );
          const contractCall = new Contract(
            invokeAbi,
            orbInvocRegistryCA,
            starknetAccount 
          );

          contractCall.connect(starknetAccount);
          const myInvokeCall = contractCall.populate("invoke_with_hash", [
            content,
            address,
            cairo.uint256(Number(myOrbId)),
          ]);

          const resToken = await starknetAccount.execute(myInvokeCall);
          await provider.waitForTransaction(resToken.transaction_hash);
          console.log("resToken", resToken.transaction_hash);
          toast.success('Invoke successful');
          setIsLoading(false);
          setOpenInvoke(false);

          return resToken.transaction_hash
        }
      }




    } catch (error) {
      console.error(error);
      toast.error('Invoke failed');
      setIsLoading(false);
      return error
    }


  }

//   const mutation = useMutation({
//     mutationFn: (AskQuestion)=>{
//       const data = invokeOrb()
//       return data;
//     }, 
//   });

//   if(mutation.isSuccess){
//     toast.success(`tx:hash:${mutation.data}`)
//   }
//   if(mutation.error){
//   toast.error(`${mutation.error}`)
// }




  return (
    <main className='w-[100%] h-screen absolute top-0 backdrop-blur-sm bg-black/30 z-10 overflow-y-scroll  no-scrollbar'>
      <section className="w-[30%] lgDesktop:w-[40%] smDesktop:w-[45%] smDesk:w-[50%] tabletAir:w-[60%] mobile:w-[90%]  mx-auto bg-[#252525] border-[1px] border-[#F4F4F4] rounded-2xl mt-[200px] lgDesktop:mt-[150px] smDesktop:mt-[100px] smDesk:mt-[50px] tabletAir:mt-[140px] mobile:mt-[50px]">
        <div className=" mx-auto w-[90%] pt-4 pb-4">
          <div className="flex justify-between">
            <p className=""></p>
            <h2 className="text-[20px] leading-8 text-[#FFFFFF] text-center">
              Invoke {title}&apos;s Orb
            </h2>
            <span className="">
              <MdClose
                size={24}
                className=""
                onClick={() => setOpenInvoke(false)}
              />
            </span>
          </div>

          <div className=" mt-9 mb-9 items-center bg-[#303033] py-[15px] px-[20px] mx-auto rounded-lg">
            <div className="">
              <textarea name="" id="" rows={10} className='w-[100%] contrast-more:border-slate-400 bg-transparent focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-2 py-2' onChange={(e) => setContent(e.target.value)}></textarea>
            </div>

          </div>

          <div className="mt-6 mb-4">
            <div
              className=" font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2 flex items-center justify-center cursor-pointer"
              onClick={()=>invokeOrb()}
            >
              Invoke
              
            </div>
          </div>
          <>
         
          </>
        </div>
      </section>
      {isLoading && <Loading   />}
    </main>
  )
}
