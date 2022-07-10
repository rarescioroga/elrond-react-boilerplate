import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks/account';

import { getListedNfts, getNftsByAccountAndAddress } from '../api/nft';
import { selectMyNfts, selectNftById, setMyNfts } from '../slices/myCollectionSlice';
import { selectReFetchData } from '../slices/appConfigSlice';
import { selectListedNftById, selectListedNfts, setListedNfts } from '../slices/availableCollectionsSlice';

const useNft = (collectionId: string, nftId?: string) => {
    const { address } = useGetAccountInfo();
    const dispatch = useDispatch();
    const myNfts = useSelector(selectMyNfts);
    const listedNfts = useSelector(selectListedNfts);
    const reFetchData = useSelector(selectReFetchData);
    const myNftDetails = useSelector((state) => selectNftById(state, nftId));
    const listedNftDetails = useSelector((state) => selectListedNftById(state, nftId));

    const { isSuccess: isListedNftsFetchSuccess, data: listedNftsData } = useQuery(
        ['listedNftsData', collectionId],
        () => getListedNfts(collectionId),
    );

    const { isSuccess: isMyNftsFetchSuccess, data: myNftsData } = useQuery(
        ['myNfts', address, collectionId, reFetchData],
        () => getNftsByAccountAndAddress(address, collectionId),
    );

    const isUserNftOwner = (nft: { listed_by_wallet: string }) => nft.listed_by_wallet !== address;

    useEffect(() => {
        if (isMyNftsFetchSuccess) {
            dispatch(setMyNfts(myNftsData || []));
        }
    }, [myNftsData, isMyNftsFetchSuccess]);

    useEffect(() => {
        if (isListedNftsFetchSuccess) {
            dispatch(setListedNfts(listedNftsData || []));
        }
    }, [isListedNftsFetchSuccess, listedNftsData]);

    return {
        listedNfts,
        myNfts,
        myNftDetails,
        listedNftDetails,
        isUserNftOwner,
    };
};

export default useNft;
