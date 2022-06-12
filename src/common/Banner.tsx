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
    imageUrl: string;
}

const Wrapper = styled.div<WrapperProps>`
    width: 100%;
    aspect-ratio: 2.6;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 19px;
    box-shadow: 0 7px 30px 0 rgba(0, 0, 0, 0.64);
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

const DescriptionWrapper = styled.div`
    margin: 20px 118px 0;
`;

const Banner: React.FC<Props> = ({ imageUrl, title, description }) => {
    return (
        <Wrapper imageUrl={imageUrl}>
            <ExtraLargeBoldText color={colorTheme.WHITE} fontSize={50}>
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
