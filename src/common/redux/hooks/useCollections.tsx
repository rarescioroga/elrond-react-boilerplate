import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks/account';

import { getAvailableCollections, getLiveCollections, getWalletCollections } from '../api/collection';
import { selectLiveCollections, setLiveCollections } from '../slices/liveCollectionsSlice';
import { selectAvailableCollections, setAvailableCollections } from '../slices/availableCollectionsSlice';
import { selectMyCollections, setMyCollections } from '../slices/myCollectionSlice';
import { selectReFetchData } from '../slices/appConfigSlice';
import useSearchFilter from './useSearchFilter';

const useCollections = () => {
    const { searchFilter } = useSearchFilter();
    const { address } = useGetAccountInfo();
    const dispatch = useDispatch();
    const liveCollections = useSelector(selectLiveCollections);
    const availableCollections = useSelector(selectAvailableCollections);
    const myCollections = useSelector(selectMyCollections);
    const reFetchData = useSelector(selectReFetchData);
    const allCollections = [...liveCollections, ...availableCollections];
    const allFilteredCollections = allCollections.filter(
        (collection) =>
            collection.token_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
            collection.shop_name.toLowerCase().includes(searchFilter.toLowerCase()),
    );

    const { isSuccess: isLiveCollectionsFetchSuccess, data: liveCollectionsData } = useQuery(
        ['liveCollections', reFetchData],
        getLiveCollections,
    );
    const { isSuccess: isAvailableCollectionsFetchSuccess, data: availableCollectionsData } = useQuery(
        ['availableCollections', reFetchData],
        getAvailableCollections,
    );
    const { isSuccess: isMyCollectionsFetchSuccess, data: myCollectionsData } = useQuery(
        ['myCollections', reFetchData],
        () => getWalletCollections(address),
    );

    const getCollectionById = (id: string) => allCollections.find((collection) => collection.nft_token_id === id);

    useEffect(() => {
        if (isLiveCollectionsFetchSuccess) {
            dispatch(setLiveCollections(liveCollectionsData || []));
        }
    }, [liveCollectionsData, isLiveCollectionsFetchSuccess]);

    useEffect(() => {
        if (isAvailableCollectionsFetchSuccess) {
            dispatch(setAvailableCollections(availableCollectionsData || []));
        }
    }, [liveCollectionsData, isAvailableCollectionsFetchSuccess]);

    useEffect(() => {
        if (isMyCollectionsFetchSuccess) {
            dispatch(setMyCollections(myCollectionsData || []));
        }
    }, [myCollectionsData, isMyCollectionsFetchSuccess]);

    return {
        liveCollections,
        availableCollections,
        myCollections,
        allCollections,
        allFilteredCollections,
        getCollectionById,
    };
};

export default useCollections;
