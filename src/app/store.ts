import { configureStore } from '@reduxjs/toolkit';
import theme from './slices/theme';
import weather from './slices/weather';
import tabs from './slices/tabs';
import geolocation from './slices/geolocation';

export const store = configureStore({
  reducer: {
    theme,
    weather,
    tabs,
    geolocation,
  },
});

export type RootState = ReturnType<typeof store.getState>;
