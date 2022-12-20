import { useState } from 'react';
import { format } from 'date-fns';

import {
  Button,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import User from '../../types/user';

import Popover from '../popover';
import ConfirmModal from '../confirm-modal';

type Props = {
  row: User;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function TableRowCustom({ row, onEditRow, onDeleteRow }: Props) {
  const {
    username,
    firstname,
    lastname,
    email,
    passwordExpiredDate,
    groupAccess,
  } = row;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align='left'>{username}</TableCell>
        <TableCell align='left'>{firstname}</TableCell>
        <TableCell align='left'>{lastname}</TableCell>
        <TableCell align='left'>{email}</TableCell>
        <TableCell align='left'>
          {/* {passwordExpiredDate} */}
          {format(new Date(passwordExpiredDate), 'dd MMMM yyyy hh:mm')}
        </TableCell>
        <TableCell align='left'>{groupAccess}</TableCell>
        <TableCell align='right'>
          <IconButton
            color={openPopover ? 'inherit' : 'default'}
            onClick={handleOpenPopover}
          >
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={openPopover}
        onClose={handleClosePopover}
        arrow='right-center'
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
        >
          <DeleteIcon sx={{ color: 'error.main' }} />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <CreateIcon sx={{ color: 'primary.main' }} />
          Edit
        </MenuItem>
      </Popover>

      <ConfirmModal
        open={openConfirm}
        onClose={handleCloseConfirm}
        title='Delete'
        content='Are you sure want to delete?'
        action={
          <Button variant='contained' color='error' onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
