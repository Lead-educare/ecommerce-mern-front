import {createSlice} from "@reduxjs/toolkit";
import {addItemOnly, cartaddQuantity, removeCart, updateQuantity} from "../../helper/cartHelper";


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        List: [],
        ListTotal: 0,
        ListLength: 0
    },
    reducers: {
        SetCartList:(state,action)=>{
            state.List = cartaddQuantity(state.List, action.payload)
        },
        SetCartListCount: (state, action)=>{
          state.List =   addItemOnly(state.List, action.payload)
        },
        SetCartUpdateQuntity: (state, action)=>{
            state.List =updateQuantity(state.List, action.payload)
        },
        SetCartRemoveItem:(state,action)=>{
            state.List = removeCart(state.List, action.payload)
        },


    }
})


export  const { SetCartList, SetCartListCount, SetCartUpdateQuntity, SetCartRemoveItem }=cartSlice.actions;
export default  cartSlice.reducer;