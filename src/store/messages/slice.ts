// Core
import { createSlice } from '@reduxjs/toolkit';

// Types
import * as types from './types';

// Reducers
import * as reducers from './reducers';

const initialState: types.IMessagesState = {
  isLoading: false,
  messages: null,
  socket: null,
};

export const messagesSlice = createSlice<types.IMessagesState, typeof reducers>(
  {
    name: 'messages',
    initialState,
    reducers,
  }
);

export const sliceName = messagesSlice.name;
export const messagesActions = messagesSlice.actions;
export default messagesSlice.reducer;
