import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { getAvailableCollections, getLiveCollections } from '../api';
import { selectLiveCollections, setLiveCollections } from '../reduxSlices/liveCollectionsSlice';
import { selectAvailableCollections, setAvailableCollections } from '../reduxSlices/availableCollectionsSlice';
import useSearchFilter from '../../../redux/useSearchFilter';

const useCollections = () => {
    const { searchFilter } = useSearchFilter();
    const dispatch = useDispatch();
    const liveCollections = useSelector(selectLiveCollections);
    const availableCollections = useSelector(selectAvailableCollections);
    const allCollections = [...liveCollections, ...availableCollections];
    const allFilteredCollections = allCollections.filter(
        (collection) =>
            collection.token_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
            collection.shop_name.toLowerCase().includes(searchFilter.toLowerCase()),
    );

    const { isSuccess: isLiveCollectionFetchSuccess, data: liveCollectionsData } = useQuery(
        'liveCollections',
        getLiveCollections,
    );
    const { isSuccess: isAvailableCollectionFetchSuccess, data: availableCollectionsData } = useQuery(
        'availableCollections',
        getAvailableCollections,
    );

    const getCollectionById = (id: string) => allCollections.find((collection) => collection.nft_token_id === id);

    useEffect(() => {
        if (isLiveCollectionFetchSuccess) {
            dispatch(setLiveCollections(liveCollectionsData || []));
        }
    }, [liveCollectionsData, isLiveCollectionFetchSuccess]);

    useEffect(() => {
        if (isAvailableCollectionFetchSuccess) {
            dispatch(setAvailableCollections(availableCollectionsData || []));
        }
    }, [liveCollectionsData, isAvailableCollectionFetchSuccess]);

    return {
        liveCollections,
        availableCollections,
        allCollections,
        allFilteredCollections,
        getCollectionById,
    };
};

export default useCollections;
