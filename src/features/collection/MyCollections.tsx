import React from 'react';
import styled from 'styled-components';

import MyCollectionsGrid from './common/MyCollectionsGrid';
import useCollections from '../../common/redux/hooks/useCollections';
import { MediumRegularText } from '@haos-labs/tesserae-utils';
import { colorTheme } from '../../constants/colors';
import { ScreenWrapper } from '../../common/styles';

const MainContentWrapper = styled.div`
    width: calc(100% - 300px);
    max-width: 1227px;
    margin: 39px 32px;
`;

const MyCollections: React.FC = () => {
    const { myCollections } = useCollections();

    return (
        <ScreenWrapper>
            <MainContentWrapper>
                <MyCollectionsGrid collections={myCollections} title="My Collections" isMyCollection />
                <MediumRegularText color={colorTheme.GREY} extraCss="text-align: center; margin: 128px 64px 0;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </MediumRegularText>
            </MainContentWrapper>
        </ScreenWrapper>
    );
};

export default MyCollections;
