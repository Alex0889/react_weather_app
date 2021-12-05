import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/theme';
import weatherReducer from './slices/weather';
import tabsReducer from './slices/tabs';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    weather: weatherReducer,
    tabs: tabsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
