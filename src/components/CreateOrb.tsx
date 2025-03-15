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
// import { StarknetWalletProvider } from "get-starknet"
// import { WalletAccount } from 'starknet';


type OrbHeroProps = {
    setOpenCreateOrb: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CreateOrb({ setOpenCreateOrb }: OrbHeroProps) {
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


                const myWalletAccount = new WalletAccount(
                    { nodeUrl: myFrontendProviderUrl },
                    starknetAccount as any
                );
                const contractCall = new Contract(
                    testAbi,
                    orbPondCA,
                    myWalletAccount
                );

                contractCall.connect(myWalletAccount);
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
                const res = await myWalletAccount.execute(myInvokeCall);
                await provider.waitForTransaction(res.transaction_hash);
                console.log('res', res.transaction_hash);
             
            }
        } catch (error) {
            console.error('error', error);

        }

    }

    const createOrb = async () => {
        setIsLoading(true);
        if(!starknetAccount?.account?.address){
            toast.error('Please connect your wallet');
            setIsLoading(false);
            return;
        }
        if(name === '' || symbol === '' || totalSupply === 0 || description === '' || xAccount === '' || farcaster === '' || creatorName === '' || file === null){
            toast.error('All fields are required');
            setIsLoading(false);
            return;
        }
        if(totalSupply >5){
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

                    uploadDataToContract(firstHalf, secondHalf);
                    toast.success('Orb Created Successfully');
                    setIsLoading(false);
                    setOpenCreateOrb(false);
                }
            }
            

        } catch (error) {
            console.error('error', error);
            toast.error('Error creating Orb');
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
                <Navbar title="Orb Space" setOpenCreateOrb={() => setOpenCreateOrb(false)} openCreateOrb={true} />

                <section className="w-[30%] lgDesktop:w-[40%] smDesktop:w-[45%] smDesk:w-[50%] tabletAir:w-[60%] mobile:w-[90%] mx-auto bg-[#252525] border-[1px] border-[#F4F4F4] rounded-2xl mt-[100px] overflow-y-scroll  no-scrollbar h-[60vh]">
                    <div className=" mx-auto w-[90%] pt-4 pb-4">
                        <div className="flex justify-between">
                            <h2 className="text-[20px] leading-8 text-[#FFFFFF]">
                                Create your Orb
                            </h2>
                            <span className="">
                                <MdClose
                                    size={24}
                                    className="text-[#FFFFFF]"
                                    onClick={() => setOpenCreateOrb(false)}
                                />
                            </span>
                        </div>
                        <div className=" mt-9 items-center bg-[#303033] py-[15px] px-[20px] mx-auto rounded-lg">
                            <input type="text" placeholder="Name" className="w-[100%] bg-transparent focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-2 py-2 text-[#FFFFFF]" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className=" mt-4 items-center bg-[#303033] py-[15px] px-[20px] mx-auto rounded-lg">
                            <input type="text" placeholder="NFT Symbol" className="w-[100%] bg-transparent focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-2 py-2 text-[#FFFFFF]" onChange={(e) => setSymbol(e.target.value)} />
                        </div>
                        <div className=" mt-4 items-center bg-[#303033] py-[15px] px-[20px] mx-auto rounded-lg">
                            <input type="number" placeholder="Total Supply" className="w-[100%] bg-transparent focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-2 py-2 text-[#FFFFFF]" onChange={(e) => setTotalSupply(Number(e.target.value))} />
                        </div>


                        <div className=" mt-4 items-center bg-[#303033] py-[15px] px-[20px] mx-auto rounded-lg">
                            <input type="text" placeholder="ORB Description" className="w-[100%] bg-transparent focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-2 py-2 text-[#FFFFFF]" onChange={(e) => setDescription(e.target.value)} />

                        </div>
                        <div className=" mt-4 items-center bg-[#303033] py-[15px] px-[20px] mx-auto rounded-lg">
                            <input type="text" placeholder="X Account" className="w-[100%] bg-transparent focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-2 py-2 text-[#FFFFFF]" onChange={(e) => setXAccount(e.target.value)} />

                        </div>
                        <div className=" mt-4 items-center bg-[#303033] py-[15px] px-[20px] mx-auto rounded-lg">
                            <input type="text" placeholder="Farcaster Account" className="w-[100%] bg-transparent focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-2 py-2 text-[#FFFFFF]" onChange={(e) => setFarcaster(e.target.value)} />

                        </div>
                        <div className=" mt-4 items-center bg-[#303033] py-[15px] px-[20px] mx-auto rounded-lg">
                            <input type="text" placeholder="Creator name" className="w-[100%] bg-transparent focus:outline-none focus:border-sky-[#99E515] focus:ring-[#99E515] focus:ring-1 px-2 py-2 text-[#FFFFFF]" onChange={(e) => setCreatorName(e.target.value)} />

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
                            <div className="bg-[#303033] py-[15px] px-[20px] rounded-lg border-2 border-dashed border-[#99E515] hover:border-[#7ab811] transition-colors">
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
                </section>
            </div>
            {/* loading */}
            {isLoading && <Loading />}
            
            
        </main>
    );
}
