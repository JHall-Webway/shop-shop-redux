import { configureStore } from '@reduxjs/toolkit';
import { reduxSlice } from './reducers';


export const reduxStore = configureStore({
    reducer: {
        global: reduxSlice.reducer
    }
})