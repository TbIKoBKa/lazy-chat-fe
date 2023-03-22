import { MantineTheme } from '@mantine/core';

export const styles = {
  header: (theme: MantineTheme) => ({
    background: `linear-gradient(${theme.colors.teal[3]}, ${theme.colors.teal[4]})`,
    zIndex: 10,
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 10px #000000aa',
  }),
  footer: (theme: MantineTheme) => ({
    background: `linear-gradient(${theme.colors.teal[5]}, ${theme.colors.teal[6]})`,
    zIndex: 10,
  }),
};
