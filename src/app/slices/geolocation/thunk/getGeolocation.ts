import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGeo } from '../../../interfaces/IGeo';
import { GeolocationApi } from './GeolocationApi';
import { Exception } from '../../../createException';

export const getGeolocation = createAsyncThunk(
  'getGeolocation',
  async () => {
    return await GeolocationApi.GET<IGeo>('',
      [
        { name: 'fields', value: 'city,lat,lon,timezone' },
      ]);
  },
  {
    serializeError: x => {
      const exception = x as Exception;

      return {
        code: exception.key,
        message: exception.details,
      };
    },
  },
);