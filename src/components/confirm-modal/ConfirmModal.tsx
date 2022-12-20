import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import ConfirmModalProps from '../../types/confirm-modal';

export default function ConfirmModal({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}: ConfirmModalProps) {
  return (
    <Dialog fullWidth maxWidth='xs' open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && (
        <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>
      )}

      <DialogActions>
        {action}

        <Button variant='outlined' color='inherit' onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
