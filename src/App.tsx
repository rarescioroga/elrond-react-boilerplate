import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DappProvider, AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core/wrappers';
import { TransactionsToastList, SignTransactionsModals, NotificationModal } from '@elrondnetwork/dapp-core/UI';
import { QueryClient, QueryClientProvider } from 'react-query';

import { routeNames, routes } from './routes';
import { ScreenWrapper } from './common/styles';
import './index.css';

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
            <BrowserRouter>
                <DappProvider
                    environment={environment}
                    customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
                >
                    <AuthenticatedRoutesWrapper routes={routes} unlockRoute={routeNames.unlock}>
                        <ScreenWrapper>
                            <TransactionsToastList successfulToastLifetime={5000} />
                            <NotificationModal />
                            <SignTransactionsModals />
                            <Routes>
                                {routes.map((route: any, index: number) => (
                                    <Route path={route.path} key={'route-key-' + index} element={<route.component />} />
                                ))}
                            </Routes>
                        </ScreenWrapper>
                    </AuthenticatedRoutesWrapper>
                </DappProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
