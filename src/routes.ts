import CollectionList from './features/collection/CollectionList';

export const routes = [
    {
        path: '/',
        component: CollectionList,
        authenticatedRoute: true,
    },
];

export const routNames = {
    home: '/',
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
