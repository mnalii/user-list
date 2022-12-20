import { Theme } from '@mui/material/styles';
import {
  Box,
  SxProps,
  TablePagination,
  TablePaginationProps,
} from '@mui/material';

type Props = {
  sx?: SxProps<Theme>;
};

export default function TablePaginationCustom({
  rowsPerPageOptions = [5, 10, 25],
  sx,
  ...other
}: Props & TablePaginationProps) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        {...other}
      />
    </Box>
  );
}
