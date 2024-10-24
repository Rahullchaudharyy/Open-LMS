import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name:"user",
    initialState:[],
    reducers:{
        addUser:(state,action)=>{
            state.push(action.payload)
        }

    }
        
    
})

export const {addUser} = user.actions
export default user.reducer


