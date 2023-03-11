import {createSlice} from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        value: []
    },
    reducers: {
        GetProfile: (state, action)=>{
            state.value = action.payload;
        }
    }
});

export const {GetProfile} = profileSlice.actions;
export default profileSlice.reducer;