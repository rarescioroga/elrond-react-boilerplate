import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
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

import anonymousLogo from '../../assets/anonymous-logo.png';
import useCollections from '../../common/redux/hooks/useCollections';
import useShop from '../../common/redux/hooks/useShop';
import useNft from '../../common/redux/hooks/useNft';
import useTransactions from '../../common/redux/hooks/useTransactions';
import { BaseFlexRow, ScreenWrapper, CollectionOrNftDetailContainer } from '../../common/styles';
import { getCollectionImageSrc, isCollectionFullyMinted } from '../../utils';
import { colorTheme } from '../../constants/colors';
import { CollectionsGridLayout, LeftContentWrapper } from '../../common/styles/nftStyles';

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
    const { listedNfts, isUserNftOwner } = useNft(collection?.nft_token_id);
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
            <CollectionOrNftDetailContainer>
                <CollectionBanner
                    collection={collection}
                    bannerSrc={getCollectionImageSrc(collection)}
                    logoSrc={anonymousLogo}
                />
                <MarginTopRow>
                    <Benefits collection={collection} wrapperStyle={{ marginRight: isMintDone ? 0 : 25 }} />
                    {!isMintDone && (
                        <ActionItemButton
                            label="Item price"
                            price={Number(collection.selling_price)}
                            onClick={onMintNft}
                            buttonLabel="Mint Now"
                            theme={theme}
                            wrapperStyle={{ width: 390, height: 54 }}
                        />
                    )}
                </MarginTopRow>
                {isMintDone && listedNfts && (
                    <CollectionsGridLayout style={{ marginTop: 25 }}>
                        {listedNfts.map((nft: any, index: number) => (
                            <Link
                                to={`./nft/${nft.identifier}/listed`}
                                key={`listed-nft-${index}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <NftCard
                                    key={`nft-listed-${index}`}
                                    imageUrl={nft.url}
                                    title={nft.name}
                                    subtitle={`By ${collection.shop_name}`}
                                    price={Number(nft.listing_price)}
                                    wrapperStyle={{ marginRight: 26, marginBottom: 26 }}
                                    hoverAnimation
                                    largerWidth
                                    isOwner={isUserNftOwner(nft)}
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
                            </Link>
                        ))}
                    </CollectionsGridLayout>
                )}
            </CollectionOrNftDetailContainer>
        </ScreenWrapper>
    );
};

export default CollectionDetails;
