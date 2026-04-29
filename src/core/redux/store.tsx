import { configureStore } from '@reduxjs/toolkit';
import sidebarSlice from './sidebarSlice';
import themeReducer from './themeSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    theme: themeReducer,
    auth: authReducer,
  },
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;





