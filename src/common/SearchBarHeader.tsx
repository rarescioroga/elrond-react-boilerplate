import React from 'react';
import styled from 'styled-components';
import { useGetLoginInfo } from '@elrondnetwork/dapp-core';
import { MainButton } from '@haos-labs/tesserae-utils';
import { useLocation, useNavigate } from 'react-router-dom';

import logo from '../assets/Logo.png';
import SearchBar from './components/SearchBar';
import AuthButton from './Elrond/AuthButton';
import useSearchFilter from '../redux/useSearchFilter';
import { colorTheme } from '../constants/colors';
import { routeNames } from '../routes';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const Logo = styled.img`
    width: 241px;
`;

const buttonTheme = {
    primary: colorTheme.ORANGE,
    secondary: colorTheme.WHITE,
};

const SearchBarHeader = () => {
    const { setSearchFilter, searchFilter } = useSearchFilter();
    const { isLoggedIn } = useGetLoginInfo();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isMyCollectionScreen = pathname === routeNames.myCollections;
    const onMyCollectionsButtonClick = () => {
        navigate(isMyCollectionScreen ? routeNames.home : routeNames.myCollections);
    };

    return (
        <Wrapper>
            <Logo src={logo} />
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
            <AuthButton />
        </Wrapper>
    );
};

export default SearchBarHeader;
