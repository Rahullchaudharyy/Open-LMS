import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./features/UserSlice";
import resourcesReducer from "./Components/Resources";


const Store = configureStore({
     reducer:{
        user:userReducer,
      //   resource:resourcesReducer
     },
    
})

export {Store};
