import React from 'react';
import styled from 'styled-components';
import useCollections from './hooks/useCollections';
import { NftCard, TitleText } from '@haos-labs/tesserae-utils';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '../../routes';

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
    const navigate = useNavigate();

    const goToCollectionDetails = (collection: any) => {
        navigate('./collection/' + collection.nft_token_id);
    };

    return (
        <Wrapper>
            <TitleText extraCss="margin: 56px 0 49px 0;">Live Collections</TitleText>
            <CollectionsRow>
                {liveCollections.map((collection: any, index: any) => (
                    <div onClick={() => goToCollectionDetails(collection)} key={`live-collection-${index}`}>
                        <NftCard
                            imageUrl={`https://devnet-media.elrond.com/nfts/asset/${collection.image_base_cid}/1.png`}
                            title={collection.token_name}
                            subtitle={`By ${collection.shop_name}`}
                            price={Number(collection.selling_price)}
                            itemsRemaining={
                                Number(collection.amount_of_tokens_total) - Number(collection.minted_indexes_total)
                            }
                            totalItemsCount={Number(collection.amount_of_tokens_total)}
                            wrapperStyle={{ marginRight: 26, minWidth: 325 }}
                            hoverAnimation
                        />
                    </div>
                ))}
            </CollectionsRow>
        </Wrapper>
    );
};

export default LiveCollectionsList;
