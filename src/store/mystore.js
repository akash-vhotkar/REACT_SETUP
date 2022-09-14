import {configureStore} from '@reduxjs/toolkit';
import  { usersApi} from './myMutations';
import {setupListeners} from '@reduxjs/toolkit/query';

export const store  = configureStore({
    reducer :{
        [usersApi.reducerPath ] : usersApi.reducer
    },
    middleware  : (getDefaultMiddleware)=>{
        return  getDefaultMiddleware().concat(usersApi.middleware);
        

    }
})


setupListeners(store.dispatch);


