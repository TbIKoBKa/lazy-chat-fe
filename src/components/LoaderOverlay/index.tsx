import { FC, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import { Flex, Text } from '@mantine/core';

import { Loader } from '../Loader';

interface ILoaderOverlayProps extends PropsWithChildren {
  isLoading?: boolean;
  errorMessageProps?: {
    noResultsText?: ReactNode;
    showNoResultsMessage?: boolean;
    centerErrorMessage?: boolean;
  };
  scrollDownOnMounted?: boolean;
}

export const LoaderOverlay: FC<ILoaderOverlayProps> = ({
  isLoading,
  errorMessageProps = {},
  children,
}) => {
  const { centerErrorMessage, noResultsText, showNoResultsMessage } =
    errorMessageProps;

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.addEventListener(
      'DOMNodeInserted',
      () => {
        window.scroll({
          top: document.body.scrollHeight,
        });
      },
      {
        once: true,
      }
    );
  }, []);

  return (
    <Flex
      ref={listRef}
      direction='column'
      justify={
        isLoading || (centerErrorMessage && showNoResultsMessage)
          ? 'center'
          : 'start'
      }
      align={
        isLoading || (centerErrorMessage && showNoResultsMessage)
          ? 'center'
          : 'start'
      }
      sx={{
        flex: 1,
      }}
    >
      {isLoading ? (
        <Loader size='lg' />
      ) : showNoResultsMessage ? (
        <Text w='100%' align='center' color='dimmed'>
          {noResultsText}
        </Text>
      ) : (
        children
      )}
    </Flex>
  );
};
