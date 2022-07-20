export const routes = [
    {
        path: '/',
        component: null,
        authenticatedRoute: false,
    },
];

export const routeNames = {
    home: '/',
    unlock: '/unlock',
    walletconnect: '/walletconnect',
};

const mappedRoutes = routes.map((route) => {
    const requiresAuth = Boolean(route.authenticatedRoute);

    return {
        path: route.path,
        component: route.component,
        authenticatedRoute: requiresAuth,
    };
});

export default mappedRoutes;
