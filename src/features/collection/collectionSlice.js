import { createSlice } from '@reduxjs/toolkit';

export const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        collections: [],
    },
    reducers: {
        setCollections: (state, action) => {
            state.collections = action.payload;
        },
    },
});

export const { setCollections } = collectionSlice.actions;

export const selectCollections = (state) => state.collection.collections;

export default collectionSlice.reducer;
