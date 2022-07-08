import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ScreenWrapper } from '../../common/styles';
import { useNavigate, useParams } from 'react-router-dom';
import useCollections from '../../common/redux/hooks/useCollections';
import useNft from '../../common/redux/hooks/useNft';
import ListNftInput from './components/ListNftInput';
import { ActionItemButton, NftDetail as NftDetailContainer } from '@haos-labs/tesserae-utils';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks/account';
import useTransactions from '../../common/redux/hooks/useTransactions';

const Container = styled(ScreenWrapper)`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    max-width: 1227px;
    width: 100%;
    margin-top: 70px;
`;

const NftDetail = () => {
    const navigate = useNavigate();
    const { address } = useGetAccountInfo();
    const { collectionId, nftId } = useParams();
    const { getCollectionById, allCollections } = useCollections();
    const { myNfts, nftDetails } = useNft(collectionId || '', nftId);
    const { withdrawNft } = useTransactions();
    const [collection, setCollection] = useState<any>(null);
    const isListed = nftDetails && nftDetails.listing_price;
    const nftOwner = nftDetails && nftDetails.listed_by_wallet;
    const isUserOwner = nftOwner === address;

    const onWithdrawNft = async () => {
        await withdrawNft(nftDetails);
        navigate('../..');
    };

    useEffect(() => {
        if (collectionId) {
            setCollection(getCollectionById(collectionId));
        }
    }, [collectionId, allCollections]);

    if (!collection || !nftDetails) {
        return null;
    }
    console.log('LOGGER nftDetails', isUserOwner);

    return (
        <ScreenWrapper>
            <Container>
                <NftDetailContainer
                    collection={collection}
                    nft={nftDetails}
                    imageSrc={nftDetails?.url}
                    logoSrc="https://i.pinimg.com/280x280_RS/81/a7/ce/81a7ce9d3bc250bd44fae2b7f188c685.jpg"
                >
                    {!isListed && <ListNftInput collection={collection} nft={nftDetails} />}
                    {isListed && isUserOwner && (
                        <ActionItemButton
                            label="Listing Price"
                            price={Number(nftDetails.listing_price)}
                            buttonLabel="Cancel Listing"
                            onClick={onWithdrawNft}
                            wrapperStyle={{ marginTop: 40 }}
                        />
                    )}
                </NftDetailContainer>
            </Container>
        </ScreenWrapper>
    );
};

export default NftDetail;
