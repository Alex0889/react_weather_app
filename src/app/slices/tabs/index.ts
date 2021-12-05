import { createSlice } from '@reduxjs/toolkit';

interface tabsState {
  tabSelector: 'day' | 'week';
}

const initialState: tabsState = {
  tabSelector: 'day',
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setTabSelector: (state, { payload }) => {
      state.tabSelector = payload;
    },
  },
});

export const { setTabSelector } = tabsSlice.actions;

export default tabsSlice.reducer;