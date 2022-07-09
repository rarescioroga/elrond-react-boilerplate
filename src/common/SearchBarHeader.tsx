import React from 'react';
import styled from 'styled-components';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks/account';
import { MainButton } from '@haos-labs/tesserae-utils';
import { useLocation, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';
import SearchBar from './components/SearchBar';
import AuthButton from './Elrond/AuthButton';
import useSearchFilter from './redux/hooks/useSearchFilter';
import { colorTheme } from '../constants/colors';
import { routeNames } from '../routes';
import useShop from './redux/hooks/useShop';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 24px 0;
`;

const Logo = styled.img`
    width: 241px;
    cursor: pointer;
`;

const baseButtonTheme = {
    primary: colorTheme.ORANGE,
    secondary: colorTheme.WHITE,
};

const SearchBarHeader = () => {
    const { setSearchFilter, searchFilter } = useSearchFilter();
    const { shopTheme } = useShop();
    const { isLoggedIn } = useGetLoginInfo();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isMyCollectionScreen = pathname === routeNames.myCollections;
    const isCollectionDetailsScreen = pathname.includes('/collection') || pathname.includes('/my-collections/');
    const buttonTheme = shopTheme && isCollectionDetailsScreen ? shopTheme : baseButtonTheme;

    const onMyCollectionsButtonClick = () => {
        navigate(isMyCollectionScreen ? routeNames.home : routeNames.myCollections);
    };

    const onLogoClick = () => {
        navigate(routeNames.home);
    };

    return (
        <Wrapper>
            <Logo src={logo} onClick={onLogoClick} />
            <SearchBar value={searchFilter} setValue={setSearchFilter} placeholder="Search collection" />
            {isLoggedIn && (
                <MainButton
                    theme={buttonTheme}
                    extraStyle={{ marginRight: 62 }}
                    onClick={onMyCollectionsButtonClick}
                    inverse={!isMyCollectionScreen}
                >
                    My Collections
                </MainButton>
            )}
            <AuthButton overrideTheme={buttonTheme} />
        </Wrapper>
    );
};

export default SearchBarHeader;
