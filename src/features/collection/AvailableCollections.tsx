import React from 'react';
import styled from 'styled-components';

import { NftCard, TitleText } from '@haos-labs/tesserae-utils';
import useCollections from './hooks/useCollections';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`;

const CollectionsRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: inherit;
    overflow-x: scroll;
    overflow: initial;
`;

const AvailableCollections: React.FC = () => {
    const { availableCollections } = useCollections();

    return (
        <Wrapper>
            <TitleText extraCss="margin: 56px 0 49px 0;">Available Collections</TitleText>
            <CollectionsRow>
                {availableCollections.map((collection: any, index: any) => (
                    <NftCard
                        key={`live-collection-${index}`}
                        imageUrl={`https://devnet-media.elrond.com/nfts/asset/${collection.image_base_cid}/1.png`}
                        title={collection.token_name}
                        subtitle={`By ${collection.shop_name}`}
                        price={Number(collection.selling_price)}
                        itemsRemaining={
                            Number(collection.amount_of_tokens_total) - Number(collection.minted_indexes_total)
                        }
                        totalItemsCount={Number(collection.amount_of_tokens_total)}
                        wrapperStyle={{ marginRight: 26, marginBottom: 26 }}
                    />
                ))}
            </CollectionsRow>
        </Wrapper>
    );
};

export default AvailableCollections;
