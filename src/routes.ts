import Homepage from './features/collection/Homepage';
import MyCollections from './features/collection/MyCollections';
import CollectionDetails from './features/collection/CollectionDetails';
import MyCollectionDetail from './features/collection/MyCollectionDetail';
import NftDetail from './features/nft/NftDetail';

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
        path: '/my-collections/:collectionId',
        component: MyCollectionDetail,
        authenticatedRoute: true,
    },
    {
        path: '/collection/:collectionId',
        component: CollectionDetails,
        authenticatedRoute: false,
    },
    {
        path: '/collection/:collectionId/nft/:nftId',
        component: NftDetail,
        authenticatedRoute: true,
    },
    {
        path: '/collection/:collectionId/nft/:nftId/listed',
        component: NftDetail,
        authenticatedRoute: true,
    },
    {
        path: '/my-collections/:collectionId/nft/:nftId',
        component: NftDetail,
        authenticatedRoute: true,
    },
];

export const routeNames = {
    home: '/',
    myCollections: '/my-collections',
    myCollectionsDetail: '/my-collections/:collectionId',
    collectionDetail: '/collection/:collectionId',
    myNftDetail: '/my-collections/:collectionId/nft/:nftId',
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
