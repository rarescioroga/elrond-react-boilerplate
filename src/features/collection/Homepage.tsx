import React from 'react';
import styled from 'styled-components';
import { MediumRegularText } from '@haos-labs/tesserae-utils';

import Banner from '../../common/Banner';
import LiveCollectionsList from './LiveCollectionsList';
import CollectionsGrid from './common/CollectionsGrid';
import useSearchFilter from '../../common/redux/hooks/useSearchFilter';
import useCollections from './hooks/useCollections';
import { colorTheme } from '../../constants/colors';
import { ScreenWrapper } from '../../common/styles';

const MainContentWrapper = styled.div`
    width: calc(100% - 300px);
    max-width: 1227px;
    margin: 39px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Homepage: React.FC = () => {
    const { searchFilter } = useSearchFilter();
    const { availableCollections, allFilteredCollections } = useCollections();

    return (
        <ScreenWrapper>
            <MainContentWrapper>
                <Banner
                    imageUrl={'https://www.tesla.com/sites/default/files/images/roadster/roadster-social.jpg'}
                    title="Terra-Bits"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                />
                {!searchFilter && (
                    <>
                        <LiveCollectionsList />
                        <CollectionsGrid collections={availableCollections} title="Available Collections" />
                    </>
                )}
                {searchFilter && <CollectionsGrid collections={allFilteredCollections} title="All Collections" />}
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

export default Homepage;
