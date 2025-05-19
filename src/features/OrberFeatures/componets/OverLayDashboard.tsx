'use client'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import React, { useState } from 'react'
import { BiCheckShield } from "react-icons/bi";
import { FaRegClock, FaMoneyBills } from "react-icons/fa6";
import Purchase from './Purchase';
import SwearOath from './SwearOath';
import CoolDownPeriod from './CoolDownPeriod';
import SetPrice from './SetPrice';
import { useOrbDetailsStore, useWalletStore } from '@/zustand/Wallet';
import { Account, cairo, CallData, Calldata, Contract, RpcProvider, WalletAccount } from 'starknet';
import { toast } from 'react-toastify';
import { log } from 'console';
import { connect } from 'get-starknet';
import { WALLET_API } from "@starknet-io/types-js";
import Loading from '@/components/Loading';
import { logger } from 'starknet';
import { ProviderUrl } from '@/constant/contract';

interface StarknetWalletProvider extends WALLET_API.StarknetWindowObject {
    enable?: (options?: { starknetVersion?: string }) => Promise<void>;
}

export default function OverLayDashboard({ title }: { title: string }) {
    const [step, setStep] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const { starknetAccount, starknet } = useWalletStore();
    const { address } = useOrbDetailsStore()

    const [content, setContent] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [days, setDays] = useState<number>(0);
    const [cooldownPeriod, setCooldownPeriod] = useState<number>(0);
    const [flaggingperiod, setFlaggingPeriod] = useState<number>(0);
    const [tokenPrice, setTokenPrice] = useState<number>(0);



    const fields = [
        <SwearOath key="swear-oath" title={title} content={content} setContent={setContent} time={time} setTime={setTime} days={days} setDays={setDays} />,
        <CoolDownPeriod key="cooldown-period" cooldownPeriod={cooldownPeriod} setCooldownPeriod={setCooldownPeriod} flaggingperiod={flaggingperiod} setFlaggingPeriod={setFlaggingPeriod} />,
        <SetPrice key="set-price" tokenPrice={tokenPrice} setTokenPrice={setTokenPrice} />,

    ]

    const submitTransaction = async () => {
        setIsLoading(true)
        if (content === '' || time === '' || days === 0 || cooldownPeriod === 0 || flaggingperiod === 0 || tokenPrice === 0) {
            toast.error('All fields are required')
            setIsLoading(false)
            return
        }
        try {
            const currentDate = new Date()

            const dataJson = {
                oathSworn: content,
                privacy: "Private questions and answers allowed, booking allowed",
                Exclusivity: "Keepers can read past Q&A and reveal their own",
                swornDate: currentDate,
                questions: [{
                    "title": `What function does ${title}'s Orb have?`,
                    "content": `Different Orbs have different functions. ${title}'s Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the starknet blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of ${days} days.`
                },
                {
                    "title": "Who is a Keeper?",
                    "content": `Different Orbs have different functions. ${title}'s Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to ${title} and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the starknet blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of ${days} days.`
                },
                {
                    "title": "Who is the Orb for?",
                    "content": "Different Orbs have different  functions. Vincent's Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days."
                },
                {
                    "title": "What's a cooldown?",
                    "content": "Different Orbs have different functions. Vincent's Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days."
                },
                {
                    "title": "I'm still confused. Why am I paying money to hold the Orb!?",
                    "content": "Different Orbs have different functions. Vincent's Orb is a basic Q&A-type Orb. The Keeper (holder) has the right to submit a text-based question to Nic and the right to receive a text-based response. The question is limited to 1000 characters but responses may come in any length. Questions and answers are hash-committed to the Ethereum blockchain so that the track record of how the creator responds cannot be changed. The Orb has a cooldown of 7 days."
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

            const date = new Date(time);
            const epochTime = date.getTime() / 1000;
            const convertedDays = days * 24 * 60 * 60 * 1000;


            const provider = new RpcProvider({ nodeUrl: `${ProviderUrl}` });
            if (address !== null && starknetAccount !== null) {



                const newCooldownPeriod = Number(cooldownPeriod) * 24 * 60 * 60;
                const newFlaggingPeriod = Number(flaggingperiod) * 24 * 60 * 60;


                const decimal: number = 1000000000000000000;
                const price = tokenPrice * decimal
                const epPrice = cairo.uint256(Number(price));



                const epTime = cairo.uint256(epochTime);
                const epDays = cairo.uint256(convertedDays);

                const nwCPeriod = cairo.uint256(newCooldownPeriod);
                const nwFPeriod = cairo.uint256(newFlaggingPeriod);
                // console.log('starknetAccount', starknetAccount);
                // console.log('starknet', starknet);
                if (starknet === null) {
                    toast.error('No wallet connected');
                    return;
                }

                const calls = [
                    // Calling the first contract
                    {
                        contractAddress: address,
                        entrypoint: 'swear_oath',
                        calldata: CallData.compile({
                            oath_hash: dataContent,
                            new_honored_until: epTime,
                            new_response_period: epDays
                        }),
                    },
                    // Calling the second contract
                    {
                        contractAddress: address,
                        entrypoint: 'set_cool_down',
                        calldata: CallData.compile({
                            new_cooldown: nwCPeriod,
                            new_flagging_period: nwFPeriod
                        }),

                    },
                    // Calling the third contract
                    {
                        contractAddress: address,
                        entrypoint: 'set_price',
                        calldata: CallData.compile({
                            price_: epPrice,
                        }),
                    },
                    {
                        contractAddress: address,
                        entrypoint: 'start_orb',
                        calldata: CallData.compile({

                        }),
                    }
                ]
                // await starknet.enable();
                const multiCall = await starknetAccount.execute(calls);

                await provider.waitForTransaction(multiCall.transaction_hash);
                console.log('tx', multiCall);
                toast.success('Orb started successfully');
                setIsLoading(false);
            }

        } catch (error) {
            console.log('error', error);
            toast.error('Error starting orb');
            logger.error('Error message');
            setIsLoading(false);
        }

    }
    return (
        <section className='w-[100%] h-screen  smDesk:h-screen mobile:h-screen bg-[#000000] absolute top-0 left-0 z-[20] '>
            <Navbar title={`${title}'s Orb`} />
            <main className="flex w-[90%] h-[70%]  mx-auto mt-8 smDesktop:mt-4 smDesk:mt-8 relative mobile:flex-col mobile:gap-4">

                <div className="w-[50%] lgDesktop:w-[40%] h-[100%] block mobile:hidden relative rounded-l-[24px]">
                    <Image
                        src="/images/Content.svg"
                        alt="Landing Page"
                        fill
                        objectFit='cover'
                        className='rounded-l-[24px]'

                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-l-[24px] flex justify-center items-center">
                        <div className="w-[194px] h-[156px] ">
                            <div className="flex items-center gap-6">
                                <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center ${step >= 0 ? 'bg-white border-none' : 'border border-black bg-transparent'}`}>
                                    <div className="w-[24px] h-[24px] rounded-full border border-black flex items-center justify-center">

                                        <BiCheckShield className={`${step >= 0 ? 'text-black' : 'text-[#BBBFCC]'}`} size={16} />
                                    </div>

                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[#DDDEE0] text-[12px] font-normal leading-[16px] tracking-[-0.12px]">
                                        Step 1
                                    </p>
                                    <h3 className="text-[#FFFFFF] text-[16px] font-bold leading-[24px] tracking-[0.15px]">
                                        Swear Oath
                                    </h3>
                                </div>
                            </div>
                            <div className='border-r-2 h-[24px] w-[14px] border-[#BBBFCC] text-[24px] font-normal '></div>
                            <div className="flex items-center gap-6">
                                <div className={` w-[28px] h-[28px] rounded-full flex items-center justify-center ${step >= 1 ? 'bg-white border-none' : 'border border-[#BBBFCC] bg-transparent'}`}>
                                    <div className={`w-[24px] h-[24px] rounded-full border border-[#BBBFCC] flex items-center justify-center ${step >= 1 ? 'border-none' : 'border border-[#BBBFCC]'}`}>

                                        <FaRegClock className={`${step === 1 ? 'text-black' : 'text-[#BBBFCC]'}`} size={16} />
                                    </div>

                                </div>

                                <div className="flex flex-col">
                                    <p className="text-[#DDDEE0] text-[12px] font-normal leading-[16px] tracking-[-0.12px]">
                                        Step 2
                                    </p>
                                    <h3 className="text-[#FFFFFF] text-[16px] font-bold leading-[24px] tracking-[0.15px]">
                                        Cooldown period
                                    </h3>
                                </div>
                            </div>
                            <div className='border-r-2 h-[24px] w-[14px] border-[#BBBFCC] text-[24px] font-normal '></div>
                            <div className={`flex items-center gap-6 `}>
                                <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center ${step >= 2 ? 'bg-white border-none' : 'border border-[#BBBFCC] bg-transparent'}`}>
                                    <div className={`w-[24px] h-[24px] rounded-full border border-[#BBBFCC] flex items-center justify-center ${step >= 2 ? 'border-none' : 'border border-[#BBBFCC]'}`}>

                                        <FaMoneyBills className={`${step === 2 ? 'text-black' : 'text-[#BBBFCC]'}`} size={16} />
                                    </div>

                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[#DDDEE0] text-[12px] font-normal leading-[16px] tracking-[-0.12px]">
                                        Step 3
                                    </p>
                                    <h3 className="text-[#FFFFFF] text-[16px] font-bold leading-[24px] tracking-[0.15px]">
                                        Orb Price
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden mobile:flex justify-between w-[90%] mx-auto">
                    <div className={`w-[29%] h-[6px] rounded-full ${step >= 0 ? 'bg-[#99E515]' : 'bg-[#F4F4F4]'}`} ></div>
                    <div className={`w-[29%] h-[6px]  rounded-full ${step >= 1 ? 'bg-[#99E515]' : 'bg-[#F4F4F4]'}`} ></div>
                    <div className={`w-[29%] h-[6px]  rounded-full ${step >= 2 ? 'bg-[#99E515]' : 'bg-[#F4F4F4]'}`} ></div>

                </div>

                <div className="w-[50%] lgDesktop:w-[60%] mobile:w-[100%] mobile:border-[1px] mobile:border-[#F4F4F4] border-[0px] mobile:rounded-[24px]  h-[100%] rounded-r-[24px] overflow-y-scroll no-scrollbar overflow-hidden pb-10 smDesktop:pb-10" style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.12) 100%)' }}>

                    {fields[step]}
                    <div className='flex justify-between w-[56%] lgDesktop:w-[76%] smDesktop:w-[73%] mx-auto font-bold text-[14px] leading-[26px] tracking-[0.46px]   items-center mobile:flex-col mobile:gap-4 mobile:w-[90%]'>
                        <button
                            className={`px-24 w-[70px] smDesktop:px-[70px] smDesk:px-[58px] tablet:px-[48px] py-4 border border-[#FFFFFF] mobile:w-[100%] text-[#FFFFFF] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${step === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FFFFFF] hover:text-black'}`}
                            disabled={step === 0}
                            onClick={() => {
                                if (step > 0) {
                                    setStep(step - 1);
                                }
                            }}
                        >
                            Back
                        </button>
                        <button
                            className='bg-[#99E515] text-black px-24 w-[70px] smDesktop:px-[70px] smDesk:px-[58px] tablet:px-[48px] mobile:w-[100%] py-4 rounded-lg transition-all duration-300 hover:bg-[#7abf12]'
                            onClick={() => {
                                if (step === 0) {
                                    if (content === '' || time === '' || days === 0) {
                                        toast.error('All fields are required');
                                        return;
                                    }
                                    setStep(step + 1);
                                } else if (step === 1) {
                                    if (cooldownPeriod === 0 || flaggingperiod === 0) {
                                        toast.error('cooldown period and flagging period cannot be 0');
                                        return;
                                    }
                                    setStep(step + 1);
                                } else if (step === 2) {
                                    if (tokenPrice === 0) {
                                        toast.error('Orb price cannot be 0');
                                        return;
                                    }
                                    submitTransaction();
                                }
                            }}
                        >
                            {step === 2 ? 'Finish' : 'Next'}
                        </button>
                    </div>

                </div>
            </main>
            {isLoading && <Loading />}
        </section>
    )
}
