import { useCallback } from 'react';

import { useSelector, useDispatch } from '@/tools/hooks';
import { messagesActions } from './slice';
import { IDeleteMessage, IEditMessage, IMessage, ISendMessage } from './types';

export const useMessages = () => {
  const dispatch = useDispatch();
  const messagesState = useSelector((state) => state.messages);

  const connect = useCallback(() => {
    dispatch(messagesActions.connect());
  }, [dispatch]);

  const disconnect = useCallback(() => {
    dispatch(messagesActions.disconnect());
  }, [dispatch]);

  const getAllMessages = useCallback(() => {
    dispatch(messagesActions.getAllMessages());
  }, [dispatch]);

  const setAllMessages = useCallback(
    (messages: IMessage[]) => {
      dispatch(messagesActions.setAllMessages(messages));
    },
    [dispatch]
  );

  const getConnectedClientsCount = useCallback(() => {
    dispatch(messagesActions.getConnectedClientsCount());
  }, [dispatch]);

  const setConnectedClientsCount = useCallback(
    (count: number) => {
      dispatch(messagesActions.setConnectedClientsCount(count));
    },
    [dispatch]
  );

  const getMessage = useCallback(
    (message: IMessage) => {
      dispatch(messagesActions.getMessage(message));
    },
    [dispatch]
  );

  const sendMessage = useCallback(
    (message: ISendMessage) => {
      dispatch(messagesActions.sendMessage(message));
    },
    [dispatch]
  );

  const deleteMessageRequest = useCallback(
    (message: IDeleteMessage) => {
      dispatch(messagesActions.deleteMessageRequest(message));
    },
    [dispatch]
  );

  const deleteMessage = useCallback(
    (message: IDeleteMessage) => {
      dispatch(messagesActions.deleteMessage(message));
    },
    [dispatch]
  );

  const editMessageRequest = useCallback(
    (message: IEditMessage) => {
      dispatch(messagesActions.editMessageRequest(message));
    },
    [dispatch]
  );

  const editMessage = useCallback(
    (message: IEditMessage) => {
      dispatch(messagesActions.editMessage(message));
    },
    [dispatch]
  );

  return {
    messagesState,
    connect,
    disconnect,
    getAllMessages,
    setAllMessages,
    getConnectedClientsCount,
    setConnectedClientsCount,
    getMessage,
    sendMessage,
    deleteMessageRequest,
    deleteMessage,
    editMessageRequest,
    editMessage,
  };
};
