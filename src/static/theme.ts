import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    teal: [
      '#2e454d',
      '#11313a',
      '#61a1b9',
      '#85d4ef9b',
      '#85d4ef4a',
      '#4a7d97',
      '#284554',
    ],
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
