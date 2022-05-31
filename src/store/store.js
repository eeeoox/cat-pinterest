import { configureStore } from '@reduxjs/toolkit';

import picturesReducer from './picturesSlice';

export const store = configureStore({
    reducer: {
        pictures: picturesReducer
    },
});
