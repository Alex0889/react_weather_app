import { createSlice } from '@reduxjs/toolkit';
import { IGeo } from '../../interfaces/IGeo';
import { getGeolocation } from './thunk/getGeolocation';

interface GeolocationState {
  readonly geolocation: {
    readonly geolocation: IGeo | null,
    readonly isLoading: boolean,
    readonly error: string | undefined,
  };
}

const initialState: GeolocationState = {
  geolocation: {
    geolocation: null,
    isLoading: false,
    error: undefined,
  }
}

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGeolocation.pending, ({geolocation}) => {
        geolocation.isLoading = true;
      })
      .addCase(getGeolocation.fulfilled, ({geolocation}, {payload}) => {
        geolocation.geolocation = payload;
        geolocation.isLoading = false;
      })
      .addCase(getGeolocation.rejected, ({geolocation}, {error}) => {
        geolocation.error = error.message;
        geolocation.isLoading = false;
      })
  }
});

export default geolocationSlice.reducer;