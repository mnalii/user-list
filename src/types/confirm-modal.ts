// @mui
import { DialogProps } from '@mui/material';

interface ConfirmModalProps extends Omit<DialogProps, 'title'> {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
}

export default ConfirmModalProps;
