import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useCollections from '../../common/redux/hooks/useCollections';
import useNft from '../../common/redux/hooks/useNft';
import { ScreenWrapper } from '../../common/styles';
import { getCollectionImageSrc } from '../../utils';
import { Link, useParams } from 'react-router-dom';
import { CollectionBanner, NftCard } from '@haos-labs/tesserae-utils';
import { CollectionsGridLayout } from '../../common/styles/nftStyles';

const Container = styled(ScreenWrapper)`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    max-width: 1227px;
    width: 100%;
    margin-top: 70px;
`;

const MyCollectionDetail: React.FC = () => {
    const { collectionId } = useParams();
    const { getCollectionById, allCollections } = useCollections();
    const { myNfts } = useNft(collectionId || '');
    const [collection, setCollection] = useState<any>(null);

    useEffect(() => {
        if (collectionId) {
            setCollection(getCollectionById(collectionId));
        }
    }, [collectionId, allCollections]);

    if (!collection) {
        return null;
    }
    console.log('LOGGER myNfts', myNfts);

    return (
        <ScreenWrapper>
            <Container>
                <CollectionBanner
                    collection={collection}
                    bannerSrc={getCollectionImageSrc(collection)}
                    logoSrc="https://i.pinimg.com/280x280_RS/81/a7/ce/81a7ce9d3bc250bd44fae2b7f188c685.jpg"
                />
                <CollectionsGridLayout style={{ marginTop: 25 }}>
                    {myNfts.map((nft: any, index: any) => (
                        <Link
                            to={`./nft/${nft.identifier}`}
                            key={`live-collection-${index}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <NftCard
                                key={`nft-listed-${index}`}
                                imageUrl={nft.url}
                                title={nft.name}
                                subtitle={`By ${collection.shop_name}`}
                                price={Number(nft.listing_price)}
                                wrapperStyle={{ marginRight: 26, marginBottom: 26 }}
                                hoverAnimation
                                largerWidth
                            />
                        </Link>
                    ))}
                </CollectionsGridLayout>
            </Container>
        </ScreenWrapper>
    );
};

export default MyCollectionDetail;
