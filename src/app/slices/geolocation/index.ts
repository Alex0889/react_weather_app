import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGeo } from '../../interfaces/IGeo';
import { getGeolocation } from './thunk/getGeolocation';
import { storage } from 'prebuild/helpers/storage';
import { toast } from 'react-toastify';

interface GeolocationState {
  readonly geolocation: {
    readonly geolocation: IGeo | null,
    readonly isLoading: boolean,
    readonly error: string | undefined,
  };
  readonly city: string;
}

const initialState: GeolocationState = {
  geolocation: {
    geolocation: null,
    isLoading: false,
    error: undefined,
  },
  city: storage.getItem('city') || '',
};

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    changeCity: (state, { payload }: PayloadAction<string>) => {
      state.city = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGeolocation.pending, ({ geolocation }) => {
        geolocation.isLoading = true;
      })
      .addCase(getGeolocation.fulfilled, (state, { payload }) => {
        state.geolocation.geolocation = payload;
        state.city = payload.city;
        state.geolocation.isLoading = false;
        storage.setItem('city', payload.city);
      })
      .addCase(getGeolocation.rejected, ({ geolocation }, { error }) => {
        geolocation.error = error.message;
        toast.error(error.message);
        geolocation.isLoading = false;
      });
  },
});

export const { changeCity } = geolocationSlice.actions;

export default geolocationSlice.reducer;