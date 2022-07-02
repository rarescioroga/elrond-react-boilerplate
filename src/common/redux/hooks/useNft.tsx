import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks/account';

import { getListedNfts, getNftsByAccountAndAddress } from '../api/nft';
import { selectMyNfts, selectNftById, setMyNfts } from '../slices/myCollectionSlice';

const useNft = (collectionId: string, nftId?: string) => {
    const { address } = useGetAccountInfo();
    const dispatch = useDispatch();
    const myNfts = useSelector(selectMyNfts);
    const nftDetails = useSelector((state) => selectNftById(state, nftId));
    const [nftList, setNftList] = useState<any[]>([]);

    const { isSuccess: isListedNftsFetchSuccess, data: listedNftsData } = useQuery(
        ['listedNftsData', collectionId],
        () => getListedNfts(collectionId),
    );

    const { isSuccess: isMyNftsFetchSuccess, data: myNftsData } = useQuery(['myNfts', address, collectionId], () =>
        getNftsByAccountAndAddress(address, collectionId),
    );

    useEffect(() => {
        if (isMyNftsFetchSuccess) {
            dispatch(setMyNfts(myNftsData || []));
        }
    }, [myNftsData, isMyNftsFetchSuccess]);

    useEffect(() => {
        if (isListedNftsFetchSuccess) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setNftList(listedNftsData);
        }
    }, [isListedNftsFetchSuccess, listedNftsData]);

    return {
        nftList,
        myNfts,
        nftDetails,
    };
};

export default useNft;
