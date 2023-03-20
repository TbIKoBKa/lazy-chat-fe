import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    teal: ['#2e454d', '#61a1b9'],
    blue: ['#228be6'],
  },
  components: {
    Loader: {
      defaultProps: {
        color: '#228be6',
      },
    },
  },
};
