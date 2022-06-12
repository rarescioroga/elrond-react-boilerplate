import CollectionList from './features/collection/CollectionList';
import AuthButton from './common/Elrond/AuthButton';

export const routes = [
    {
        path: '/',
        component: CollectionList,
        authenticatedRoute: false,
    },
    {
        path: '/extension-login',
        component: AuthButton,
        authenticatedRoute: false,
    },
];

export const routeNames = {
    home: '/',
    extensionLogin: '/extension-login',
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
