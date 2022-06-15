import { configureStore } from '@reduxjs/toolkit';
import liveCollectionsReducer from './features/collection/reduxSlices/liveCollectionsSlice';
import availableCollectionsReducer from './features/collection/reduxSlices/availableCollectionsSlice';
import appConfigReducer from './redux/appConfigSlice';

const store = configureStore({
    reducer: {
        liveCollections: liveCollectionsReducer,
        availableCollections: availableCollectionsReducer,
        appConfig: appConfigReducer,
    },
});

export default store;
