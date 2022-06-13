import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { getAvailableCollections, getLiveCollections } from '../api';
import { selectLiveCollections, setLiveCollections } from '../slices/liveCollectionsSlice';
import { selectAvailableCollections, setAvailableCollections } from '../slices/availableCollectionsSlice';

const useCollections = () => {
    const liveCollections = useSelector(selectLiveCollections);
    const availableCollections = useSelector(selectAvailableCollections);
    const dispatch = useDispatch();
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
    }, [liveCollectionsData]);

    useEffect(() => {
        if (isAvailableCollectionFetchSuccess) {
            dispatch(setAvailableCollections(availableCollectionsData || []));
        }
    }, [liveCollectionsData]);

    return {
        liveCollections,
        availableCollections,
    };
};

export default useCollections;
