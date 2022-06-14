import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { getAvailableCollections, getLiveCollections } from '../api';
import { selectLiveCollections, setLiveCollections } from '../slices/liveCollectionsSlice';
import { selectAvailableCollections, setAvailableCollections } from '../slices/availableCollectionsSlice';
import useSearchFilter from '../../../redux/useSearchFilter';

const useCollections = () => {
    const { searchFilter } = useSearchFilter();
    const dispatch = useDispatch();
    const liveCollections = useSelector(selectLiveCollections);
    const availableCollections = useSelector(selectAvailableCollections);
    const allFilteredCollections = [...liveCollections, ...availableCollections].filter(
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
        allFilteredCollections,
    };
};

export default useCollections;
