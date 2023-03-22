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

export const getConnectedClientsCount: types.BaseContract<void> = (state) => {
  state.socket?.emit('getConnectedClientsCount');
};

export const setAllMessages: types.BaseContract<IMessage[]> = (
  state,
  { payload }
) => {
  state.isLoading = false;
  state.messages = payload;
};

export const setConnectedClientsCount: types.BaseContract<number> = (
  state,
  { payload }
) => {
  state.clientsCount = payload;
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

export const deleteMessageRequest: types.BaseContract<types.IDeleteMessage> = (
  state,
  { payload }
) => {
  const { id } = payload;

  state.socket?.emit('removeMessage', id);
};

export const deleteMessage: types.BaseContract<types.IDeleteMessage> = (
  state,
  { payload }
) => {
  const { id } = payload;

  if (state.messages) {
    state.messages = state.messages?.filter((message) => message.id !== id);
  }
};

export const editMessageRequest: types.BaseContract<types.IEditMessage> = (
  state,
  { payload }
) => {
  state.socket?.emit('updateMessage', payload);
};

export const editMessage: types.BaseContract<types.IEditMessage> = (
  state,
  { payload }
) => {
  const { id } = payload;

  if (state.messages) {
    state.messages = state.messages.map((message) => {
      if (id === message.id) {
        return Object.assign({}, message, payload);
      }

      return message;
    });
  }
};
