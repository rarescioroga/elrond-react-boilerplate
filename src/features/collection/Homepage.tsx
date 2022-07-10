import React from 'react';
import styled from 'styled-components';
import { Banner, MediumRegularText } from '@haos-labs/tesserae-utils';

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

const banners = [
    {
        imageSrc: 'https://img.huffingtonpost.com/asset/627a6670210000f1c3507cbe.jpeg?ops=1778_1000',
        title: 'Banner Image Numero Uno',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n' +
            'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n' +
            'consequat.',
    },
    {
        imageSrc: 'https://assets.gqindia.com/photos/6272997d904ce73072684d56/master/pass/coffee.jpg',
        title: 'Banner Image Numero Dos',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n' +
            'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n' +
            'consequat.',
    },
    {
        imageSrc:
            'https://media.gq-magazine.co.uk/photos/5d5673da36fbf10009a3e6b5/3:2/w_1560,h_1040,c_limit/20190816-Coffee-08.jpg',
        title: 'Banner Image Numero Tres',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n' +
            'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n' +
            'consequat.',
    },
    {
        imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_uqSXSseesHJ4lV3GvGxcB04urEDysvqxnQ&usqp=CAU',
        title: 'Banner Image Numero Quatro',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore\n' +
            'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n' +
            'consequat.',
    },
];

const Homepage: React.FC = () => {
    const { searchFilter } = useSearchFilter();
    const { availableCollections, allFilteredCollections } = useCollections();

    return (
        <ScreenWrapper>
            <MainContentWrapper>
                <Banner banners={banners} />
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
