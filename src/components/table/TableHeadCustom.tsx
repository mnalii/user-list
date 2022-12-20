import { Theme } from '@mui/material/styles';
import {
  SxProps,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from '@mui/material';

type Props = {
  order?: 'asc' | 'desc';
  orderBy?: string;
  headLabel: any[];
  onSort?: (id: string) => void;
  sx?: SxProps<Theme>;
};

export default function TableHeadCustom({
  order,
  orderBy,
  headLabel,
  onSort,
  sx,
}: Props) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {onSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onSort(headCell.id)}
                sx={{ textTransform: 'capitalize' }}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
