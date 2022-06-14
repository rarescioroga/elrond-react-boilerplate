import { createSlice } from '@reduxjs/toolkit';

export const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState: {
        searchFilter: '',
    },
    reducers: {
        setFilter: (state, action) => {
            state.searchFilter = action.payload;
        },
    },
});

export const { setFilter } = appConfigSlice.actions;

export const selectSearchFilter = (state) => state.appConfig.searchFilter;

export default appConfigSlice.reducer;
