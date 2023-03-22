import { FC, PropsWithChildren, ReactNode } from 'react';
import { Center, Flex, Title, Text, Grid } from '@mantine/core';

import { styles } from './styles';
import { useMessages } from '@/store/messages';

interface ILayoutProps extends PropsWithChildren {
  fixedFooterComponent?: ReactNode;
  pb?: string | number;
}

export const Layout: FC<ILayoutProps> = ({
  children,
  fixedFooterComponent,
  pb,
}) => {
  const {
    messagesState: { clientsCount },
  } = useMessages();

  return (
    <Flex
      display='flex'
      direction='column'
      mih='100vh'
      p='100px 0 16px'
      pb={pb}
    >
      <Grid
        sx={styles.header}
        justify='space-between'
        pos='fixed'
        p={16}
        top={0}
        left={0}
        right={0}
        h={90}
      >
        <Grid.Col span={2} p={0}>
          <Flex
            h='100%'
            direction='column'
            gap={6}
            justify='center'
            align='center'
          >
            <Text size={28} weight={600} lh={1} color='white'>
              {clientsCount}
            </Text>
            <Text lh={1} weight={500} color='dimmed'>
              Connections
            </Text>
          </Flex>
        </Grid.Col>
        <Grid.Col span={8} p={0}>
          <Center h='100%'>
            <Title color='white'>Lazy Chat</Title>
          </Center>
        </Grid.Col>
        <Grid.Col span={2} p={0} />
      </Grid>
      {children}
      {fixedFooterComponent && (
        <Flex
          sx={styles.footer}
          pos='fixed'
          p={16}
          bottom={0}
          left={0}
          right={0}
        >
          {fixedFooterComponent}
        </Flex>
      )}
    </Flex>
  );
};
