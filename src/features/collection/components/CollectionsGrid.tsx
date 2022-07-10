import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
    TitleText,
    SmallBoldText,
    SmallRegularText,
    MediumLargeBoldText,
    CollectionPriceContainer,
    CollectionCard,
} from '@haos-labs/tesserae-utils';

import { getCollectionImageSrc, isCollectionFullyMinted } from '../../../utils';
import { colorTheme } from '../../../constants/colors';
import { LeftContentWrapper, RightContentWrapper, CollectionsGridLayout } from '../../../common/styles/nftStyles';

type Props = {
    collections: any[];
    title?: string;
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
`;

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CollectionsGrid: React.FC<Props> = ({ collections, title }) => {
    return (
        <Wrapper>
            {title && <TitleText extraCss="margin: 56px 0 49px 0;">{title}</TitleText>}
            <CollectionsGridLayout>
                {collections.map((collection: any, index: any) => (
                    <Link
                        to={'./collection/' + collection.nft_token_id}
                        key={`collection-${index}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <CollectionCard
                            imageUrl={getCollectionImageSrc(collection)}
                            title={collection.token_name}
                            subtitle={`By ${collection.shop_name}`}
                            price={Number(collection.selling_price)}
                            wrapperStyle={{ marginRight: 26, marginBottom: 26 }}
                            itemsRemaining={
                                Number(collection.amount_of_tokens_total) - Number(collection.minted_indexes_total)
                            }
                            totalItemsCount={Number(collection.amount_of_tokens_total)}
                            hoverAnimation
                            largerWidth
                            isLive={!isCollectionFullyMinted(collection)}
                            BottomContent={
                                isCollectionFullyMinted(collection) && (
                                    <CollectionPriceContainer>
                                        <LeftContentWrapper>
                                            <SmallRegularText color={colorTheme.GREY}>Floor Price</SmallRegularText>
                                            <MediumLargeBoldText color={colorTheme.ORANGE}>
                                                {collection.floor_price} EGLD
                                            </MediumLargeBoldText>
                                        </LeftContentWrapper>
                                        <RightContentWrapper>
                                            <SmallRegularText color={colorTheme.GREY}>Listed</SmallRegularText>
                                            <FlexRow>
                                                <SmallBoldText color={colorTheme.ORANGE}>
                                                    {collection.listed_items}
                                                </SmallBoldText>
                                                <SmallBoldText color={colorTheme.GREY}>
                                                    /{collection.minted_indexes_total}
                                                </SmallBoldText>
                                            </FlexRow>
                                        </RightContentWrapper>
                                    </CollectionPriceContainer>
                                )
                            }
                        />
                    </Link>
                ))}
            </CollectionsGridLayout>
        </Wrapper>
    );
};

export default CollectionsGrid;
