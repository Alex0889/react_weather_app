import { createAsyncThunk } from '@reduxjs/toolkit';
import { IQuery } from '../../../interfaces/IQuery';
import { WeatherApi } from './WeatherApi';
import { Exception } from '../../../createException';
import { IForecast } from '../../../interfaces/IForecast';

type ForecastParams = {
  readonly queries: IQuery[];
};

export const getForecastByCoords = createAsyncThunk(
  'getForecastByCoords',
  async ({ queries }: ForecastParams) => {
    return WeatherApi.GET<IForecast>('onecall',
      [...queries,
        { name: 'exclude', value: 'minutely, alerts' },
        { name: 'appid', value: process.env.REACT_APP_API_KEY as string },
        { name: 'units', value: 'metric' },
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
