import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./features/UserSlice";


const Store = configureStore({
     reducer:{
        user:userReducer
     },
    
})

export {Store};
