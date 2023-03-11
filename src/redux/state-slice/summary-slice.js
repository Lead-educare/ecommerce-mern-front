import {createSlice} from "@reduxjs/toolkit";


export const summarySlice = createSlice({
    name: 'summary',
    initialState: {
      value: []
    },
    reducers: {
        GetAllInfo: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {GetAllInfo} = summarySlice.actions;
export default summarySlice.reducer;