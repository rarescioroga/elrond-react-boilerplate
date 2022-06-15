import { createSlice } from '@reduxjs/toolkit';

export const availableCollectionsSlice = createSlice({
    name: 'availableCollections',
    initialState: {
        collections: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setAvailableCollections: (state, action) => {
            state.collections = action.payload;
        },
    },
});

export const { setAvailableCollections } = availableCollectionsSlice.actions;

export const selectAvailableCollections = (state) => state.availableCollections.collections;

export default availableCollectionsSlice.reducer;
