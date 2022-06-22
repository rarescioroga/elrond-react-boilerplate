import { createSlice } from '@reduxjs/toolkit';

export const myCollectionsSlice = createSlice({
    name: 'myCollections',
    initialState: {
        collections: [],
        nfts: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setMyCollections: (state, action) => {
            state.collections = action.payload;
        },
        setMyNfts: (state, action) => {
            state.nfts = action.payload;
        },
    },
});

export const { setMyCollections, setMyNfts } = myCollectionsSlice.actions;

export const selectMyCollections = (state) => state.myCollections.collections;
export const selectMyNfts = (state) => state.myCollections.nfts;

export default myCollectionsSlice.reducer;
