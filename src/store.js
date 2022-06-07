import { configureStore } from '@reduxjs/toolkit';
import { collectionSlice } from './features/collection/collectionSlice';

const store = configureStore({
    reducer: {
        collections: collectionSlice,
    },
});

export default store;
