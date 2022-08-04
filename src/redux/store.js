import { configureStore } from "@reduxjs/toolkit";
import authorReducer from './AuthorSlice';
import bookReducer from './BookSlice';
import categoryReducer from './CategorySlice';
import appUserReducer from './AppUserSlice';

console.log('store initilized');
const store = configureStore({
    reducer: {
        author: authorReducer,
        category:categoryReducer,
        book: bookReducer,
        appUser: appUserReducer
        // create more reducers for other components 
    }
});

export default store;