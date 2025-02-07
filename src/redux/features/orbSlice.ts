import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Data {
    name: string,
    description: string,
    image: string,
    creator: string,
    x_account: string,
    farcater: string
}
type InitialState = {
    OrbAccountDetails: Data | null,
    address: string | null,

}

const initialState = {
    OrbAccountDetails: null,
    address: null,

} as InitialState


export const OrbDetails = createSlice({
    name: "OrbAccount",
    initialState,
    reducers: {
        getOrbData(state, action: PayloadAction<{ data: Data, account: string }>) {
            return {
                OrbAccountDetails: action.payload.data,
                address: action.payload.account,

            }
        },


    }
})

export const { getOrbData } = OrbDetails.actions;
export default OrbDetails.reducer;