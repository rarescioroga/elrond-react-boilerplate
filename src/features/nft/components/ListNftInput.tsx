import React, { BaseSyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { colorTheme } from '../../../constants/colors';
import useShop from '../../../common/redux/hooks/useShop';
import { MainButton } from '@haos-labs/tesserae-utils';
import useTransactions from '../../../common/redux/hooks/useTransactions';

type Props = {
    collection: any;
    nft: any;
};

interface ContainerProps {
    theme: {
        primary: string;
        secondary: string;
    };
}

const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 29px 20px 17px;
    border-radius: 10px;
    margin-top: 40px;
    background-color: ${({ theme }) => theme.secondary};
`;

const SearchInput = styled.input`
    background-color: ${colorTheme.WHITE};
    color: ${colorTheme.BLACK};
    height: 40px;
    width: 100%;
    padding: 0 24px;
    margin-right: 24px;
    border: none;
    border-radius: 24px;
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

let theme = {
    primary: colorTheme.ORANGE,
    secondary: colorTheme.WHITE,
};

const ListNftInput: React.FC<Props> = ({ collection, nft }) => {
    const [price, setPrice] = useState<string>('');
    const { shopTheme } = useShop(collection?.shop_name);
    const { listNft } = useTransactions();

    if (shopTheme) {
        theme = shopTheme;
    }

    const handleOnInput = (event: BaseSyntheticEvent) => {
        setPrice(event.target.value);
    };

    const handleListNft = async () => {
        await listNft(nft, Number(price));
    };

    return (
        <Container theme={theme}>
            <SearchInput
                placeholder="Listing price (EGLD)"
                type="number"
                pattern="[0-9]*"
                value={price}
                onInput={handleOnInput}
            />
            <MainButton theme={theme} onClick={handleListNft}>
                List now
            </MainButton>
        </Container>
    );
};

export default ListNftInput;
