import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherApi } from './WeatherApi';
import { Exception } from '../../../createException';
import { IForecast } from '../../../interfaces/IForecast';
import { getWeather } from './getWeather';
import { RootState } from '../../../store';
import { IEntity } from '../../../interfaces/IEntity';

export const getForecastByCoords = createAsyncThunk(
  'getForecastByCoords',
  async (_,
         {
           dispatch,
           getState,
         }) => {
    const { geolocation: { city, geolocation }, language: { lang } } = getState() as RootState;

    const { payload } = await dispatch(getWeather({
      queries: [
        { name: 'q', value: city || geolocation.geolocation!.city },
      ],
    }));

    return await WeatherApi.GET<IForecast>('onecall',
      [
        { name: 'lat', value: (payload as IEntity)!.coord.lat },
        { name: 'lon', value: (payload as IEntity)!.coord.lon },
        { name: 'exclude', value: 'minutely, alerts' },
        { name: 'appid', value: process.env.REACT_APP_API_KEY as string },
        { name: 'units', value: 'metric' },
        { name: 'lang', value: lang },
      ]);
  },
  {
    serializeError: (x) => {
      const exception = x as Exception;

      return {
        code: exception.key,
        message: exception.details,
      };
    },
  },
);
