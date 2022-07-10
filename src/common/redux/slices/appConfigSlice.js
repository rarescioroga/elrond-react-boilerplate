import { createSlice } from '@reduxjs/toolkit';
import { baseTheme } from '../../../constants/colors';

export const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState: {
        searchFilter: '',
        shop: {
            theme: baseTheme,
        },
        txSessionId: '',
        reFetchData: Date.now(),
    },
    reducers: {
        setFilter: (state, action) => {
            state.searchFilter = action.payload;
        },
        setShop: (state, action) => {
            state.shop = {
                ...action.payload,
                theme: {
                    primary: action.payload?.theme?.primary_color_hex,
                    secondary: action.payload?.theme?.secondary_color_hex,
                },
            };
        },
        setTxSessionId: (state, action) => {
            state.txSessionId = action.payload;
        },
        reFetchData: (state) => {
            state.reFetchData = Date.now();
        },
    },
});

export const { setFilter, setShop, setTxSessionId, reFetchData } = appConfigSlice.actions;

export const selectSearchFilter = (state) => state.appConfig.searchFilter;
export const selectShop = (state) => state.appConfig.shop;
export const selectShopTheme = (state) => state.appConfig.shop.theme;
export const selectTxSessionId = (state) => state.appConfig.txSessionId;
export const selectReFetchData = (state) => state.appConfig.reFetchData;

export default appConfigSlice.reducer;
