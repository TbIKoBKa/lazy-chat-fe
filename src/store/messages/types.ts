import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export interface IMessage {
  id: number;
  text: string;
  sender: string;
  created_at: string;
  updated_at: string;
}

export interface IMessagesState {
  isLoading: boolean;
  socket: Socket | null;
  messages: IMessage[] | null;
}

export interface ISendMessage {
  text: string;
}

// Contracts
export type BaseContract<T = any> = CaseReducer<
  IMessagesState,
  PayloadAction<T>
>;
