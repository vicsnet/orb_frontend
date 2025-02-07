// import { StarknetWindowObject } from "@argent/get-starknet";
// import { StarknetWindowObject } from "@argent/get-starknet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StarknetWindowObject } from "get-starknet";

type InitialState = {
    starknetAccount: StarknetWindowObject | null,
    error: string | null
}

const initialState = {
    starknetAccount: null,
    error: null
} as InitialState;

export const wallet = createSlice({
    name: "WalletConnect",
    initialState,
    reducers: {
        walletConnect(state, action: PayloadAction<StarknetWindowObject>) {
            return {
                starknetAccount: action.payload,
                error: null
            }
        },
        walletDisConnect() {
            return {
                starknetAccount: null,
                error: null
            }
        }
    }
})

export const { walletConnect, walletDisConnect } = wallet.actions;
export default wallet.reducer;
