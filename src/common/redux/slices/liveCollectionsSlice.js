import { createSlice } from '@reduxjs/toolkit';

export const liveCollectionsSlice = createSlice({
    name: 'liveCollections',
    initialState: {
        collections: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setLiveCollections: (state, action) => {
            state.collections = action.payload;
        },
    },
});

export const { setLiveCollections } = liveCollectionsSlice.actions;

export const selectLiveCollections = (state) => state.liveCollections.collections;

export default liveCollectionsSlice.reducer;
