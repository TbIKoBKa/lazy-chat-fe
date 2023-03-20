import { io } from 'socket.io-client';

import * as types from './types';
import { IMessage } from './types';

export const connect: types.BaseContract<void> = (state) => {
  const socket = io(process.env.WEBSOCKET_URL || '');

  return {
    ...state,
    socket,
  };
};

export const disconnect: types.BaseContract<void> = (state) => {
  state.socket?.disconnect();

  state.socket = null;
};

export const getAllMessages: types.BaseContract<void> = (state) => {
  state.isLoading = true;
  state.socket?.emit('findAllMessage');
};

export const setAllMessages: types.BaseContract<IMessage[]> = (
  state,
  { payload }
) => {
  state.isLoading = false;
  state.messages = payload;
};

export const getMessage: types.BaseContract<IMessage> = (
  state,
  { payload }
) => {
  state.messages?.push(payload);
};

export const sendMessage: types.BaseContract<types.ISendMessage> = (
  state,
  { payload }
) => {
  state.socket?.emit('createMessage', payload);
};
