import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { loginServices, useGetAccountInfo, useGetLoginInfo } from '@elrondnetwork/dapp-core';
import { MediumLargeRegularText, MainButton } from '@haos-labs/tesserae-utils';

import accountPlaceholder from '../../../assets/account-placeholder.png';
import { colorTheme } from '../../../constants/colors';
import { shortenWalletAddress } from '../../../utils';
import AccountBalancePopup from '../../AccountBalancePopup';
import { Theme } from '../../models';

const { useExtensionLogin } = loginServices;

type Props = {
    overrideTheme?: Theme;
};

const AccountContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
`;

const AccountImage = styled.img`
    height: 38px;
    width: 38px;
    border-radius: 50%;
    margin-right: 24px;
`;

const buttonTheme = {
    primary: colorTheme.ORANGE,
    secondary: colorTheme.WHITE,
};

const AuthButton: React.FC<Props> = ({ overrideTheme }) => {
    const accountInfo = useGetAccountInfo();
    const { isLoggedIn } = useGetLoginInfo();
    const [showAccountPopup, setShowAccountPopup] = useState(false);
    const [onInitiateLogin] = useExtensionLogin({
        callbackRoute: '/',
        redirectAfterLogin: true,
    });
    const themeToUse = overrideTheme ?? buttonTheme;
    const wrapperRef = useRef(null);

    const handleLogin = () => {
        onInitiateLogin();
    };

    useEffect(() => {
        const handleClickOutside = (event: { target: any }) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowAccountPopup(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <>
            {!isLoggedIn && (
                <MainButton onClick={handleLogin} theme={themeToUse}>
                    Connect Wallet
                </MainButton>
            )}
            {isLoggedIn && (
                <AccountContainer ref={wrapperRef} onClick={() => setShowAccountPopup(true)}>
                    <AccountImage src={accountPlaceholder} />
                    <MediumLargeRegularText color={colorTheme.ORANGE}>
                        {shortenWalletAddress(accountInfo.address)}
                    </MediumLargeRegularText>
                    {showAccountPopup && <AccountBalancePopup />}
                </AccountContainer>
            )}
        </>
    );
};

export default AuthButton;
