"use client";
import { epochToTime } from "@/constant/constant";
import { ProviderUrl, tokenAddress } from "@/constant/contract";
// import { useAppSelector } from "@/redux/store";
import { connect, StarknetWindowObject } from "get-starknet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useWalletStore, useOrbprice, useOrbDetailsStore } from "@/zustand/Wallet"
import { orbPondCA } from "@/constant/contract";

import {
    Contract,
    RpcProvider,
    Provider,
    Account,
    WalletAccount,
    cairo,
    // StarknetWalletProvider

} from "starknet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
// import { StarknetWalletProvider } from "get-starknet"
// import { WalletAccount } from 'starknet';


type OrbHeroProps = {
    setOpenCreateOrb: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CreateOrb({ setOpenCreateOrb }: OrbHeroProps) {
    const router = useRouter();

    const [name, setName] = useState<string>('');
    const [symbol, setSymbol] = useState<string>('');
    const [totalSupply, setTotalSupply] = useState<number>(0);
    // const [tokenURI, setTokenURI] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [xAccount, setXAccount] = useState<string>('');
    const [farcaster, setFarcaster] = useState<string>('');
    const [creatorName, setCreatorName] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { starknetAccount } = useWalletStore();


    const { setOrbDetailsData } = useOrbDetailsStore()

    const uploadDataToContract = async (tokenURI1: string, tokenURI2: string) => {
        try {



            const myFrontendProviderUrl =
                "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/k1jbpQgERmFt0PxjkrrbWz56AVfHEQcO";
            const provider = new RpcProvider({ nodeUrl: `${myFrontendProviderUrl}` });

            if (orbPondCA !== null) {

                const { abi: testAbi } = await provider.getClassAt(orbPondCA);
                if (testAbi === undefined) {
                    throw new Error("no abi.");
                }


                // const myWalletAccount = new WalletAccount(
                //     { nodeUrl: myFrontendProviderUrl },
                //     starknetAccount as any
                // );
                if (starknetAccount) {
                    const contractCall = new Contract(
                        testAbi,
                        orbPondCA,
                        starknetAccount
                    );

                    contractCall.connect(starknetAccount);
                    const tokenName = cairo.felt(name);
                    const tokenSymbol = cairo.felt(symbol);
                    const tokenTotalSupply = cairo.uint256(totalSupply);
                    const tokenuri1 = cairo.felt(tokenURI1);
                    const tokenuri2 = cairo.felt(tokenURI2);
                    const myInvokeCall = await contractCall.populate("create_orb", [
                        tokenName,
                        tokenSymbol,
                        tokenuri1,
                        tokenuri2,
                        tokenTotalSupply,
                    ]);
                    const res = await starknetAccount.execute(myInvokeCall);
                    await provider.waitForTransaction(res.transaction_hash);
                    console.log('res', res.transaction_hash);
                    const txReceipt = await provider.getTransactionReceipt(res.transaction_hash);
                    let address;
                    if (txReceipt.isSuccess()) {


                        const events = contractCall.parseEvents(txReceipt);


                        //new
                        const orbCreatedEvent = events.find((event) =>
                            Object.keys(event).includes("orbland::orb_pond::ORB_pond::OrbCreated")
                        );

                        if (orbCreatedEvent) {
                            const eventData = orbCreatedEvent["orbland::orb_pond::ORB_pond::OrbCreated"];


                            const contractDecimal = eventData.contract_address;

                            console.log('contractDecimal', contractDecimal);
                            if (contractDecimal) {
                                const contractHex = "0x" + contractDecimal.toString(16).padStart(64, '0');
                                console.log("✅ Contract Address (Hex):", contractHex);
                                address = contractHex;

                            }
                        }

                        // return orbAddres

                    }


                    return { transactionHash: res.transaction_hash, address };
                }

            }
        } catch (error) {
            console.error('error', error);
            // toast.error('Error creating Orb');
            return { transactionHash: null, address: null };

        }

    }

    const createOrb = async () => {
        setIsLoading(true);
        if (!starknetAccount?.address) {
            toast.error('Please connect your wallet');
            setIsLoading(false);
            return;
        }
        if (name === '') {
            toast.error('Name field required');
            setIsLoading(false);
            return;
        }
        if (symbol === '') {
            toast.error('Symbol field required');
            setIsLoading(false);
            return;
        }
        if (totalSupply === 0) {
            toast.error('Total supply field required');
            setIsLoading(false);
            return;
        }
        if (description === '') {
            toast.error('Description field required');
            setIsLoading(false);
            return;
        }
        if (xAccount === '') {
            toast.error('X account field required');
            setIsLoading(false);
            return;
        }
        if (file === null) {
            toast.error('File field required');
            setIsLoading(false);
            return;
        }
        if (totalSupply > 5) {
            toast.error('Total supply must be less than 5');
            setIsLoading(false);
            return;
        }


        const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYTBjNjg3MS04NGIxLTRlMDgtODg2ZC1iYmU5ODY5ZDQ4OWMiLCJlbWFpbCI6InZpbmNlLmFkZXNhbm1pMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWQ2MGI4MzZiNGI3M2Q3OGU5NmYiLCJzY29wZWRLZXlTZWNyZXQiOiI2N2FjNWNmZTBhODIzYWEyYzA1ZDA5MDNhMDRiZWQ5YjM1MzllMDVkODkxZWMwNTRiYjM2OTBkMDUyMDdjN2NhIiwiZXhwIjoxNzcwMTEyODA3fQ.5zF5vDwlY_RHXz4lkckjovm1xbFxowIbqZvDf69QD0Y";


        try {

            const formData = new FormData();

            if (!file) {
                throw new Error("File is required");
            }
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


            if (response.IpfsHash) {
                const formData = new FormData();
                // const dataContent = response.IpfsHash;
                const data = {
                    name: name,
                    symbol: symbol,
                    totalSupply: totalSupply,
                    description: description,
                    x_account: xAccount,
                    farcaster: farcaster,
                    creator: creatorName,
                    image: `https://emerald-big-beaver-890.mypinata.cloud/ipfs/${response.IpfsHash}`,
                }
                const jsonData = JSON.stringify(data);
                const Myfile = new File([jsonData], `${name}FullData.json`, { type: "application/json" });
                formData.append("file", Myfile);

                const request = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
                    method: "POST",
                    headers: {

                        Authorization: `Bearer ${JWT}`,
                    },
                    body: formData,

                });
                const Dataresponse = await request.json();
                console.log('Dataresp...', Dataresponse.IpfsHash);
                if (Dataresponse.IpfsHash) {
                    const ipfsHash = Dataresponse.IpfsHash;
                    const halfLength = Math.floor(ipfsHash.length / 2);
                    const firstHalf = ipfsHash.slice(0, halfLength);
                    const secondHalf = ipfsHash.slice(halfLength);

                    const result = await uploadDataToContract(firstHalf, secondHalf);
                    console.log('result', result);

                    if (result?.transactionHash !== null) {
                        setOrbDetailsData({
                            name: data.name,
                            description: data.description,
                            image: data.image,
                            creator: data.creator,
                            x_account: data.x_account,
                            farcaster: data.farcaster,
                            address: result?.address || ''
                        })

                        toast.success('Orb Created Successfully');
                        setIsLoading(false);
                       router.push(`/${result?.address}?orb=${data.name}`);
                        // setOpenCreateOrb(false);

                    }
                    if (result?.transactionHash === null) {
                        toast.error('Error creating Orb');
                        setIsLoading(false);
                    }
                }
            }



        } catch (error) {
            console.error('error', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            toast.error(`Error creating Orb: ${errorMessage}`);
            setIsLoading(false);
        }


    }

    // const mutation = useMutation({
    //     mutationFn: (OrbCreation) => {
    //         const data = createOrb()
    //         return data;
    //     },
    // });



    return (
        <main className="w-[100%] h-screen overflow-hidden absolute top-0 backdrop-opacity-5">

            <div className="w-[100%] h-screen bg-[#000000]">
                <Navbar title="Orb Space" />

                <section className="w-[30%] lgDesktop:w-[40%] smDesktop:w-[45%] smDesk:w-[50%] tabletAir:w-[60%] mobile:w-[90%] mx-auto bg-[#252525] border-[1px] border-[#F4F4F4] rounded-2xl mt-[100px] overflow-y-hidden  no-scrollbar h-[62vh] ">
                    <div className=" mx-auto w-[90%] pt-4 pb-4">
                        <div className="flex justify-between items-center pb-4">
                            <h2 className="text-[24px] leading-[133%] font-bold text-[#FFFFFF] whitespace-nowrap">
                                Create your Orb
                            </h2>
                            <span className="">
                                <MdClose
                                    size={24}
                                    className="text-[#FFFFFF] cursor-pointer"
                                    onClick={() => setOpenCreateOrb(false)}
                                />
                            </span>
                        </div>
                        <div className="h-[55vh] overflow-y-scroll no-scrollbar noto-sans">
                            <div className=" mt-9 flex flex-col gap-2 px-4">
                                <label htmlFor="name" className="text-[#FFFFFF] text-[16px] leading-[24px] font-bold ">Orb Name <span className="text-[#E62E2E] text-[16px] leading-[24px] font-bold">*</span></label>
                                <input type="text" placeholder="Enter preferred name for your Orb" className="w-[100%]  bg-[#303033] rounded focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-4 py-4 text-[#FFFFFF]" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className=" mt-4 flex flex-col gap-2 px-4">
                                <label htmlFor="name" className="text-[#FFFFFF] text-[16px] leading-[24px] font-bold ">NFT Symbol <span className="text-[#E62E2E] text-[16px] leading-[24px] font-bold">*</span></label>
                                <input type="text" placeholder="E.g ETH for Ethereum" className="w-[100%]  bg-[#303033] rounded focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-4 py-4 text-[#FFFFFF]" onChange={(e) => setSymbol(e.target.value)} />
                            </div>
                            <div className=" mt-4 flex flex-col gap-2 px-4">
                                <label htmlFor="name" className="text-[#FFFFFF] text-[16px] leading-[24px] font-bold ">Total Supply <span className="text-[#E62E2E] text-[16px] leading-[24px] font-bold">*</span></label>
                                <input type="number" placeholder="Enter number of orb to be available" className="w-[100%]  bg-[#303033] rounded focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-4 py-4 text-[#FFFFFF]" onChange={(e) => setTotalSupply(Number(e.target.value))} />
                                <p className="text-[#9EA2B3] text-[14px] leading-[20px] font-normal ">Maximum of 5</p>
                            </div>


                            <div className=" mt-4 flex flex-col gap-2 px-4">
                                <label htmlFor="name" className="text-[#FFFFFF] text-[16px] leading-[24px] font-bold ">ORB Description <span className="text-[#E62E2E] text-[16px] leading-[24px] font-bold">*</span></label>
                                <textarea
                                    placeholder="Enter what your Orb is about and what it can do"
                                    className="w-[100%] bg-[#303033] rounded focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-4 py-4 text-[#FFFFFF] min-h-[100px] resize-y"
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                            </div>
                            <div className=" mt-4 flex flex-col gap-2 px-4">
                                <label htmlFor="name" className="text-[#FFFFFF] text-[16px] leading-[24px] font-bold ">X Account <span className="text-[#E62E2E] text-[16px] leading-[24px] font-bold">*</span></label>
                                <input type="text" placeholder="Enter your X (fomerly twitter) handle" className="w-[100%] bg-[#303033] rounded focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-4 py-4 text-[#FFFFFF]" onChange={(e) => setXAccount(e.target.value)} />

                            </div>
                            <div className=" mt-4 flex flex-col gap-2 px-4">
                                <label htmlFor="name" className="text-[#FFFFFF] text-[16px] leading-[24px] font-bold ">Farcaster Account (optional) </label>
                                <input type="text" placeholder="Enter your Farcaster username" className="w-[100%] bg-[#303033] rounded focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-4 py-4 text-[#FFFFFF]" onChange={(e) => setFarcaster(e.target.value)} />

                            </div>
                            <div className=" mt-4 flex flex-col gap-2 px-4">
                                <label htmlFor="name" className="text-[#FFFFFF] text-[16px] leading-[24px] font-bold ">Creator Name <span className="text-[#E62E2E] text-[16px] leading-[24px] font-bold">*</span></label>
                                <input type="text" placeholder="Enter your nickname" className="w-[100%] bg-[#303033] rounded focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-4 py-4 text-[#FFFFFF]" onChange={(e) => setCreatorName(e.target.value)} />

                            </div>
                            <div className="mt-4 relative">
                                <input
                                    type="file"
                                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setFile(e.target.files[0])
                                        }
                                    }}
                                />
                                <div className="bg-[#303033]  mx-4 py-[15px] px-[40px] rounded border-2 border-dashed border-[#99E515] hover:border-[#7ab811] transition-colors">
                                    <div className="flex items-center justify-center flex-col">
                                        <svg className="w-8 h-8 mb-2 text-[#99E515]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        {file ? (
                                            <p className="text-sm text-[#FFFFFF]">
                                                <span className="font-semibold">{file.name}</span>
                                            </p>
                                        ) : (
                                            <>
                                                <p className="text-sm text-[#FFFFFF]">
                                                    <span className="font-semibold">Click to upload Orb Image</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    PNG, JPG, GIF up to 10MB
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>



                            <div className="mt-9 mb-4 ">


                                <div
                                    className=" font-bold leading-7 tracking-[0.46px] text-[rgb(18,19,18)] text-[14px] bg-[#99E515] rounded-md p-2 flex items-center justify-center cursor-pointer"
                                    onClick={() => createOrb()}
                                >

                                    Create Orb
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* loading */}
            {isLoading && <Loading />}


        </main>
    );
}
