import { configureStore } from '@reduxjs/toolkit';
import liveCollectionsReducer from './features/collection/slices/liveCollectionsSlice';
import availableCollectionsReducer from './features/collection/slices/availableCollectionsSlice';

const store = configureStore({
    reducer: {
        liveCollections: liveCollectionsReducer,
        availableCollections: availableCollectionsReducer,
    },
});

export default store;
