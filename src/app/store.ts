import { configureStore } from '@reduxjs/toolkit';
import theme from './slices/theme';
import weather from './slices/weather';
import geolocation from './slices/geolocation';
import language from './slices/language';

export const store = configureStore({
  reducer: {
    theme,
    weather,
    geolocation,
    language
  },
});

export type RootState = ReturnType<typeof store.getState>;
