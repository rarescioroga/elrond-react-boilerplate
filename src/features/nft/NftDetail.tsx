import React, { useEffect, useState } from 'react';
import { ActionItemButton, NftDetail as NftDetailContainer } from '@haos-labs/tesserae-utils';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks/account';
import { useLocation, useParams } from 'react-router-dom';

import useCollections from '../../common/redux/hooks/useCollections';
import useNft from '../../common/redux/hooks/useNft';
import ListNftInput from './components/ListNftInput';
import useTransactions from '../../common/redux/hooks/useTransactions';
import useShop from '../../common/redux/hooks/useShop';
import { ScreenWrapper, CollectionOrNftDetailContainer } from '../../common/styles';

const NftDetail = () => {
    const { pathname } = useLocation();
    const { address } = useGetAccountInfo();
    const { collectionId, nftId } = useParams();
    const { getCollectionById, allCollections } = useCollections();
    const { myNftDetails, listedNftDetails } = useNft(collectionId || '', nftId);
    const { withdrawNft, buyNft } = useTransactions();
    const [collection, setCollection] = useState<any>(null);
    const { shopTheme } = useShop(collection?.shop_name);
    const isListedByOtherUser = pathname.includes('/listed');
    const nftDetails = isListedByOtherUser ? listedNftDetails : myNftDetails;
    const isListed = nftDetails && nftDetails.listing_price;
    const nftOwner = nftDetails && nftDetails.listed_by_wallet;
    const isUserOwner = nftOwner === address;

    const onWithdrawNft = async () => {
        await withdrawNft(nftDetails);
    };

    const onBuyNft = async () => {
        await buyNft(nftDetails);
    };

    useEffect(() => {
        if (collectionId) {
            setCollection(getCollectionById(collectionId));
        }
    }, [collectionId, allCollections]);

    if (!collection || !nftDetails) {
        return null;
    }

    return (
        <ScreenWrapper>
            <CollectionOrNftDetailContainer>
                <NftDetailContainer
                    collection={collection}
                    nft={nftDetails}
                    imageSrc={nftDetails?.url}
                    logoSrc="https://i.pinimg.com/280x280_RS/81/a7/ce/81a7ce9d3bc250bd44fae2b7f188c685.jpg"
                    onBuyClick={isListed && isListedByOtherUser ? onBuyNft : undefined}
                >
                    {!isListed && <ListNftInput collection={collection} nft={nftDetails} />}
                    {isListed && isUserOwner && (
                        <ActionItemButton
                            label="Listing Price"
                            price={Number(nftDetails.listing_price)}
                            buttonLabel="Cancel Listing"
                            onClick={onWithdrawNft}
                            wrapperStyle={{ marginTop: 40 }}
                            theme={shopTheme}
                        />
                    )}
                </NftDetailContainer>
            </CollectionOrNftDetailContainer>
        </ScreenWrapper>
    );
};

export default NftDetail;
