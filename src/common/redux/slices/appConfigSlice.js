import { createSlice } from '@reduxjs/toolkit';

export const appConfigSlice = createSlice({
    name: 'appConfig',
    initialState: {
        searchFilter: '',
        shop: {},
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
    },
});

export const { setFilter, setShop } = appConfigSlice.actions;

export const selectSearchFilter = (state) => state.appConfig.searchFilter;
export const selectShop = (state) => state.appConfig.shop;
export const selectShopTheme = (state) => state.appConfig.shop.theme;

export default appConfigSlice.reducer;
