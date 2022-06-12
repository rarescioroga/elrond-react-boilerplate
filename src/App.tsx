import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DappProvider } from '@elrondnetwork/dapp-core';
import { DappUI, AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core';
import { routeNames, routes } from './routes';
import '@elrondnetwork/dapp-core/dist/index.css';

const { NotificationModal, TransactionsToastList, SignTransactionsModals } = DappUI;

const environment = process.env.REACT_APP_ENVIRONMENT;

const App = () => {
    return (
        <DappProvider environment={environment}>
            <BrowserRouter>
                <AuthenticatedRoutesWrapper routes={routes} unlockRoute={routeNames.home}>
                    <TransactionsToastList />
                    <NotificationModal />
                    <SignTransactionsModals />
                    <Routes>
                        {routes.map((route: any, index: number) => (
                            <Route path={route.path} key={'route-key-' + index} element={<route.component />} />
                        ))}
                    </Routes>
                </AuthenticatedRoutesWrapper>
            </BrowserRouter>
        </DappProvider>
    );
};

export default App;
