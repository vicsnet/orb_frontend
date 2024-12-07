import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
    title: string;
    content: string;
  }
interface Data{
    data:Question[]
}
type InitialState ={
    orbTerms: Data | null,
}

const initialState= {
    orbTerms:null,
} as InitialState


export const orbTerms = createSlice({
    name:"OrbTerm",
    initialState,
    reducers:{
        getOrbTerms(state, action:PayloadAction<Data>){
            return{
                orbTerms:action.payload,
            }
        }
    }
})

export const {getOrbTerms} =  orbTerms.actions;
export default orbTerms.reducer;
