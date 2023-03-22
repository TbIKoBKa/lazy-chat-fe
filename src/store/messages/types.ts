import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export interface IMessage {
  id: number;
  text: string;
  sender: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessagesState {
  isLoading: boolean;
  socket: Socket | null;
  clientsCount: number;
  messages: IMessage[] | null;
}

export interface ISendMessage {
  text: string;
}

export interface IDeleteMessage {
  id: number;
}

export interface IEditMessage extends Partial<IMessage> {}

// Contracts
export type BaseContract<T = any> = CaseReducer<
  IMessagesState,
  PayloadAction<T>
>;
