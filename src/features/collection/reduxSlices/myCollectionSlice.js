import { createSlice } from '@reduxjs/toolkit';

export const myCollectionsSlice = createSlice({
    name: 'myCollections',
    initialState: {
        collections: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setMyCollections: (state, action) => {
            state.collections = action.payload;
        },
    },
});

export const { setMyCollections } = myCollectionsSlice.actions;

export const selectMyCollections = (state) => state.myCollections.collections;

export default myCollectionsSlice.reducer;
