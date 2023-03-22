import { FC, useMemo } from 'react';

import { Box, Button, Transition } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';

import { styles } from './styles';

interface IContextMenuProps {
  x: number;
  y: number;
  opened: boolean;
  onClose: () => void;
  isMeAuthor: boolean;
  onCopy: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ContextMenu: FC<IContextMenuProps> = ({
  x,
  y,
  opened,
  onClose,
  isMeAuthor,
  onCopy,
  onDelete,
  onEdit,
}) => {
  const ref = useClickOutside(onClose);

  const buttons = useMemo(() => {
    const defaultButtons = [
      {
        label: 'Copy',
        action: onCopy,
      },
      {
        label: 'Edit',
        action: onEdit,
      },
      {
        label: 'Delete',
        action: onDelete,
      },
    ];

    return isMeAuthor ? defaultButtons : defaultButtons.slice(0, 1);
  }, [onCopy, onEdit, onDelete, isMeAuthor]);

  return (
    <Transition
      mounted={opened}
      transition='fade'
      duration={100}
      timingFunction='ease'
    >
      {(tstyles) => (
        <Box
          style={{
            transform: `translate(${isMeAuthor ? x - 122 : x}px, ${y}px)`,
          }}
          sx={styles.root}
        >
          <Box ref={ref} style={tstyles}>
            {buttons?.map((button, i) => {
              return (
                <Button key={i} sx={styles.button} onClick={button.action}>
                  {button.label}
                </Button>
              );
            })}
          </Box>
        </Box>
      )}
    </Transition>
  );
};
