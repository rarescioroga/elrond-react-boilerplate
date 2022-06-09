import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DappProvider } from '@elrondnetwork/dapp-core';
import { NotificationModal, SignTransactionsModals, TransactionsToastList } from '@elrondnetwork/dapp-core/dist/UI';
import { routes } from './routes';

const environment = process.env.ENVIRONMENT;

const App = () => {
    return (
        <BrowserRouter>
            <DappProvider environment={environment}>
                <>
                    <TransactionsToastList />
                    <NotificationModal />
                    <SignTransactionsModals />
                    <Routes>
                        {routes.map((route: any, index: number) => (
                            <Route path={route.path} key={'route-key-' + index} element={<route.component />} />
                        ))}
                    </Routes>
                </>
            </DappProvider>
        </BrowserRouter>
    );
};

export default App;
