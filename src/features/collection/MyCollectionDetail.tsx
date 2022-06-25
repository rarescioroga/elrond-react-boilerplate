import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ScreenWrapper, BaseFlexRow } from '../../common/styles';
import { getCollectionImageSrc } from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import useCollections from '../../common/redux/hooks/useCollections';
import useNft from '../../common/redux/hooks/useNft';
import {
    CollectionPriceContainer,
    ImageAndBenefits,
    MainButton,
    MediumLargeBoldText,
    NftCard,
    SmallRegularText,
} from '@haos-labs/tesserae-utils';
import { CollectionsGridLayout, LeftContentWrapper } from '../../common/styles/nftStyles';
import { colorTheme } from '../../constants/colors';
import useShop from '../../common/redux/hooks/useShop';
import useTransactions from '../../common/redux/hooks/useTransactions';

const Container = styled(ScreenWrapper)`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    max-width: 1227px;
    width: 100%;
    margin-top: 70px;
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
    const { withdrawNft } = useTransactions();

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
                <ImageAndBenefits
                    imageSrc={getCollectionImageSrc(collection)}
                    collection={collection}
                    theme={theme}
                    logoSrc="https://i.pinimg.com/280x280_RS/81/a7/ce/81a7ce9d3bc250bd44fae2b7f188c685.jpg"
                />
                <CollectionsGridLayout style={{ marginTop: 25 }}>
                    {myNfts.map((nft: any, index: any) => (
                        <NftCard
                            key={`nft-listed-${index}`}
                            imageUrl={nft.url}
                            title={nft.name}
                            subtitle={`By ${collection.shop_name}`}
                            price={Number(nft.listing_price)}
                            wrapperStyle={{ marginRight: 26, marginBottom: 26 }}
                            hoverAnimation
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            largerWidth
                            BottomContent={
                                <CollectionPriceContainer backgroundColor={theme.secondary}>
                                    {!nft.listing_price && (
                                        <>
                                            <LeftContentWrapper>
                                                <SmallRegularText color={theme.primary}>Owner</SmallRegularText>
                                                <MediumLargeBoldText color={theme.primary}>
                                                    Verified
                                                </MediumLargeBoldText>
                                            </LeftContentWrapper>
                                            <MainButton
                                                theme={theme}
                                                onClick={() => goToMyNftDetailScreen(nft.identifier)}
                                            >
                                                List now
                                            </MainButton>
                                        </>
                                    )}

                                    {nft.listing_price && (
                                        <>
                                            <LeftContentWrapper>
                                                <SmallRegularText color={theme.primary}>Listed at</SmallRegularText>
                                                <MediumLargeBoldText color={theme.primary}>
                                                    {Number(nft.listing_price)} EGLD
                                                </MediumLargeBoldText>
                                            </LeftContentWrapper>
                                            <MainButton theme={theme} onClick={() => withdrawNft(nft)}>
                                                Withdraw
                                            </MainButton>
                                        </>
                                    )}
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
