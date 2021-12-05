import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherApi } from './WeatherApi';
import { Exception } from '../../../createException';
import { IQuery } from '../../../interfaces/IQuery';

type WeatherParams = {
  readonly queries: IQuery[];
}

export const getWeather = createAsyncThunk(
  'getWeather',
  async ({ queries }: WeatherParams) => {
    return await WeatherApi.GET('weather',
      queries,
    );
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