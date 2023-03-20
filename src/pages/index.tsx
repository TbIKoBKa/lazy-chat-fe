import { useEffect, useCallback } from 'react';
import Head from 'next/head';
import {
  Container,
  Center,
  Title,
  List,
  Input,
  Button,
  Box,
  Flex,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { useMessages } from '@/store/messages';
import { LoaderOverlay } from '@/components/LoaderOverlay';
import { styles } from './styles';
import { ISendMessage } from '@/store/messages/types';

export default function Home() {
  const {
    messagesState: { isLoading, socket, messages },
    connect,
    disconnect,
    getAllMessages,
    getMessage,
    setAllMessages,
    sendMessage,
  } = useMessages();

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        getAllMessages();
      });
      socket.on('exception', (data) => {
        console.log('event', data);
      });
      socket.on('disconnect', () => {
        console.log('Disconnected');
      });
      socket.on('findAllMessage', (data) => {
        setAllMessages(data);
      });
      socket.on('createMessage', (data) => {
        getMessage(data);
      });
    }
  }, [socket]);

  const { onSubmit, reset, getInputProps, isDirty } = useForm<ISendMessage>({
    initialValues: {
      text: '',
    },
  });

  const onSubmitHandle = useCallback(
    (data: ISendMessage) => {
      sendMessage(data);
      reset();
    },
    [sendMessage, reset]
  );

  return (
    <>
      <Head>
        <title>Lazy Chat</title>
        <meta name='description' content='Lazy chat using nextjs' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container display='flex' sx={styles.container} mih='100vh'>
        <Center mb={30}>
          <Title color='white'>Lazy Chat</Title>
        </Center>
        <Flex direction='column' gap={30} sx={styles.wrapper}>
          <Flex direction='column' sx={styles.messagesWrapper}>
            <LoaderOverlay
              isLoading={isLoading || !messages}
              errorMessageProps={{
                showNoResultsMessage: !messages?.length,
                noResultsText: 'No messages yet',
                centerErrorMessage: true,
              }}
            >
              <List listStyleType='none' sx={styles.messages}>
                {messages?.map((message) => {
                  return (
                    <List.Item key={message.id} sx={styles.message}>
                      {message.text}
                    </List.Item>
                  );
                })}
              </List>
            </LoaderOverlay>
          </Flex>
          <form onSubmit={onSubmit(onSubmitHandle)}>
            <Flex direction='column' gap={10}>
              <Input
                placeholder='Enter a message...'
                {...getInputProps('text')}
              />
              <Flex justify='space-between'>
                <Box />
                <Button
                  sx={styles.submitButton}
                  disabled={!isDirty('text')}
                  type='submit'
                >
                  Send
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Container>
    </>
  );
}
