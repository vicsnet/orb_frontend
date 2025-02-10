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
import { useOrbDetailsStore, useWalletStore } from "@/zustand/Wallet"

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

    // const starknetAccount2 = useAppSelector(
    //     (state) => state?.walletReducer?.starknetAccount
    // );

    // const contract = useAppSelector((state) => state?.OrbDetailsReducer?.address);
    const { address } = useOrbDetailsStore();

    const [contentData, setContentData] = useState<EMITTED_EVENT[]>([])
    const [respData, setRespData] = useState<EMITTED_EVENT[]>([])
    const [openRespond, setOpenRespond] = useState<boolean>(false)
    const [contentId, setContentId] = useState<number>(0)

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

        console.log('invocList', eventsList.events);



        const uint256Value: Uint256 = { low: eventsList.events[1].data[3], high: eventsList.events[1].data[4] };
        const date = uint256.uint256ToBN(uint256Value);

        const recentDate = epochToTime(Number(date).toString())

        console.log('result2..', recentDate);

        const address2 = eventsList.events[1].data[2]
        console.log('address', address2);

        // const invocIdUint256: Uint256 = { low: eventsList.events[1].data[0], high: eventsList.events[1].data[1], }

        // // const invocId = uint256.uint256ToBN(invocIdUint256)
        // // console.log('invocId', Number(invocId))

        const data = eventsList.events;


        const filteredData = data.filter(item => {
            const originalAddress = padHexAddress(item.keys[1])
            const match = originalAddress === address?.toLowerCase();
            return match;
        });

        console.log('filteredDataaaa', filteredData);
        setContentData(filteredData)

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

        setRespData(filterResponse);
        console.log('filterResponse', filterResponse);






    }

    const LikeContent = async (id: number) => {

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
                const myInvokeCall = contractCall.populate("rate_positive_reponse", [

                    address,
                    cairo.uint256(Number(id)),
                    cairo.uint256(Number(myOrbId)),
                ]);

                const resToken = await myWalletAccount.execute(myInvokeCall);
                await provider.waitForTransaction(resToken.transaction_hash);
                console.log("resToken", resToken.transaction_hash);
            }




        } catch (error) {
            console.error(error);
        }





    }

    const disLikeContent = async (id: number) => {

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
            }




        } catch (error) {
            console.error(error);
        }





    }

    useEffect(() => {
        getInvocation()
    }, [])

    return (
        <div className="relative">

            <div className='w-[40%]'>
                {contentData.map((content, index) => {
                    if (content) {
                        const myByteArray = {
                            data: [content.data[6]],
                            pending_word: content.data[7],
                            pending_word_len: content.data[8]
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
                            <div key={index} className="flex flex-col gap-2 mb-4">
                                <div className="flex gap-2 items-center">
                                    <Image src="/images/Identicon.svg" alt="user" width={40} height={40} />
                                    <p className="text-[14px] font-bold leading-[20px] tracking-[0.1px]">
                                        {address.slice(0, 5)}...{address.slice(-3)}
                                    </p>
                                    <p className="text-[12px] font-normal leading-[20px] tracking-[0.17px] text-[#A1A3A7]">{newDate}</p>
                                </div>
                                <div>
                                    <p className="text-[16px] font-bold tracking-[0.15px] text-[#FFF]">
                                        {result}
                                    </p>
                                </div>
                                <div className="text-[#DDDEE0] font-bold text-[14px] leading-[24px] mt-2">
                                    <a href={`https://sepolia.voyager.online/tx/${trans}`} className='flex gap-[4px]'>
                                        <p>
                                            Tx: {trans.slice(0, 5)}...{trans.slice(-3)}
                                        </p>
                                        <Image src="/images/Group.svg" alt='FAQ' width={16} height={16} className='ease-in transition duration-300 cursor-pointer' />
                                    </a>
                                </div>


                                {respData.map((resp, respIndex) => {
                                    let result22: String;

                                    const hash = resp.transaction_hash;
                                    if (resp.data.length < 10) {
                                        const myByteArray2: ByteArray = {
                                            data: [],
                                            pending_word: resp.data[6],
                                            pending_word_len: Number(resp.data[7])
                                        }
                                        result22 = byteArray.stringFromByteArray(myByteArray2);


                                    }
                                    else {
                                        const myByteArray2: ByteArray = {
                                            data: [resp?.data[6], resp?.data[7]],
                                            pending_word: resp?.data[8],
                                            pending_word_len: Number(resp?.data[9])
                                        }
                                        result22 = byteArray.stringFromByteArray(myByteArray2);

                                    }
                                    const invocIdUint2562: Uint256 = { low: resp.data[0], high: resp.data[1], }


                                    const invocId2 = uint256.uint256ToBN(invocIdUint2562)

                                    const address2 = resp.data[2]
                                    console.log('address2', address2);
                                    if (Number(invocId2) === Number(invocId)) {

                                        const uint256Value2: Uint256 = { low: resp.data[3], high: resp.data[4] };
                                        const date2 = uint256.uint256ToBN(uint256Value2);
                                        const honoredDate2 = new Date(Number(Number(date2) * 1000));
                                        const newDate2 = timeAgo(honoredDate2.toString())


                                        // console.log('result22', result22);

                                        return (
                                            <div key={respIndex} className="mt-[4px] flex flex-col gap-2">
                                                <div className="flex gap-2 items-center">
                                                    <p className="text-[14px] font-bold leading-[20px] tracking-[0.1px]">
                                                        {address2.slice(0, 5)} ... {address2.slice(-3)} Response
                                                    </p>
                                                    <p className="text-[12px] font-normal leading-[20px] tracking-[0.17px] text-[#A1A3A7]"> {newDate2}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[16px] font-bold tracking-[0.15px] text-[#FFF]">

                                                        {result22}
                                                    </p>
                                                </div>
                                                <div className="text-[#DDDEE0] font-bold text-[14px] leading-[24px] mt-2">
                                                    <a href={`https://sepolia.voyager.online/tx/${hash}`} className='flex gap-[4px]'>
                                                        <p>
                                                            Tx: {hash.slice(0, 5)}...{hash.slice(-3)}
                                                        </p>
                                                        <Image src="/images/Group.svg" alt='FAQ' width={16} height={16} className='ease-in transition duration-300 cursor-pointer' />
                                                    </a>
                                                </div>


                                            </div>
                                        )
                                    }

                                }
                                )}

                                <div className=" flex items-center gap-4">

                                    <div className="flex gap-2 items-center cursor-pointer" onClick={() => { setOpenRespond(true); setContentId(Number(invocId)) }}>
                                        <FaComment size={16} className='text-[#DDDEE0] font-bold' />
                                        <p className="text-[#DDDEE0] font-bold text-[14px] leading-[24px]">respond</p>
                                    </div>
                                    <div className='text-[#DDDEE0] font-bold flex gap-2 items-center'>
                                        <div className="">
                                            <AiOutlineLike size={16} onClick={() => LikeContent(Number(invocId))} />
                                        </div>
                                        <div className="">

                                            <AiOutlineDislike size={16} onClick={() => disLikeContent(Number(invocId))} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return <p key={index}>No invocation yet.</p>;
                    }
                })}
            </div>
            {
                openRespond &&
                <RespondQuestion setOpenRespond={setOpenRespond} contentId={contentId} />

            }
        </div>

        // {/* question */}
    )
}
