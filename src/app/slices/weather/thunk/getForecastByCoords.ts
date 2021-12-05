import { createAsyncThunk } from '@reduxjs/toolkit';
import { IQuery } from '../../../interfaces/IQuery';
import { WeatherApi } from './WeatherApi';
import { Exception } from '../../../createException';

type ForecastParams = {
  readonly queries: IQuery[];
};

export const getForecastByCoords = createAsyncThunk(
  'getForecastByCoords',
  async ({ queries }: ForecastParams) => {
    return WeatherApi.GET('onecall', [...queries, { name: 'exclude', value: 'minutely' }]);
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
