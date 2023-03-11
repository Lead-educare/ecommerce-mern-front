import {createSlice} from "@reduxjs/toolkit";
import {getAuthInfo} from "../../helper/SessionHelper";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        user: ''
    },
    reducers: {
        GetAuthInfo: (state, action)=>{
            state.value.token = getAuthInfo()?.token;
            state.value.user = getAuthInfo()?.user;
        }
    }
});

export const {authInfo} = authSlice.actions;
export default authSlice.reducer;