import { createSlice, nanoid } from "@reduxjs/toolkit";

const resources = createSlice({
    name:"resources",
    initialState:[],
    reducers:{
        addResource:(state,action)=>{
            state.push({resource:action.payload,id:nanoid})
        }

    }
        
    
})

export const {addResource} = resources.actions
export default resources.reducer


