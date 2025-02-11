import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth.slice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import refreshReducer from './features/refresh.slice'
import storage from 'redux-persist/lib/storage'
import productReducer from './features/product.slice'
import analyticsReducer from './features/analytics.slice'
import userDetailsReducer from './features/user.slice';
import complaintReducer from './features/complaint.slice'

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const rootReducer= combineReducers({
    'auth': authReducer,
    'refresh': refreshReducer,
    'product' : productReducer,
    'analytics' : analyticsReducer,
    'user': userDetailsReducer,
    'complaint' : complaintReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})

export const persistor = persistStore(store)