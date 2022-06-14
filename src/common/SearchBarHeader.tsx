import React, { useState } from 'react';
import styled from 'styled-components';

import logo from '../assets/Logo.png';
import SearchBar from './components/SearchBar';
import AuthButton from './Elrond/AuthButton';
import useSearchFilter from '../redux/useSearchFilter';

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

const SearchBarHeader = () => {
    const { setSearchFilter, searchFilter } = useSearchFilter();

    return (
        <Wrapper>
            <Logo src={logo} />
            <SearchBar value={searchFilter} setValue={setSearchFilter} placeholder="Search collection" />
            <AuthButton />
        </Wrapper>
    );
};

export default SearchBarHeader;
