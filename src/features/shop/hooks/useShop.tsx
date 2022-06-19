import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { getShopDetails } from '../api';
import { selectShopTheme, setShop } from '../../../common/redux/slices/appConfigSlice';

const useShop = (shopName = '') => {
    const dispatch = useDispatch();
    const shopTheme = useSelector(selectShopTheme);

    const { isSuccess: isShopDetailFetchSuccess, data: shopDetailsData } = useQuery(['shopDetails', shopName], () =>
        getShopDetails(shopName),
    );

    const dispatchShop = (shopDetails: any) => {
        dispatch(setShop(shopDetails));
    };

    useEffect(() => {
        if (isShopDetailFetchSuccess && shopName) {
            dispatchShop(shopDetailsData || {});
        }
    }, [isShopDetailFetchSuccess, shopDetailsData]);

    return {
        shopTheme,
        dispatchShop,
    };
};

export default useShop;
