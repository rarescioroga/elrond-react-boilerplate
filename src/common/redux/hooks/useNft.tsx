import { useQuery } from 'react-query';
import { getListedNfts } from '../api/nft';
import { useEffect, useState } from 'react';

const useNft = (collectionId: string) => {
    const [nftList, setNftList] = useState<any[]>([]);

    const { isSuccess: isListedNftsFetchSuccess, data: listedNftsData } = useQuery(
        ['listedNftsData', collectionId],
        () => getListedNfts(collectionId),
    );

    useEffect(() => {
        if (isListedNftsFetchSuccess) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setNftList(listedNftsData);
        }
    }, [isListedNftsFetchSuccess, listedNftsData]);

    return {
        nftList,
    };
};

export default useNft;
