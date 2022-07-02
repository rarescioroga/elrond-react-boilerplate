import React from 'react';
import styled from 'styled-components';
import { MediumRegularText } from '@haos-labs/tesserae-utils';

import Banner from '../../common/Banner';
import LiveCollectionsList from './LiveCollectionsList';
import CollectionsGrid from './components/CollectionsGrid';
import useSearchFilter from '../../common/redux/hooks/useSearchFilter';
import useCollections from '../../common/redux/hooks/useCollections';
import { colorTheme } from '../../constants/colors';
import { ScreenWrapper } from '../../common/styles';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks';

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
    const { isLoggedIn } = useGetLoginInfo();
    const { availableCollections, allFilteredCollections } = useCollections();

    return (
        <ScreenWrapper>
            <MainContentWrapper>
                <Banner
                    imageUrl={
                        'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                    }
                    title="PeruCoffee"
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
