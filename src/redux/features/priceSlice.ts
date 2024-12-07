import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialState ={
    price: string | null
}
const initialState ={
    price:null,
} as InitialState

export const PriceData  = createSlice({
    name:"PriceOrb",
    initialState,
    reducers:{
        getOrbPrice(state, action:PayloadAction<{ price: string | null }>){
            return{
                price:action.payload.price
            }
        }
    }
})

export const {getOrbPrice} = PriceData.actions;
export default PriceData.reducer;