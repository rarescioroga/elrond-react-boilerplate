import React from 'react';
import styled from 'styled-components';
import { ExtraLargeBoldText, MediumRegularText } from '@haos-labs/tesserae-utils';
import { colorTheme } from '../constants/colors';

type Props = {
    imageUrl: string;
    title: string;
    description?: string;
};

interface WrapperProps {
    imageUrl?: string;
}

const Wrapper = styled.div<WrapperProps>`
    position: relative;
    width: 100%;
    max-height: 431px;
    aspect-ratio: 2.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 19px;
    box-shadow: 0 7px 30px 0 rgba(0, 0, 0, 0.64);
    overflow: hidden;
    background: black;
`;

const BannerImage = styled.img`
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0.7;
    object-fit: cover;
`;

const DescriptionWrapper = styled.div`
    margin: 20px 118px 0;
    z-index: 1;
`;

const Banner: React.FC<Props> = ({ imageUrl, title, description }) => {
    return (
        <Wrapper>
            <BannerImage src={imageUrl} />
            <ExtraLargeBoldText color={colorTheme.WHITE} fontSize={50} extraCss="z-index: 1">
                {title}
            </ExtraLargeBoldText>
            {description && (
                <DescriptionWrapper>
                    <MediumRegularText color={colorTheme.WHITE} extraCss="text-align: justify;">
                        {description}
                    </MediumRegularText>
                </DescriptionWrapper>
            )}
        </Wrapper>
    );
};

export default Banner;
