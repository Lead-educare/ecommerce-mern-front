import {createSlice} from "@reduxjs/toolkit";
export const orderSlice=createSlice({
    name:'order',
    initialState:{
        List:[],
        FormValue:{
            title:"",
            slug:"",
            description:"",
            price:"",
            category: '',
            quantity: '',
            photo: '',
            _id: ''
        }
    },
    reducers:{
        SetOrderList:(state,action)=>{

            state.List=action.payload
        },
        OnChangeProductInput:(state,action)=>{
            state.FormValue[`${action.payload.Name}`]=action.payload.Value;
        },


    }
})

export const { SetOrderList }=orderSlice.actions;
export default orderSlice.reducer;