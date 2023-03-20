import { MantineTheme } from '@mantine/core';

export const styles = {
  container: {
    padding: '16px',
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
  },
  message: (theme: MantineTheme) => ({
    minWidth: 200,
    maxWidth: 400,
    borderRadius: '10px 20px 20px 20px',
    padding: '10px 20px',
    color: theme.white,
    backgroundColor: theme.colors.teal[1],
    boxShadow: `0px 0px 20px #00000055`,
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
};
