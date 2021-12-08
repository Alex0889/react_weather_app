import { createAsyncThunk } from '@reduxjs/toolkit';
import { WeatherApi } from './WeatherApi';
import { Exception } from '../../../createException';
import { IQuery } from '../../../interfaces/IQuery';
import { IEntity } from '../../../interfaces/IEntity';

type WeatherParams = {
  readonly queries: IQuery[];
}

export const getWeather = createAsyncThunk(
  'getWeather',
  async ({ queries }: WeatherParams) => {
    return await WeatherApi.GET<IEntity>('weather',
      [
        ...queries,
        {name: 'appid', value: process.env.REACT_APP_API_KEY as string},
        {name: 'units', value: 'metric'}
      ]
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