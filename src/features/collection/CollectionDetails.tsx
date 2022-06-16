import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import upArrowIcon from '../../assets/icons/up-arrow-icon.png';
import useCollections from './hooks/useCollections';
import { ScreenWrapper } from '../../common/styles';
import { getCollectionImageSrc } from '../../utils';
import {
    ExtraLargeBoldText,
    MainButton,
    MediumLargeBoldText,
    MediumRegularText,
    SmallRegularText,
} from '@haos-labs/tesserae-utils';
import { colorTheme } from '../../constants/colors';

interface ThemeProps {
    primary: string;
    secondary: string;
}

interface BenefitsContainerProps {
    display: boolean;
}

interface ArrowIconProps {
    inverse: boolean;
}

const Container = styled(ScreenWrapper)`
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    max-width: 1200px;
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
    margin: 0;
    box-shadow: 0 2px 43px 0 rgba(181, 181, 181, 0.36);
    padding: 38px 45px 45px 39px;
    border-radius: 10px;
`;

const Image = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;
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

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 33px;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colorTheme.LIGHT_GREY};
    margin: 40px 0;
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
    max-height: ${({ display }) => (display ? 1000 : 0)}px;
`;

const CollectionDetails: React.FC = () => {
    const { collectionId } = useParams();
    const { getCollectionById, allCollections } = useCollections();
    const [collection, setCollection] = useState<any>(null);
    const [showBenefits, setShowBenefits] = useState<boolean>(false);
    const theme = {
        primary: '#FFE600',
        secondary: '#000',
    };

    useEffect(() => {
        if (collectionId) {
            setCollection(getCollectionById(collectionId));
        }
    }, [collectionId, allCollections]);

    console.log('LOGGER collection ------------------->> ', collection);
    if (!collection) {
        return null;
    }

    return (
        <ScreenWrapper>
            <Container>
                <LeftContent>
                    <Image src={getCollectionImageSrc(collection)} />
                    <BuyButtonContainer {...theme}>
                        <FlexColum>
                            <SmallRegularText fontSize={12} color={colorTheme.GREY}>
                                Item Price
                            </SmallRegularText>
                            <MediumLargeBoldText fontSize={20}>{Number(collection.selling_price)}</MediumLargeBoldText>
                        </FlexColum>
                        <MainButton theme={theme} onClick={() => console.log('Click')} inverse>
                            Buy Now
                        </MainButton>
                    </BuyButtonContainer>
                </LeftContent>
                <RightContent>
                    <FlexColum style={{ marginBottom: 40 }}>
                        <ExtraLargeBoldText fontSize={40}>{collection.token_name}</ExtraLargeBoldText>
                        <MediumRegularText color={colorTheme.GREY}>By {collection.shop_name}</MediumRegularText>
                    </FlexColum>
                    <MediumLargeBoldText extraCss="margin-bottom: 12px">Description</MediumLargeBoldText>
                    <MediumRegularText>{collection.description}</MediumRegularText>
                    <Divider />
                    <FlexRow>
                        <MediumLargeBoldText extraCss="margin-bottom: 12px">Benefits</MediumLargeBoldText>
                        <ArrowIcon
                            src={upArrowIcon}
                            onClick={() => setShowBenefits((val) => !val)}
                            inverse={showBenefits}
                        />
                    </FlexRow>
                    <BenefitsContainer display={showBenefits}>
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
                </RightContent>
            </Container>
        </ScreenWrapper>
    );
};

export default CollectionDetails;
