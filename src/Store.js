import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./features/UserSlice";
import resourcesReducer from "./Components/Resources";


const Store = configureStore({
     reducer:{
        user:userReducer,
      //   resource:resourcesReducer
          // When I am adding this then its creating a problem in the prop 
     },
    
})

export {Store};
