import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DappProvider } from '@elrondnetwork/dapp-core';
import { DappUI, AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core';
import { QueryClient, QueryClientProvider } from 'react-query';

import SearchBarHeader from './common/SearchBarHeader';
import { routeNames, routes } from './routes';
import { HeaderWrapper, ScreenWrapper, ComponentsWrapper } from './common/styles';

import '@elrondnetwork/dapp-core/dist/index.css';

const { NotificationModal, TransactionsToastList, SignTransactionsModals } = DappUI;

const environment = process.env.REACT_APP_ENVIRONMENT;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <DappProvider environment={environment}>
                <BrowserRouter>
                    <AuthenticatedRoutesWrapper routes={routes} unlockRoute={routeNames.home}>
                        <ScreenWrapper>
                            <TransactionsToastList />
                            <NotificationModal />
                            <SignTransactionsModals />
                            <HeaderWrapper>
                                <SearchBarHeader />
                            </HeaderWrapper>
                            <ComponentsWrapper>
                                <Routes>
                                    {routes.map((route: any, index: number) => (
                                        <Route
                                            path={route.path}
                                            key={'route-key-' + index}
                                            element={<route.component />}
                                        />
                                    ))}
                                </Routes>
                            </ComponentsWrapper>
                        </ScreenWrapper>
                    </AuthenticatedRoutesWrapper>
                </BrowserRouter>
            </DappProvider>
        </QueryClientProvider>
    );
};

export default App;
