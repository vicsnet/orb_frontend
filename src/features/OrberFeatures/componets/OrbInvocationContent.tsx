"use client"
import { epochToTime, padHexAddress, timeAgo } from '@/constant/constant';
import { orbInvocRegistryCA } from '@/constant/contract';
// import { useAppSelector } from '@/redux/store';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaComment } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { ByteArray, byteArray, cairo, Contract, hash, num, RpcProvider, uint256, Uint256, WalletAccount, } from 'starknet';
import RespondQuestion from './RespondQuestion';
// import {StarknetWalletProvider} from 'get-starknet'
import { createLoading, useMainSectionStore, useOrbDetailsStore, useWalletStore } from "@/zustand/Wallet"
import { useQuery } from '@tanstack/react-query';
import { TbArrowAutofitContent } from "react-icons/tb";
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';


interface EMITTED_EVENT {
    // blockHash: string;
    // blockNumber: number;
    data: string[];
    // fromAddress: string;
    // keys: string[];
    transaction_hash: string;
}
export default function OrbInvocationContent() {
    const { starknetAccount } = useWalletStore()
   const { setOpenRespond, setContentId } = useMainSectionStore();
   const { setLoading } = createLoading();
   

    // const starknetAccount2 = useAppSelector(
    //     (state) => state?.walletReducer?.starknetAccount
    // );

    // const contract = useAppSelector((state) => state?.OrbDetailsReducer?.address);
    const { address } = useOrbDetailsStore();
   
    

    // const [contentData, setContentData] = useState<EMITTED_EVENT[]>([])
    // const [respData, setRespData] = useState<EMITTED_EVENT[]>([])
   

    const getInvocation = async () => {
        const myFrontendProviderUrl =
            "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";
        const provider = new RpcProvider({ nodeUrl: `${myFrontendProviderUrl}` });

        const lastBlock = await provider.getBlock('latest');
        const keyFilter = [[num.toHex(hash.starknetKeccak('Invocation')), '0x8'],];
        const addr = orbInvocRegistryCA as string;
        const eventsList = await provider.getEvents({
            address: addr,
            //   from_block: { block_number: lastBlock.block_number - 9 },
            to_block: { block_number: lastBlock.block_number },
            keys: keyFilter,
            chunk_size: 10,
        });

       
        // const uint256Value: Uint256 = { low: eventsList.events[0].data[0], high: eventsList.events[0].data[1] };
        // const result = uint256.uint256ToBN(uint256Value);

        // console.log('invocList', eventsList.events);
        // console.log('invocListData', eventsList.events[0].data);



        const uint256Value: Uint256 = { low: eventsList.events[0]?.data[3], high: eventsList.events[0]?.data[4] };
        const date = uint256.uint256ToBN(uint256Value);

        const recentDate = epochToTime(Number(date).toString())

        // console.log('result2..', recentDate);

        const address2 = eventsList.events[0].data[2]
        // console.log('address', address2);

        // const invocIdUint256: Uint256 = { low: eventsList.events[1].data[0], high: eventsList.events[1].data[1], }

        // // const invocId = uint256.uint256ToBN(invocIdUint256)
        // // console.log('invocId', Number(invocId))

        const data = eventsList.events;


        const filteredData = data.filter(item => {
            const originalAddress = padHexAddress(item.keys[1])
            const match = originalAddress === address?.toLowerCase();
            return match;
        });

        // console.log('filteredDataaaa', filteredData);
        // setContentData(filteredData)

        const ResponseFilter = [[num.toHex(hash.starknetKeccak('Response')), '0x8'],];

        const ResponseList = await provider.getEvents({
            address: addr,
            //   from_block: { block_number: lastBlock.block_number - 9 },
            to_block: { block_number: lastBlock.block_number },
            keys: ResponseFilter,
            chunk_size: 10,
        });

        console.log('ResponseListEvent', ResponseList.events);

        const responseData = ResponseList.events

        const filterResponse = responseData.filter(item => {
            const originalAddress = padHexAddress(item.keys[1])
            const match = originalAddress === address?.toLowerCase();

            const invocIdUint2562: Uint256 = { low: item.data[0], high: item.data[1], }

            const invocId2 = uint256.uint256ToBN(invocIdUint2562)
            console.log('invocId2', Number(invocId2))

            // return 1 === Number(invocId2) && match;
           
            
            return match;
        });

        // setRespData(filterResponse);

        

        console.log('filterResponse', filterResponse);
        return ({ contentData: filteredData, respData: filterResponse })






    }

    const LikeContent = async (id: number) => {
        setLoading(true);
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
                const buyerAddress = starknetAccount?.account.address;
                const myOrbId = await myOrbContractCall.get_token_owners_id(buyerAddress);
                console.log('myOrbId', myOrbId);
                

                const { abi: invokeAbi } = await provider.getClassAt(orbInvocRegistryCA);

                if (testAbi === undefined) {
                    toast.error("no abi.");
                    return;
                    
                }

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
                const myInvokeCall = contractCall.populate("rate_positive_reponse", [
                    address,
                    cairo.uint256(Number(id)),
                    cairo.uint256(Number(myOrbId)),
                ]);

                const resToken = await myWalletAccount.execute(myInvokeCall);
                await provider.waitForTransaction(resToken.transaction_hash);
                console.log("resToken", resToken.transaction_hash);
                const resTokenHash = resToken.transaction_hash;
                if(resTokenHash){
                    toast.success('Liked Successfully');
                    setLoading(false);
                    return resTokenHash;
                }
            }




        } catch (error) {
            console.error("like error", error);
            toast.error('Error Occured');
            setLoading(false);
        }





    }

    const disLikeContent = async (id: number) => {
        setLoading(true);
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
                const buyerAddress = starknetAccount?.account.address;
                const myOrbId = await myOrbContractCall.get_token_owners_id(buyerAddress);

                const { abi: invokeAbi } = await provider.getClassAt(orbInvocRegistryCA);


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
                const myInvokeCall = contractCall.populate("flag_response", [
                    address,
                    cairo.uint256(Number(id)),
                    cairo.uint256(Number(myOrbId)),
                ]);

                const resToken = await myWalletAccount.execute(myInvokeCall);
                await provider.waitForTransaction(resToken.transaction_hash);
                console.log("resToken", resToken.transaction_hash);
                const resTokenHash = resToken.transaction_hash;
                if(resTokenHash){
                    toast.success('Disliked Successfully');
                    setLoading(false);
                    return resTokenHash;
                }
            }


        } catch (error) {
            console.error(error);
            toast.error('Error Occured');
            setLoading(false);
        }





    }

    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: ['FetchInvocation'],
        queryFn: async () => {
            const data = await getInvocation()
            return data
        },
        refetchInterval: 5000, // Refetch every 5 seconds
        refetchOnWindowFocus: true, // Refetch when window regains focus
        refetchOnMount: true, // Refetch when component mounts
        refetchOnReconnect: true // Refetch when reconnecting
      })

    // console.log('invocation data', data);
   

    useEffect(() => {
        // refetch()
    }, [])

    return (
        <div className="relative">
            {isPending && (
                <div className="flex flex-col justify-center items-center w-[500px] h-[300px] mx-auto mt-2 rounded-lg mobile:w-[300px] mobile:h-[200px] mobile:mt-10" style={{ background: 'linear-gradient(111deg, rgba(255, 255, 255, 0.16) -1.65%, rgba(255, 255, 255, 0.12) 100%)' }}>
                    <p className="text-[16px] font-bold tracking-[0.15px] text-gray-400 italic mt-4">
                        Loading invocations...
                    </p>
                </div>
            )}

            {!isPending && (!data?.contentData || data.contentData.length === 0) && (
                <div className="flex flex-col justify-center items-center w-[500px] h-[300px] mx-auto mt-2 rounded-lg mobile:w-[300px] mobile:h-[200px] mobile:mt-10" style={{ background: 'linear-gradient(111deg, rgba(255, 255, 255, 0.16) -1.65%, rgba(255, 255, 255, 0.12) 100%)' }}>
                    <TbArrowAutofitContent className='text-[#99E515] text-[120px] font-bold tracking-[0.15px] mobile:text-[60px]' />
                    <p className='text-center text-[20px] font-bold leading-[28px] tracking-[0.15px] text-[#99E515] mt-6 mobile:text-[16px]'>
                        No Invocations Yet
                    </p>
                    <p className='text-center text-[16px] leading-[24px] tracking-[0.15px] text-[#A1A3A7] mt-2 w-[80%] mobile:text-[14px]'>
                        This Orb hasn&#39;t received any invocations. Be the first to invoke it!
                    </p>
                </div>
            )}

            {!isPending && data?.contentData && data.contentData.length > 0 && (
                <div className='w-[40%] lgDesktop:w-[50%] smDesktop:w-[65%] tabletAir:w-[80%] mobile:w-[100%]'>
                    {data.contentData.map((content, index) => {
                        if (content) {
                            const myByteArray = {
                                data: content.data.slice(6, content.data.length - 1),
                                pending_word: 0,
                                pending_word_len: content.data.slice(6, content.data.length - 1).length
                            };
                           
                            const result = byteArray.stringFromByteArray(myByteArray);
    
                            const uint256Value = { low: content.data[3], high: content.data[4] };
                            const date = uint256.uint256ToBN(uint256Value);
                            const honoredDate = new Date(Number(date) * 1000);
                            const newDate = timeAgo(honoredDate.toString());
    
                            const address = content.data[2];
                            const trans = content.transaction_hash;
    
                            const invocIdUint256 = { low: content.data[0], high: content.data[1] };
                            const invocId = uint256.uint256ToBN(invocIdUint256);
    
                            return (
                                <div key={index} className="p-6 mb-6 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] transition-all duration-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Image 
                                            src="/images/Identicon.svg" 
                                            alt="user" 
                                            width={40} 
                                            height={40}
                                            className="rounded-full" 
                                        />
                                        <div>
                                            <p className="text-[14px] font-medium text-white">
                                                {address.slice(0, 5)}...{address.slice(-3)}
                                            </p>
                                            <p className="text-[12px] text-[#A1A3A7]">{newDate}</p>
                                        </div>
                                    </div>
    
                                    <div className="mb-4">
                                        <p className="text-[16px] font-medium text-white leading-relaxed text-justify mobile:text-[14px] mobile:leading-relaxed">
                                            {result}
                                        </p>
                                    </div>
    
                                    <div className="mb-4">
                                        <a 
                                            href={`https://sepolia.voyager.online/tx/${trans}`} 
                                            className="inline-flex items-center gap-2 text-[14px] text-[#DDDEE0] hover:text-[#99E515] transition-colors"
                                        >
                                            <span>Tx: {trans.slice(0, 5)}...{trans.slice(-3)}</span>
                                            <Image src="/images/Group.svg" alt='External link' width={16} height={16} />
                                        </a>
                                    </div>
    
                                    {/* Responses section */}
                                    <div className="space-y-4 mb-4">
                                        {data.respData.map((resp, respIndex) => {
                                            let result22: String;
    
                                            const hash = resp.transaction_hash;
                                            
                                                const myByteArray2: ByteArray = {
                                                    data: resp.data.slice(6, resp.data.length - 1),
                                                    pending_word: 0,
                                                    pending_word_len: resp.data.slice(6, resp.data.length - 1).length
                                                }
                                            
                                                result22 = byteArray.stringFromByteArray(myByteArray2);
                                            
    
                                            const invocIdUint2562: Uint256 = { low: resp.data[0], high: resp.data[1] }
                                            const invocId2 = uint256.uint256ToBN(invocIdUint2562)
                                            const address2 = resp.data[2]
    
                                            if (Number(invocId2) === Number(invocId)) {
                                                const uint256Value2: Uint256 = { low: resp.data[3], high: resp.data[4] };
                                                const date2 = uint256.uint256ToBN(uint256Value2);
                                                const honoredDate2 = new Date(Number(Number(date2) * 1000));
                                                const newDate2 = timeAgo(honoredDate2.toString())
    
                                                return (
                                                    <div key={respIndex} className="pl-4 border-l-2 border-[#99E515]">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <p className="text-[14px] font-medium text-[#99E515]">
                                                                {address2.slice(0, 5)}...{address2.slice(-3)} Response
                                                            </p>
                                                            <p className="text-[12px] text-[#A1A3A7]">{newDate2}</p>
                                                        </div>
                                                        
                                                        <p className="text-[15px] text-white mb-2 text-justify mobile:text-[13px] mobile:leading-relaxed">{result22}</p>
                                                        
                                                        <a 
                                                            href={`https://sepolia.voyager.online/tx/${hash}`} 
                                                            className="inline-flex items-center gap-2 text-[13px] text-[#DDDEE0] hover:text-[#99E515] transition-colors"
                                                        >
                                                            <span>Tx: {hash.slice(0, 5)}...{hash.slice(-3)}</span>
                                                            <Image src="/images/Group.svg" alt='External link' width={14} height={14} />
                                                        </a>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
    
                                    <div className="flex items-center justify-between px-2 py-3 border-t border-[#2C2D30] mt-4">
                                        <button 
                                            onClick={() => { 
                                                setOpenRespond(true); 
                                                setContentId(Number(invocId));
                                            }}
                                            disabled={data.respData.some(resp => Number(uint256.uint256ToBN({ low: resp.data[0], high: resp.data[1] })) === Number(invocId))}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                                                data.respData.some(resp => Number(uint256.uint256ToBN({ low: resp.data[0], high: resp.data[1] })) === Number(invocId))
                                                ? 'bg-[#1C1D1F]/50 text-[#DDDEE0]/50 cursor-not-allowed'
                                                : 'bg-[#1C1D1F] text-[#DDDEE0] hover:text-[#99E515] hover:bg-[#232427] transition-all'
                                            }`}
                                        >
                                            <FaComment size={14} />
                                            <span className="text-[13px] font-medium">Respond</span>
                                        </button>
    
                                        {data.respData.some(resp => Number(uint256.uint256ToBN({ low: resp.data[0], high: resp.data[1] })) === Number(invocId)) && (
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => LikeContent(Number(invocId))}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1D1F] text-[#DDDEE0] hover:text-[#99E515] hover:bg-[#232427] transition-all"
                                                >
                                                    <AiOutlineLike size={16} />
                                                    <span className="text-[13px] font-medium">Like</span>
                                                </button>
                                                <button
                                                    onClick={() => disLikeContent(Number(invocId))}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1D1F] text-[#DDDEE0] hover:text-[#99E515] hover:bg-[#232427] transition-all"
                                                >
                                                    <AiOutlineDislike size={16} />
                                                    <span className="text-[13px] font-medium">Dislike</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </div>

        // {/* question */}
    )
}
