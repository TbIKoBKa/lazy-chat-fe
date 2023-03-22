import { FC, MouseEventHandler, useMemo } from 'react';
import { Flex, Box, Text } from '@mantine/core';

import { IMessage } from '@/store/messages/types';
import { styles } from './styles';
import { formatDate } from '@/tools/utils';

interface IMessageProps {
  message: IMessage;
  onRightClick?: MouseEventHandler<HTMLDivElement>;
}

export const Message: FC<IMessageProps> = ({ message, onRightClick }) => {
  const { text, sender, createdAt, updatedAt } = message;

  const isEdited = useMemo(() => {
    return createdAt !== updatedAt;
  }, [updatedAt, createdAt]);

  return (
    <Flex direction='column' sx={styles.root} onContextMenu={onRightClick}>
      <Text sx={styles.text}>{text}</Text>
      <Flex justify='space-between' gap={10}>
        <Text sx={styles.bottomText}>{sender || 'Anonymous'}</Text>
        <Box sx={styles.dateWrapper}>
          {isEdited && (
            <Text component='span' color='red'>
              *
            </Text>
          )}
          <Text sx={styles.bottomText}>
            {formatDate(isEdited ? updatedAt : createdAt)}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
