import React from 'react';
import styled from 'styled-components';

import SearchBarHeader from '../../common/SearchBarHeader';
import Banner from '../../common/Banner';
import LiveCollectionsList from './LiveCollectionsList';
import AvailableCollections from './AvailableCollections';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    width: 100vw;
`;

const HeaderWrapper = styled.div`
    width: calc(100% - 64px);
    max-width: 1500px;
    margin: 39px 32px 0 32px;
`;

const MainContentWrapper = styled.div`
    width: calc(100% - 300px);
    max-width: 1200px;
    margin: 39px 32px 0 32px;
`;

const CollectionList: React.FC = () => {
    const array = Array.from(Array(10).keys());

    return (
        <Wrapper>
            <HeaderWrapper>
                <SearchBarHeader />
            </HeaderWrapper>
            <MainContentWrapper>
                <Banner
                    imageUrl={'https://www.tesla.com/sites/default/files/images/roadster/roadster-social.jpg'}
                    title="Terra-Bits"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                />
                <LiveCollectionsList />
                <AvailableCollections />
            </MainContentWrapper>
        </Wrapper>
    );
};

export default CollectionList;
