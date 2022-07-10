import React from 'react';
import styled from 'styled-components';

import searchIcon from '../../assets/icons/saerch.png';
import { colorTheme } from '../../constants/colors';

type Props = {
    value: string;
    setValue: (text: string) => { payload: any; type: string };
    placeholder?: string;
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 48px;
    width: 100%;
    border-radius: 24px;
    border: 1px solid ${colorTheme.GREY};
    padding: 0 22px;
    margin: 0 54px;
`;

const SearchInput = styled.input`
    background-color: transparent;
    color: ${colorTheme.GREY};
    height: 100%;
    width: 100%;
    border: none;
    font-family: RedHatMono-Regular;
    font-size: 16px;

    &:focus {
        border: none;
        outline: none;
    }
    &:focus-visible {
        border: none;
        outline: none;
    }
`;

const SearchIcon = styled.img`
    width: 14px;
    margin-right: 17px;
`;

const SearchBar: React.FC<Props> = ({ value, setValue, placeholder }) => {
    const onTextChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <Container>
            <SearchIcon src={searchIcon} />
            <SearchInput
                placeholder={placeholder ?? ''}
                value={value}
                onChange={(event) => onTextChange(event.target.value)}
            />
        </Container>
    );
};

export default SearchBar;
