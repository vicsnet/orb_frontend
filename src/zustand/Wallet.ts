import { StarknetWindowObject } from 'get-starknet'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { WALLET_API } from "@starknet-io/types-js";
import { WalletAccount} from 'starknet';

interface StarknetWalletProvider extends WALLET_API.StarknetWindowObject {
}
type WalletState = {
    starknetAccount: WalletAccount | null;
    error: string | null;
    setStarknetAccount: (account: WalletAccount | null) => void;
    setDisconnectAccount: () => void
};

type PriceState = {
    price: string | null,
    setOrbPrice: (price: string) => void;
}

type OrbDetailsData = {
    name: string | null,
    description: string | null,
    image: string | null,
    creator: string | null,
    x_account: string | null,
    farcaster: string | null,
    address: string | null,
    setOrbDetailsData: (data: {
        name: string,
        description: string,
        image: string,
        creator: string,
        x_account: string,
        farcaster: string,
        address: string
    }) => void;
}

interface Question {
    title: string;
    content: string;
  }
  

type OrbTerms = {
    data: Question[] | null,
    setOrbTerms:(data:Question[]) =>void;

}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useOrbprice = create<PriceState>()(
  persist(
    (set) => ({
      price: null,
      setOrbPrice: (price) => set({
        price: price,
      })
    }),
    {
      name: 'orb-price-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const useOrbDetailsStore = create<OrbDetailsData>()(
  persist(
    (set) => ({
      name: null,
      description: null,
      image: null,
      creator: null,
      x_account: null,
      farcaster: null,
      address: null,
      setOrbDetailsData: (data: {
        name: string,
        description: string,
        image: string,
        creator: string,
        x_account: string,
        farcaster: string,
        address: string
      }) => set({
        name: data.name,
        description: data.description,
        image: data.image,
        creator: data.creator,
        x_account: data.x_account,
        farcaster: data.farcaster,
        address: data.address
      }),
    }),
    {
      name: 'orb-details-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        name: state.name,
        description: state.description,
        image: state.image,
        creator: state.creator,
        x_account: state.x_account,
        farcaster: state.farcaster,
        address: state.address
      })
    }
  )
)

export const useOrbtermsStore = create<OrbTerms>()(
  persist(
    (set) => ({
      data: null,
      setOrbTerms: (data:Question[]) => set({
        data
      })
    }),
    {
      name: 'orb-terms-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)



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

export const createLoading = create<{
    loading: boolean;
    setLoading: (value: boolean | ((prev: boolean) => boolean)) => void;
}>((set) => ({
    loading: false,
    setLoading: (value) => set({ loading: typeof value === 'function' ? value(false) : value }),
}))


