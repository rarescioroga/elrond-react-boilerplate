import React, { useEffect, useState } from 'react';

import anonymousLogo from '../../assets/anonymous-logo.png';
import useCollections from '../../common/redux/hooks/useCollections';
import useNft from '../../common/redux/hooks/useNft';
import { CollectionOrNftDetailContainer, ScreenWrapper } from '../../common/styles';
import { getCollectionImageSrc } from '../../utils';
import { Link, useParams } from 'react-router-dom';
import { CollectionBanner, NftCard } from '@haos-labs/tesserae-utils';
import { CollectionsGridLayout } from '../../common/styles/nftStyles';

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

    return (
        <ScreenWrapper>
            <CollectionOrNftDetailContainer>
                <CollectionBanner
                    collection={collection}
                    bannerSrc={getCollectionImageSrc(collection)}
                    logoSrc={anonymousLogo}
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
            </CollectionOrNftDetailContainer>
        </ScreenWrapper>
    );
};

export default MyCollectionDetail;
