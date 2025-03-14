import { StarknetWindowObject } from 'get-starknet'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'



type WalletState = {
    starknetAccount: StarknetWindowObject | null;
    error: string | null;
    setStarknetAccount: (account: StarknetWindowObject | null) => void;
    setDisconnectAccount: () => void
};

type PriceState = {
    price: string | null,
    setOrbPrice: (price: string) => void;
}

type OrbDetailsData ={
    name: string | null,
    description: string | null,
    image: string | null,
    creator: string | null,
    x_account: string | null,
    farcaster: string | null,
    address: string | null,

    setOrbDetailsData:(name:string, description:string, image:string, creator: string, x_account:string, farcaster:string, address:string) => void;
}

interface Question {
    title: string;
    content: string;
  }
  

type OrbTerms = {
    data: Question[] | null,
    setOrbTerms:(data:Question[]) =>void;

}

export const useWalletStore = create<WalletState>((set) =>
(
    {

        starknetAccount: null,
        error: null,
        setStarknetAccount: (account) => set({
            starknetAccount: account,
            error: null
        }),
        setDisconnectAccount: () => set({
            starknetAccount: null,
            error: null
        }),
    }
)
)

export const useOrbprice = create<PriceState>((set) => (
    { 
        price: null,
        setOrbPrice: (price) =>set({
            price:price,
        })

     }
))

export const useOrbDetailsStore = create<OrbDetailsData>((set)=>({
    name: null,
    description: null,
    image: null,
    creator: null,
    x_account: null,
    farcaster: null,
    address:null,
    setOrbDetailsData:(name:string, description:string, image:string, creator: string, x_account:string, farcaster:string, address:string) => set({
        name,
        description,
        image,
        creator,
        x_account,
        farcaster,
        address,
    })
}))

export const useOrbtermsStore = create<OrbTerms>((set)=>({
data: null,
setOrbTerms: (data:Question[]) => set({
    data
})
}))

export const useMainSectionStore = create<{
  openRespond: boolean;
  contentId: number;
  setOpenRespond: React.Dispatch<React.SetStateAction<boolean>>;
  setContentId: React.Dispatch<React.SetStateAction<number>>;
}>((set) => ({
  openRespond: false,
  contentId: 0,
  setOpenRespond: (value) => set({ openRespond: typeof value === 'function' ? value(false) : value }),
  setContentId: (value) => set({ contentId: typeof value === 'function' ? value(0) : value }),
}));