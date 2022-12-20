import { PopoverProps } from '@mui/material';

export type ArrowTypes =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';

export interface PopoverPropTypes extends Omit<PopoverProps, 'open'> {
  open: HTMLElement | null;
  arrow?: ArrowTypes;
  disabledArrow?: boolean;
}
