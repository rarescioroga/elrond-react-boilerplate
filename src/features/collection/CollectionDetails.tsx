import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {
    MediumLargeBoldText,
    NftCard,
    SmallRegularText,
    CollectionPriceContainer,
    MainButton,
    CollectionBanner,
    Benefits,
    ActionItemButton,
} from '@haos-labs/tesserae-utils';

import useCollections from '../../common/redux/hooks/useCollections';
import useShop from '../../common/redux/hooks/useShop';
import { BaseFlexRow, ScreenWrapper } from '../../common/styles';
import { getCollectionImageSrc, isCollectionFullyMinted } from '../../utils';
import { colorTheme } from '../../constants/colors';
import { CollectionsGridLayout, LeftContentWrapper } from '../../common/styles/nftStyles';
import useNft from '../../common/redux/hooks/useNft';
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

const MarginTopRow = styled(BaseFlexRow)`
    margin-top: 25px;
`;

let theme = {
    primary: colorTheme.ORANGE,
    secondary: colorTheme.WHITE,
};

const CollectionDetails: React.FC = () => {
    const { collectionId } = useParams();
    const { getCollectionById, allCollections } = useCollections();
    const { mintNft } = useTransactions();
    const [collection, setCollection] = useState<any>(null);
    const { shopTheme } = useShop(collection?.shop_name);
    const { nftList } = useNft(collection?.nft_token_id);
    const { buyNft } = useTransactions();
    const isMintDone = collection && isCollectionFullyMinted(collection);

    if (shopTheme) {
        theme = shopTheme;
    }

    const onMintNft = async () => {
        if (collection) {
            await mintNft(collection.token_name, Number(collection.selling_price));
        }
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
                <CollectionBanner
                    collection={collection}
                    bannerSrc={getCollectionImageSrc(collection)}
                    logoSrc="https://i.pinimg.com/280x280_RS/81/a7/ce/81a7ce9d3bc250bd44fae2b7f188c685.jpg"
                />
                <MarginTopRow>
                    <Benefits collection={collection} wrapperStyle={{ marginRight: 25 }} />
                    <ActionItemButton
                        label="Item price"
                        price={collection.price}
                        onClick={onMintNft}
                        buttonLabel="Mint Now"
                        theme={theme}
                        wrapperStyle={{ width: 390, height: 54 }}
                    />
                </MarginTopRow>
                {isMintDone && nftList && (
                    <CollectionsGridLayout style={{ marginTop: 25 }}>
                        {nftList.map((nft: any, index: any) => {
                            return (
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
                                            <LeftContentWrapper>
                                                <SmallRegularText color={theme.primary}>Price</SmallRegularText>
                                                <MediumLargeBoldText color={theme.primary}>
                                                    {Number(nft.listing_price)} EGLD
                                                </MediumLargeBoldText>
                                            </LeftContentWrapper>
                                            <MainButton theme={theme} onClick={() => buyNft(nft)}>
                                                Buy now
                                            </MainButton>
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
