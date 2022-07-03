import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MediumLargeRegularText, MainButton } from '@haos-labs/tesserae-utils';
import { useGetAccountInfo, useGetLoginInfo } from '@elrondnetwork/dapp-core/hooks/account';

import ConnectWalletModal from '../ConnectWalletModal';
import accountPlaceholder from '../../../assets/account-placeholder.png';
import { baseTheme } from '../../../constants/colors';
import { shortenWalletAddress } from '../../../utils';
import AccountBalancePopup from '../../AccountBalancePopup';
import { Theme } from '../../models';

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

const AuthButton: React.FC<Props> = ({ overrideTheme }) => {
    const accountInfo = useGetAccountInfo();
    const { isLoggedIn } = useGetLoginInfo();
    const [showAccountPopup, setShowAccountPopup] = useState(false);
    const [showConnectModal, setShowConnectModal] = useState(false);
    const themeToUse = overrideTheme ?? baseTheme;
    const wrapperRef = useRef(null);

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
                <MainButton onClick={() => setShowConnectModal(true)} theme={themeToUse}>
                    Connect Wallet
                </MainButton>
            )}
            {isLoggedIn && (
                <AccountContainer ref={wrapperRef} onClick={() => setShowAccountPopup(true)}>
                    <AccountImage src={accountPlaceholder} />
                    <MediumLargeRegularText color={themeToUse.primary}>
                        {shortenWalletAddress(accountInfo.address)}
                    </MediumLargeRegularText>
                    {showAccountPopup && <AccountBalancePopup overrideTheme={themeToUse} />}
                </AccountContainer>
            )}
            <ConnectWalletModal theme={themeToUse} open={showConnectModal} onClose={() => setShowConnectModal(false)} />
        </>
    );
};

export default AuthButton;
