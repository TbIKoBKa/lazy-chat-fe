// Core
import { FC } from 'react';
import { Loader as LoaderCore, LoaderProps } from '@mantine/core';

interface ILoaderProps extends LoaderProps {
  fixed?: boolean;
}

export const Loader: FC<ILoaderProps> = ({ fixed, ...props }) => {
  return (
    <LoaderCore
      {...props}
      sx={{
        ...props.sx,
        ...(fixed
          ? {
              position: 'fixed',
              top: '50%',
              transform: 'translateY(-50%)',
              left: 0,
              right: 0,
              margin: '0 auto',
            }
          : {}),
      }}
    />
  );
};
