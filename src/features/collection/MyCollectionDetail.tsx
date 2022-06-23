import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ScreenWrapper, BaseFlexRow } from '../../common/styles';
import { getCollectionImageSrc } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import useCollections from '../../common/redux/hooks/useCollections';
import useNft from '../../common/redux/hooks/useNft';
import {
    CollectionDescriptionContainer,
    CollectionPriceContainer,
    MainButton,
    MediumLargeBoldText,
    MediumRegularText,
    NftCard,
    SmallRegularText,
} from '@haos-labs/tesserae-utils';
import upArrowIcon from '../../assets/icons/up-arrow-icon.png';
import { CollectionsGridLayout, LeftContentWrapper } from '../../common/styles/nftStyles';
import { colorTheme } from '../../constants/colors';
import useShop from '../../common/redux/hooks/useShop';

interface ArrowIconProps {
    inverse: boolean;
}

interface BenefitsContainerProps {
    showExtendedContainer: boolean;
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

const MyCollectionDetail: React.FC = () => {
    const navigate = useNavigate();
    const { collectionId } = useParams();
    const { getCollectionById, allCollections } = useCollections();
    const { myNfts } = useNft(collectionId || '');
    const [collection, setCollection] = useState<any>(null);
    const { shopTheme } = useShop(collection?.shop_name);
    const [showBenefits, setShowBenefits] = useState<boolean>(false);

    if (shopTheme) {
        theme = shopTheme;
    }

    const goToMyNftDetailScreen = (nftId: string) => {
        navigate(`./nft/${nftId}`);
    };

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
            <Container>
                <BaseFlexRow>
                    <LeftContent>
                        <Image src={getCollectionImageSrc(collection)} />
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
                <CollectionsGridLayout style={{ marginTop: 25 }}>
                    {myNfts.map((nft: any, index: any) => (
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
                                        <SmallRegularText color={theme.primary}>Owner</SmallRegularText>
                                        <MediumLargeBoldText color={theme.primary}>Verified</MediumLargeBoldText>
                                    </LeftContentWrapper>
                                    <MainButton theme={theme} onClick={() => goToMyNftDetailScreen(nft.identifier)}>
                                        List now
                                    </MainButton>
                                </CollectionPriceContainer>
                            }
                        />
                    ))}
                </CollectionsGridLayout>
            </Container>
        </ScreenWrapper>
    );
};

export default MyCollectionDetail;
