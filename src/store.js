import { configureStore } from '@reduxjs/toolkit';
import liveCollectionsReducer from './features/collection/reduxSlices/liveCollectionsSlice';
import availableCollectionsReducer from './features/collection/reduxSlices/availableCollectionsSlice';
import myCollectionsReducer from './features/collection/reduxSlices/myCollectionSlice';
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
