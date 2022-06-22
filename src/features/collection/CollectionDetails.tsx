import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
    CollectionDescriptionContainer,
    MainButton,
    MediumLargeBoldText,
    MediumRegularText,
    NftCard,
    SmallRegularText,
    CollectionPriceContainer,
} from '@haos-labs/tesserae-utils';

import upArrowIcon from '../../assets/icons/up-arrow-icon.png';
import useCollections from './hooks/useCollections';
import useShop from '../shop/hooks/useShop';
import { BaseFlexRow, ScreenWrapper } from '../../common/styles';
import { getCollectionImageSrc, isCollectionFullyMinted } from '../../utils';
import { colorTheme } from '../../constants/colors';
import { CollectionsGridLayout, LeftContentWrapper } from '../../common/styles/nftStyles';
import useNft from '../../common/redux/hooks/useNft';

interface ThemeProps {
    primary: string;
    secondary: string;
}

interface BenefitsContainerProps {
    showExtendedContainer: boolean;
}

interface ArrowIconProps {
    inverse: boolean;
}

const Container = styled(ScreenWrapper)`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    max-width: 1227px;
    width: 100%;
    margin-top: 70px;
`;

const ArrowIcon = styled.img<ArrowIconProps>`
    width: 10px;
    padding: 12px;
    cursor: pointer;
    transition: all 1s;
    -webkit-transition: all 0.6s;
    -moz-transition: all 0.6s;
    -ms-transition: all 0.6s;
    -o-transition: all 0.6s;
    transform: ${({ inverse }) => inverse && 'rotate(-180deg) translateY(-10px)'};
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

const Image = styled.img`
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
`;

const BuyButtonContainer = styled.div<ThemeProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 18px 16px;
    margin-top: 25px;
    border-radius: 10px;
    background: ${({ primary }) => primary};
`;

const FlexColum = styled.div`
    display: flex;
    flex-direction: column;
`;

const FlexRow = styled(BaseFlexRow)`
    align-items: center;
    justify-content: space-between;
    margin-bottom: 33px;
`;

const BenefitsContainer = styled.div<BenefitsContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    transition: max-height 1s;
    -webkit-transition: max-height 1s;
    -moz-transition: max-height 1s;
    -ms-transition: max-height 1s;
    -o-transition: max-height 1s;
    max-height: ${({ showExtendedContainer }) => (showExtendedContainer ? 1000 : 0)}px;
`;

let theme = {
    primary: colorTheme.ORANGE,
    secondary: colorTheme.WHITE,
};

const CollectionDetails: React.FC = () => {
    const { collectionId } = useParams();
    const { getCollectionById, allCollections } = useCollections();
    const [collection, setCollection] = useState<any>(null);
    const [showBenefits, setShowBenefits] = useState<boolean>(false);
    const { shopTheme } = useShop(collection?.shop_name);
    const { nftList } = useNft(collection?.nft_token_id);
    const isMintDone = collection && isCollectionFullyMinted(collection);

    if (shopTheme) {
        theme = shopTheme;
    }

    useEffect(() => {
        if (collectionId) {
            setCollection(getCollectionById(collectionId));
        }
    }, [collectionId, allCollections]);

    if (!collection) {
        return null;
    }

    // TODO -> check for mint status and display nfts that are for sale here
    // TODO -> create new route for the items of a user in a collection with a label to go to list the nft for sale

    return (
        <ScreenWrapper>
            <Container>
                <BaseFlexRow>
                    <LeftContent>
                        <Image src={getCollectionImageSrc(collection)} />
                        {!isMintDone && (
                            <BuyButtonContainer {...theme}>
                                <FlexColum>
                                    <SmallRegularText fontSize={12} color={theme.secondary}>
                                        Item Price
                                    </SmallRegularText>
                                    <MediumLargeBoldText fontSize={20} color={theme.secondary}>
                                        {Number(collection.selling_price)}
                                    </MediumLargeBoldText>
                                </FlexColum>

                                <MainButton theme={theme} onClick={() => console.log('Click')} inverse>
                                    Buy Now
                                </MainButton>
                            </BuyButtonContainer>
                        )}
                    </LeftContent>
                    <RightContent>
                        <CollectionDescriptionContainer
                            title={collection.token_name}
                            subtitle={`By ${collection.shop_name}`}
                            detailsTitle="Description"
                            details={collection.description}
                            logoSrc="https://i.pinimg.com/280x280_RS/81/a7/ce/81a7ce9d3bc250bd44fae2b7f188c685.jpg"
                            showDivider
                        >
                            <>
                                <FlexRow>
                                    <MediumLargeBoldText extraCss="margin-bottom: 12px">Benefits</MediumLargeBoldText>
                                    <ArrowIcon
                                        src={upArrowIcon}
                                        onClick={() => setShowBenefits((val) => !val)}
                                        inverse={showBenefits}
                                    />
                                </FlexRow>
                                <BenefitsContainer showExtendedContainer={showBenefits}>
                                    {showBenefits &&
                                        collection.benefits.map((benefit: any, index: any) => (
                                            <React.Fragment key={`benefit-${index}`}>
                                                <MediumLargeBoldText extraCss="margin-bottom: 12px">
                                                    {benefit.name}
                                                </MediumLargeBoldText>
                                                <MediumRegularText extraCss="margin-bottom: 25px;">
                                                    {benefit.description}
                                                </MediumRegularText>
                                            </React.Fragment>
                                        ))}
                                </BenefitsContainer>
                            </>
                        </CollectionDescriptionContainer>
                    </RightContent>
                </BaseFlexRow>
                {isMintDone && nftList && (
                    <CollectionsGridLayout style={{ marginTop: 25 }}>
                        {nftList.map((nft: any, index: any) => {
                            console.log('LOGGER nft ------------------->> ', nft);
                            return (
                                <NftCard
                                    key={`nft-listed-${index}`}
                                    imageUrl={nft.url}
                                    title={nft.identifier}
                                    subtitle={`By ${collection.shop_name}`}
                                    price={Number(nft.listing_price)}
                                    wrapperStyle={{ marginRight: 26, marginBottom: 26 }}
                                    hoverAnimation
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    //@ts-ignore
                                    largerWidth
                                    BottomContent={
                                        <CollectionPriceContainer backgroundColor={theme.secondary}>
                                            <LeftContentWrapper>
                                                <SmallRegularText color={theme.primary}>Price</SmallRegularText>
                                                <MediumLargeBoldText color={theme.primary}>
                                                    {Number(nft.listing_price)} EGLD
                                                </MediumLargeBoldText>
                                            </LeftContentWrapper>
                                            <MediumLargeBoldText fontSize={24} color={theme.primary}>
                                                Buy
                                            </MediumLargeBoldText>
                                        </CollectionPriceContainer>
                                    }
                                />
                            );
                        })}
                    </CollectionsGridLayout>
                )}
            </Container>
        </ScreenWrapper>
    );
};

export default CollectionDetails;
