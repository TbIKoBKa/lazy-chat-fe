import { useCallback } from 'react';

import { useSelector, useDispatch } from '@/tools/hooks';
import { messagesActions } from './slice';
import { IMessage, ISendMessage } from './types';

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

  return {
    messagesState,
    connect,
    disconnect,
    getAllMessages,
    setAllMessages,
    getMessage,
    sendMessage,
  };
};
