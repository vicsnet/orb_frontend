"use client"
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import walletReducer from "./features/walletSlice";
import OrbDetailsReducer from "./features/orbSlice";
import orbTermsReducer from "./features/termsSlice";
import PriceDataReducer from './features/priceSlice';

export const store = configureStore({
    reducer: {
        walletReducer,
        OrbDetailsReducer,
        orbTermsReducer,
        PriceDataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;