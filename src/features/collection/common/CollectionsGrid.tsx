import React from 'react';
import styled from 'styled-components';

import { NftCard, TitleText, SmallBoldText, SmallRegularText, MediumLargeBoldText } from '@haos-labs/tesserae-utils';
import { isCollectionFullyMinted } from '../../../utils';
import { colorTheme } from '../../../constants/colors';
import { useNavigate } from 'react-router-dom';

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

const CollectionsRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    width: inherit;
    overflow-x: scroll;
    overflow: initial;
`;

const PriceContainer = styled.div`
    display: flex;
    flex: 1;
    width: calc(100% - 20px);
    padding: 12px;
    align-items: center;
    justify-content: space-between;
    background-color: ${colorTheme.LIGHT_GREY};
    border-radius: 10px;
`;

const LeftContentWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

const RightContentWrapper = styled(LeftContentWrapper)`
    align-items: flex-end;
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
            <CollectionsRow>
                {collections.map((collection: any, index: any) => (
                    <div onClick={() => goToCollectionDetails(collection)} key={`live-collection-${index}`}>
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
                            hoverAnimation
                            BottomContent={
                                isCollectionFullyMinted(collection) && (
                                    <PriceContainer>
                                        <LeftContentWrapper>
                                            <SmallRegularText color={colorTheme.GREY}>Floor Price</SmallRegularText>
                                            <MediumLargeBoldText color={colorTheme.ORANGE}>2 EGLD</MediumLargeBoldText>
                                        </LeftContentWrapper>
                                        <RightContentWrapper>
                                            <SmallRegularText color={colorTheme.GREY}>Listed</SmallRegularText>
                                            <FlexRow>
                                                <SmallBoldText color={colorTheme.ORANGE}>500</SmallBoldText>
                                                <SmallBoldText color={colorTheme.GREY}>/1000</SmallBoldText>
                                            </FlexRow>
                                        </RightContentWrapper>
                                    </PriceContainer>
                                )
                            }
                        />
                    </div>
                ))}
            </CollectionsRow>
        </Wrapper>
    );
};

export default CollectionsGrid;
