import {
  useEffect,
  useCallback,
  useRef,
  useState,
  MouseEventHandler,
} from 'react';
import Head from 'next/head';
import { Container, List, Input, Button, Box, Flex, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useMessages } from '@/store/messages';
import { ContextMenu, Layout, LoaderOverlay, Message } from '@/components';
import { styles } from './styles';
import { IMessage, ISendMessage } from '@/store/messages/types';

export default function Home() {
  const listRef = useRef<HTMLOListElement>(null);

  const {
    messagesState: { isLoading, socket, messages },
    connect,
    disconnect,
    getMessage,
    setAllMessages,
    sendMessage,
    deleteMessageRequest,
    deleteMessage,
    editMessageRequest,
    editMessage,
    setConnectedClientsCount,
  } = useMessages();

  const { onSubmit, reset, setValues, getInputProps, isDirty } =
    useForm<ISendMessage>({
      initialValues: {
        text: '',
      },
    });

  const [editingMessage, setEditingMessage] = useState<IMessage | null>(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [contextMenuMessage, setContextMenuMessage] = useState<IMessage | null>(
    null
  );

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        console.info('Connected');
      });
      socket.on('exception', (data) => {
        console.log('event', data);
      });
      socket.on('disconnect', () => {
        console.log('Disconnected');
      });
      socket.on('getConnectedClientsCount', (data) => {
        setConnectedClientsCount(data);
      });
      socket.on('findAllMessage', (data) => {
        setAllMessages(data);
      });
      socket.on('createMessage', (data) => {
        getMessage(data);
      });
      socket.on('removeMessage', (data) => {
        deleteMessage(data);
      });
      socket.on('updateMessage', (data) => {
        editMessage(data);
      });
    }
  }, [socket]);

  const onCloseContextMenu = useCallback(() => {
    setContextMenuVisible(false);
  }, []);

  const onRightClick = useCallback(
    (message: IMessage): MouseEventHandler<HTMLDivElement> =>
      (event) => {
        event.preventDefault();
        const rect = listRef.current?.getBoundingClientRect();

        if (rect) {
          setContextMenuPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        }

        setContextMenuVisible(true);
        setContextMenuMessage(message);
      },
    []
  );

  const onCopyHandle = useCallback(() => {
    if (contextMenuMessage) {
      try {
        navigator.clipboard.writeText(contextMenuMessage.text);
      } catch (error) {
        console.error('Copy error: ', error);
      }
    }

    setContextMenuVisible(false);
  }, [contextMenuMessage]);

  const onEditHandle = useCallback(() => {
    setEditingMessage(contextMenuMessage);
    setContextMenuVisible(false);
    setValues({
      text: contextMenuMessage?.text,
    });
  }, [contextMenuMessage]);

  const onDeleteHandle = useCallback(() => {
    if (contextMenuMessage) {
      deleteMessageRequest({
        id: contextMenuMessage.id,
      });
    }

    setContextMenuVisible(false);
  }, [contextMenuMessage]);

  const onCancelEditHandle = useCallback(() => {
    setEditingMessage(null);
    reset();
  }, [setEditingMessage, reset]);

  const onSubmitHandle = useCallback(
    (data: ISendMessage) => {
      if (editingMessage) {
        editMessageRequest({
          id: editingMessage.id,
          text: data.text,
        });
        onCancelEditHandle();
      } else {
        sendMessage(data);
        reset();

        listRef.current?.addEventListener(
          'DOMNodeInserted',
          () => {
            window.scroll({
              top: document.body.scrollHeight,
            });
          },
          {
            once: true,
          }
        );
      }
    },
    [sendMessage, reset, editingMessage]
  );

  return (
    <>
      <Head>
        <title>Lazy Chat</title>
        <meta name='description' content='Lazy chat using nextjs' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout
        fixedFooterComponent={
          <Container display='flex' w='100%' sx={styles.container}>
            <form onSubmit={onSubmit(onSubmitHandle)}>
              <Flex direction='column' gap={10}>
                <Input
                  placeholder='Enter a message...'
                  {...getInputProps('text')}
                />
                <Flex justify='space-between'>
                  {editingMessage ? (
                    <Box sx={styles.editWrapper}>
                      <Text color='grey'>
                        RESOURSE:{' '}
                        <Text
                          component='span'
                          color='white'
                          weight={500}
                          italic
                        >
                          {editingMessage.text}
                        </Text>
                      </Text>
                      <Button color='red' onClick={onCancelEditHandle}>
                        CANCEL
                      </Button>
                    </Box>
                  ) : (
                    <Box />
                  )}
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
          </Container>
        }
        pb={140}
      >
        <Container display='flex' w='100%' sx={styles.container}>
          <Flex direction='column' gap={30} sx={styles.wrapper}>
            <Flex direction='column' sx={styles.messagesWrapper}>
              <LoaderOverlay
                isLoading={isLoading || !messages}
                errorMessageProps={{
                  showNoResultsMessage: !messages?.length,
                  noResultsText: 'No messages yet',
                  centerErrorMessage: true,
                }}
                scrollDownOnMounted
              >
                <List ref={listRef} listStyleType='none' sx={styles.messages}>
                  {messages?.map((message) => {
                    const isAuthor = message.sender === socket?.id;

                    return (
                      <List.Item key={message.id} sx={styles.message(isAuthor)}>
                        <Message
                          message={message}
                          onRightClick={onRightClick(message)}
                        />
                      </List.Item>
                    );
                  })}
                </List>
                <ContextMenu
                  x={contextMenuPosition.x}
                  y={contextMenuPosition.y}
                  opened={contextMenuVisible}
                  onClose={onCloseContextMenu}
                  isMeAuthor={socket?.id === contextMenuMessage?.sender}
                  onCopy={onCopyHandle}
                  onEdit={onEditHandle}
                  onDelete={onDeleteHandle}
                />
              </LoaderOverlay>
            </Flex>
          </Flex>
        </Container>
      </Layout>
    </>
  );
}
