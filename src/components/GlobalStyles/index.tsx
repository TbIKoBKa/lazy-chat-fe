import { FC } from 'react';
import { Global } from '@mantine/core';

export const GlobalStyles: FC = () => {
  return (
    <Global
      styles={(theme) => ({
        '*': {
          boxSizing: 'border-box',
          padding: 0,
          margin: 0,
        },

        'html, body': {
          maxWidth: '100vw',
          overflowX: 'hidden',
        },

        body: {
          minHeight: '100vh',
          background: `linear-gradient(${theme.colors.teal[1]}, ${theme.colors.teal[0]})`,
        },

        '#__next': {
          minHeight: '100vh',
        },

        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
      })}
    />
  );
};
