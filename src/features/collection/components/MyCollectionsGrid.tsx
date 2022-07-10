import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
    TitleText,
    SmallRegularText,
    MediumLargeBoldText,
    CollectionPriceContainer,
    CollectionCard,
} from '@haos-labs/tesserae-utils';

import { colorTheme } from '../../../constants/colors';
import { LeftContentWrapper } from '../../../common/styles/nftStyles';

type Props = {
    collections: any[];
    title?: string;
    isMyCollection?: boolean;
};

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

const MyCollectionsGrid: React.FC<Props> = ({ collections, title, isMyCollection }) => {
    const navigate = useNavigate();

    const goToCollectionDetails = (collection: any) => {
        navigate(`/${isMyCollection ? 'my-collections' : 'collection'}/` + collection.nft_token_id);
    };

    return (
        <Wrapper>
            {title && <TitleText extraCss="margin: 56px 0 49px 0;">{title}</TitleText>}
            <CollectionsRow>
                {collections.map((collection: any, index: any) => (
                    <div onClick={() => goToCollectionDetails(collection)} key={`live-collection-${index}`}>
                        <CollectionCard
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
                            hoverAnimation
                            BottomContent={
                                <CollectionPriceContainer>
                                    <LeftContentWrapper>
                                        <SmallRegularText color={colorTheme.GREY}>Owned</SmallRegularText>
                                        <MediumLargeBoldText color={colorTheme.ORANGE}>
                                            {collection.ownedItems} items
                                        </MediumLargeBoldText>
                                    </LeftContentWrapper>
                                </CollectionPriceContainer>
                            }
                        />
                    </div>
                ))}
            </CollectionsRow>
        </Wrapper>
    );
};

export default MyCollectionsGrid;
