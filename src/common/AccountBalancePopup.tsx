import React from 'react';
import styled from 'styled-components';
import { MediumLargeBoldText, MediumRegularText } from '@haos-labs/tesserae-utils';
import { baseTheme, colorTheme } from '../constants/colors';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks/account';
import { logout } from '@elrondnetwork/dapp-core/utils';
import { TokenPayment } from '@elrondnetwork/erdjs/out';
import { Theme } from './models';

type Props = {
    overrideTheme?: Theme;
};

const Wrapper = styled.div`
    position: absolute;
    top: 54px;
    left: -140px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 208px;
    padding: 23px 27px;
    background-color: ${colorTheme.WHITE};
    border-radius: 13px;
    box-shadow: 0 2px 43px 0 rgba(181, 181, 181, 0.36);
    cursor: default;
    z-index: 2;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    margin-bottom: 12px;
    background-color: ${colorTheme.LIGHT_GREY};
`;

const AccountBalancePopup: React.FC<Props> = ({ overrideTheme }) => {
    const { account } = useGetAccountInfo();
    const themeToUse = overrideTheme ?? baseTheme;

    const handleLogout = () => {
        logout(`${window.location.origin}/`);
    };

    return (
        <Wrapper>
            <MediumRegularText color={colorTheme.GREY} extraCss="margin-bottom: 6px;">
                Balance
            </MediumRegularText>
            <MediumLargeBoldText fontSize={20} color={themeToUse.primary} extraCss="margin-bottom: 18px;">
                {Number(TokenPayment.egldFromBigInteger(account.balance).toRationalNumber()).toFixed(3)} EGLD
            </MediumLargeBoldText>
            <Divider />
            <div onClick={handleLogout}>
                <MediumRegularText extraCss="cursor: pointer;">Disconnect</MediumRegularText>
            </div>
        </Wrapper>
    );
};

export default AccountBalancePopup;
