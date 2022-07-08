import React from 'react';
import styled from 'styled-components';
import useCollections from '../../common/redux/hooks/useCollections';
import { CollectionCard, NftCard, TitleText } from '@haos-labs/tesserae-utils';
import { Link } from 'react-router-dom';
import { getCollectionImageSrc } from '../../utils';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 0 40px;
    margin: 0 -40px;
`;

const CollectionsRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    width: inherit;
    overflow-y: scroll;
    padding: 40px;
    margin: -40px;
`;

const LiveCollectionsList: React.FC = () => {
    const { liveCollections } = useCollections();

    return (
        <Wrapper>
            <TitleText extraCss="margin: 56px 0 49px 0;">Live Collections</TitleText>
            <CollectionsRow>
                {liveCollections.map((collection: any, index: any) => (
                    <Link
                        to={'./collection/' + collection.nft_token_id}
                        key={`live-collection-${index}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <CollectionCard
                            imageUrl={getCollectionImageSrc(collection)}
                            title={collection.token_name}
                            subtitle={`By ${collection.shop_name}`}
                            price={Number(collection.selling_price)}
                            itemsRemaining={
                                Number(collection.amount_of_tokens_total) - Number(collection.minted_indexes_total)
                            }
                            totalItemsCount={Number(collection.amount_of_tokens_total)}
                            wrapperStyle={{ marginRight: 26, minWidth: 325 }}
                            hoverAnimation
                            isLive
                        />
                    </Link>
                ))}
            </CollectionsRow>
        </Wrapper>
    );
};

export default LiveCollectionsList;
