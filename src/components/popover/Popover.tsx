import { Popover as MuiPopover, PopoverOrigin } from '@mui/material';

import getPosition from './getPosition';
import { PopoverPropTypes } from '../../types/popover';

import StyledArrow from './StyledArrow';

export default function Popover({
  open,
  children,
  arrow = 'top-right',
  disabledArrow,
  sx,
  ...other
}: PopoverPropTypes) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <MuiPopover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin as PopoverOrigin}
      transformOrigin={transformOrigin as PopoverOrigin}
      PaperProps={{
        sx: {
          p: 1,
          width: 'auto',
          overflow: 'inherit',
          ...style,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20, flexShrink: 0 },
          },
          ...sx,
        },
      }}
      {...other}
    >
      {!disabledArrow && <StyledArrow arrow={arrow} />}

      {children}
    </MuiPopover>
  );
}
