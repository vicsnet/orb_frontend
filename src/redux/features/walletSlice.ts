import { StarknetWindowObject } from "@argent/get-starknet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState={
starknetAccount:StarknetWindowObject | null
}

const initialState ={
    starknetAccount:null
} as InitialState;

export const wallet = createSlice({
    name:"WalletConnect",
    initialState,
    reducers:{
        walletConnect(state, action: PayloadAction<StarknetWindowObject>){
            return{
                starknetAccount: action.payload,
            }
        },
        walletDisConnect(){
            return{
                starknetAccount:null
            }
        }
    }
})

export const {walletConnect, walletDisConnect} = wallet.actions;
export default wallet.reducer;
