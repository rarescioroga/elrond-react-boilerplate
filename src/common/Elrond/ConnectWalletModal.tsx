import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MainButton, MediumLargeRegularText } from '@haos-labs/tesserae-utils';
import { useExtensionLogin, useWalletConnectLogin } from '@elrondnetwork/dapp-core/hooks/login';

import iconLogo from '../../assets/icons/icon-logo.png';
import { Theme } from '../models';
import { colorTheme } from '../../constants/colors';
import { setExternalProviderAsAccountProvider } from '@elrondnetwork/dapp-core/providers/accountProvider';

type Props = {
    theme: Theme;
    open: boolean;
    onClose: (value: boolean) => void;
};

const Wrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 328px;
    flex-direction: column;
    align-items: center;
    padding: 23px;
    background-color: ${colorTheme.WHITE};
    box-shadow: 0 2px 43px 0 rgba(181, 181, 181, 0.36);
    border-radius: 7px;
`;

const Logo = styled.img`
    height: 52px;
    margin-bottom: 23px;
`;

const ConnectWalletModal: React.FC<Props> = ({ theme, open, onClose }) => {
    const wrapperRef = useRef(null);
    const [onInitiateLogin] = useExtensionLogin({
        callbackRoute: '/',
    });
    const [onInitiateWalletLogin] = useWalletConnectLogin({
        callbackRoute: '/',
        logoutRoute: '/',
    });

    const handleExtensionLogin = () => {
        onInitiateLogin();
    };

    const handleMaiarLogin = () => {
        onInitiateWalletLogin();
    };

    useEffect(() => {
        setExternalProviderAsAccountProvider();
        const handleClickOutside = (event: { target: any }) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onClose(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    if (!open) {
        return null;
    }

    return (
        <Wrapper ref={wrapperRef}>
            <Logo src={iconLogo} />
            <MediumLargeRegularText>Connect your wallet</MediumLargeRegularText>
            <MainButton onClick={handleExtensionLogin} theme={theme} extraStyle={{ marginTop: 51 }}>
                Connect via the extension
            </MainButton>
            <MainButton onClick={handleMaiarLogin} theme={theme} extraStyle={{ marginTop: 51 }}>
                Connect via maiar
            </MainButton>
        </Wrapper>
    );
};

export default ConnectWalletModal;
