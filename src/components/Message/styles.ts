import { MantineTheme } from '@mantine/core';

export const styles = {
  root: (theme: MantineTheme) => ({
    minWidth: 200,
    maxWidth: 400,
    borderRadius: '10px 20px 20px 20px',
    padding: '10px 20px',
    color: theme.white,
    backgroundColor: theme.colors.teal[2],
    boxShadow: `0px 0px 20px #00000055`,
  }),
  text: {},
  bottomText: {
    fontSize: 12,
    opacity: 0.4,
  },
  dateWrapper: {
    display: 'flex',
    gap: 3,
  },
};
