import {createSlice} from "@reduxjs/toolkit";

export const taskSlice=createSlice({
    name: 'task',
    initialState: {
        New: [],
        Completed: [],
        Progress: [],
        Canceled: []
    },
    reducers: {
        GetNewTasks: (state, action)=>{
            state.New = action.payload;
        },
        GetProgressTasks: (state, action)=>{
            state.Progress = action.payload;
        },
        GetCompletedTasks: (state, action)=>{
            state.Completed = action.payload;
        },
        GetCanceledTasks: (state, action)=>{
            state.Canceled = action.payload;
        }
    }
});


export const {GetNewTasks, GetProgressTasks, GetCompletedTasks, GetCanceledTasks} = taskSlice.actions;
export default taskSlice.reducer;

