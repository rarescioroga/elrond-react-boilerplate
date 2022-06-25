import { configureStore } from '@reduxjs/toolkit';
import liveCollectionsReducer from './common/redux/slices/liveCollectionsSlice';
import availableCollectionsReducer from './common/redux/slices/availableCollectionsSlice';
import myCollectionsReducer from './common/redux/slices/myCollectionSlice';
import appConfigReducer from './common/redux/slices/appConfigSlice';

const store = configureStore({
    reducer: {
        liveCollections: liveCollectionsReducer,
        availableCollections: availableCollectionsReducer,
        myCollections: myCollectionsReducer,
        appConfig: appConfigReducer,
    },
});

export default store;
