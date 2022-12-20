import { TableRow, TableCell } from '@mui/material';

type Props = {
  emptyRows: number;
};

export default function TableEmptyRows({ emptyRows }: Props) {
  console.log({ emptyRows });
  if (!emptyRows) {
    return null;
  }

  return (
    <TableRow>
      <TableCell colSpan={9}>No data</TableCell>
    </TableRow>
  );
}
