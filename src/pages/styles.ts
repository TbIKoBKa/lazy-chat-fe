import { MantineTheme } from '@mantine/core';

export const styles = {
  container: {
    flex: 1,
    flexDirection: 'column' as const,
  },
  wrapper: {
    flex: 1,
  },
  messagesWrapper: {
    flex: 1,
  },
  messages: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 10,
    flex: 1,
    width: '100%',
  },
  message: (isAuthor: boolean) => ({
    display: 'flex',
    justifyContent: isAuthor ? 'right' : 'left',
    width: '100%',
  }),
  submitButton: (theme: MantineTheme) => {
    return {
      background: theme.colors.blue[0],
      '&:disabled': {
        background: `${theme.colors.blue[0]}66`,
        cursor: 'not-allowed',
        pointerEvents: 'all' as const,
      },
    };
  },
  editWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
};
