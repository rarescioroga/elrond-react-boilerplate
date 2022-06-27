import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CollectionDescriptionContainer } from '@haos-labs/tesserae-utils';

import { BaseFlexRow, ScreenWrapper } from '../../common/styles';
import { useParams } from 'react-router-dom';
import useCollections from '../../common/redux/hooks/useCollections';
import { getCollectionImageSrc } from '../../utils';
import useNft from '../../common/redux/hooks/useNft';
import ListNftInput from './components/ListNftInput';

const Container = styled(ScreenWrapper)`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    max-width: 1227px;
    width: 100%;
    margin-top: 70px;
`;

const Image = styled.img`
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
`;

const LeftContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-right: 25px;
`;

const RightContent = styled(LeftContent)`
    flex: 2.43;
    margin-right: 20px;
`;

const NftDetail = () => {
    const { collectionId, nftId } = useParams();
    const { getCollectionById, allCollections } = useCollections();
    const { myNfts, nftDetails } = useNft(collectionId || '', nftId);
    const [collection, setCollection] = useState<any>(null);

    console.log('LOGGER nftId ------------------->> ', nftDetails, myNfts);
    useEffect(() => {
        if (collectionId) {
            setCollection(getCollectionById(collectionId));
        }
    }, [collectionId, allCollections]);

    if (!collection) {
        return null;
    }

    return (
        <ScreenWrapper>
            <Container>
                <BaseFlexRow>
                    <LeftContent>
                        <Image src={nftDetails?.url} />
                    </LeftContent>
                    <RightContent>
                        <CollectionDescriptionContainer
                            title={collection.token_name}
                            subtitle={`By ${collection.shop_name}`}
                            detailsTitle="Benefits"
                            details={collection.description}
                            logoSrc="https://i.pinimg.com/280x280_RS/81/a7/ce/81a7ce9d3bc250bd44fae2b7f188c685.jpg"
                        >
                            <ListNftInput collection={collection} nft={nftDetails} />
                        </CollectionDescriptionContainer>
                    </RightContent>
                </BaseFlexRow>
            </Container>
        </ScreenWrapper>
    );
};

export default NftDetail;
