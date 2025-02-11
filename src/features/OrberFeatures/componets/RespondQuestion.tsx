import { orbInvocRegistryCA } from '@/constant/contract';
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { byteArray, cairo, CallData, Contract, RpcProvider, WalletAccount } from 'starknet';
import { useOrbDetailsStore, useWalletStore } from "@/zustand/Wallet"
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface invokePros {
  // title: string | undefined
  setOpenRespond: React.Dispatch<React.SetStateAction<boolean>>;
  contentId: number
}
export default function RespondQuestion({ setOpenRespond, contentId }: invokePros) {

  const { starknetAccount } = useWalletStore()
  const [content, setContent] = useState<string>('');


  const { address } = useOrbDetailsStore();


  const RespondToInvocation = async () => {
    const myFrontendProviderUrl =
      "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";

    try {
      const ProviderUrl = starknetAccount?.provider.provider.nodeUrl;
      const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
      if (address !== null) {

        const { abi: testAbi } = await provider.getClassAt(address);
        if (testAbi === undefined) {
          throw new Error("no abi.");
        }

        const myOrbContractCall = new Contract(testAbi, address, provider);
        const buyerAddress = starknetAccount?.account.address;
        // const myOrbId = await myOrbContractCall.get_token_owners_id(buyerAddress);

        const { abi: invokeAbi } = await provider.getClassAt(orbInvocRegistryCA);
        // const contentHash = content;
        const contentHash = CallData.compile([byteArray.byteArrayFromString(content)]);
        const myWalletAccount = new WalletAccount(
          { nodeUrl: myFrontendProviderUrl },
          starknetAccount as any
        );
        const contractCall = new Contract(
          invokeAbi,
          orbInvocRegistryCA,
          myWalletAccount
        );

        contractCall.connect(myWalletAccount);
        const myInvokeCall = contractCall.populate("respond", [
          cairo.uint256(Number(contentId)),
          content,
          address,
        ]);

        const resToken = await myWalletAccount.execute(myInvokeCall);
        await provider.waitForTransaction(resToken.transaction_hash);
        console.log("resToken", resToken.transaction_hash);
        const data = resToken.transaction_hash
        return data
      }




    } catch (error) {
      // throw new Error(${error})
      console.error(error);
    }


  }

  const mutation = useMutation({
    mutationFn: (Respond)=>{
      const data = RespondToInvocation()
      return data;
    },
  });

  if (mutation.isSuccess) {
    setOpenRespond(false)
    toast.success(`tx:hash:${mutation.data}`)
  }
  if (mutation.error) {
    toast.error(`${mutation.error}`)
  }

  return (
    <main className='w-[100%] h-screen absolute top-0 backdrop-opacity-5 z-index-[1]'>
      <section className="w-[30%] mx-auto bg-[#252525] border-[1px] border-[#F4F4F4] rounded-2xl mt-[200px]">
        <div className=" mx-auto w-[90%] pt-4 pb-4">
          <div className="flex justify-between">
            <p className=""></p>
            <h2 className="text-[20px] leading-8 text-[#FFFFFF] text-center">
              Respond to Invocation
            </h2>
            <span className="">
              <MdClose
                size={24}
                className=""
                onClick={() => setOpenRespond(false)}
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
              className=" font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2 flex items-center justify-center cursor-pointer "
              onClick={()=>mutation.mutate()}
            >
              {mutation.isPending ? 'Responding ...' : 'Respond'}
              
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
