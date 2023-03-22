import { MantineTheme } from '@mantine/core';

export const styles = {
  root: (theme: MantineTheme) => ({
    position: 'absolute' as const,
    backgroundColor: theme.colors.teal[0],
    border: '1px solid #44464A',
    borderRadius: 5,
    width: 122,
    padding: '3px 0',
    zIndex: 100,
  }),
  button: (theme: MantineTheme) => ({
    height: 'fit-content',
    width: '100%',
    padding: '4px 15px',
    backgroundColor: 'transparent',
    borderRadius: 8,
    zIndex: 1,
    '&:hover': {
      backgroundColor: theme.colors.teal[1],
    },
    '&:not(:last-child):not(:hover)::after': {
      content: `''`,
      display: 'block',
      width: '90%',
      position: 'absolute' as const,
      bottom: -1,
      left: 0,
      right: 0,
      margin: '0 auto',
      borderBottom: '1px solid #44464A',
    },
    '& .mantine-Button-inner': {
      justifyContent: 'space-between',
    },
    '& .mantine-Button-label': {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: '24px',
    },
  }),
};
