import Homepage from './features/collection/Homepage';
import MyCollections from './features/collection/MyCollections';
import CollectionDetails from './features/collection/CollectionDetails';

export const routes = [
    {
        path: '/',
        component: Homepage,
        authenticatedRoute: false,
    },
    {
        path: '/my-collections',
        component: MyCollections,
        authenticatedRoute: true,
    },
    {
        path: '/collection/:collectionId',
        component: CollectionDetails,
        authenticatedRoute: false,
    },
];

export const routeNames = {
    home: '/',
    myCollections: '/my-collections',
    collectionDetail: '/collection/:collectionId',
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
