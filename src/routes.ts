import Homepage from './features/collection/Homepage';
import MyCollections from './features/collection/MyCollections';

export const routes = [
    {
        path: '/',
        component: Homepage,
        authenticatedRoute: false,
    },
    {
        path: '/my-collections',
        component: MyCollections,
        authenticatedRoute: false,
    },
];

export const routeNames = {
    home: '/',
    myCollections: '/my-collections',
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
