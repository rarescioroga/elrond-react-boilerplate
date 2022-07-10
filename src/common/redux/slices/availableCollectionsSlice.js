import { createSlice } from '@reduxjs/toolkit';

export const availableCollectionsSlice = createSlice({
    name: 'availableCollections',
    initialState: {
        collections: [],
        listedNfts: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setAvailableCollections: (state, action) => {
            state.collections = action.payload;
        },
        setListedNfts: (state, action) => {
            state.listedNfts = action.payload;
        },
    },
});

export const { setAvailableCollections, setListedNfts } = availableCollectionsSlice.actions;

export const selectAvailableCollections = (state) => state.availableCollections.collections;
export const selectListedNfts = (state) => state.availableCollections.listedNfts;
export const selectListedNftById = (state, nftId) =>
    state.availableCollections.listedNfts.find((nft) => nft.identifier === nftId);

export default availableCollectionsSlice.reducer;
