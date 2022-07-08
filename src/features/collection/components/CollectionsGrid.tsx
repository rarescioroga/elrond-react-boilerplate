import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
    NftCard,
    TitleText,
    SmallBoldText,
    SmallRegularText,
    MediumLargeBoldText,
    CollectionPriceContainer,
} from '@haos-labs/tesserae-utils';

import { isCollectionFullyMinted } from '../../../utils';
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
    const navigate = useNavigate();

    const goToCollectionDetails = (collection: any) => {
        navigate('./collection/' + collection.nft_token_id);
    };

    return (
        <Wrapper>
            {title && <TitleText extraCss="margin: 56px 0 49px 0;">{title}</TitleText>}
            <CollectionsGridLayout>
                {collections.map((collection: any, index: any) => (
                    <div onClick={() => goToCollectionDetails(collection)} key={`live-collection-${index}`}>
                        <NftCard
                            key={`live-collection-${index}`}
                            imageUrl={`https://devnet-media.elrond.com/nfts/asset/${collection.image_base_cid}/1.png`}
                            title={collection.token_name}
                            subtitle={`By ${collection.shop_name}`}
                            price={Number(collection.selling_price)}
                            wrapperStyle={{ marginRight: 26, marginBottom: 26 }}
                            hoverAnimation
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            largerWidth
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
                    </div>
                ))}
            </CollectionsGridLayout>
        </Wrapper>
    );
};

export default CollectionsGrid;
