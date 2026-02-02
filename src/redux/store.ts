import { configureStore } from '@reduxjs/toolkit';
import { apiClient } from './apiClient/apiClient';
import authReducer from './features/auth/authSlice';
import notificationReducer from './features/notification/notification.slice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            notifications: notificationReducer,
            [apiClient.reducerPath]: apiClient.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiClient.middleware),
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];