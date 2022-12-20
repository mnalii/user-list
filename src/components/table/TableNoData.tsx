import {
  TableRow,
  TableCell,
  Stack,
  StackProps,
  Typography,
} from '@mui/material';

import Image from '../image';

interface TableProps extends StackProps {
  isNotFound: boolean;
  title: string;
  description?: string;
}

export default function TableNoData({
  isNotFound,
  title,
  description,
  sx,
  ...other
}: TableProps) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <Stack
            alignItems='center'
            justifyContent='center'
            sx={{
              height: 200,
              textAlign: 'center',
              ...sx,
            }}
            {...other}
          >
            <Image />
            <Typography variant='h5' gutterBottom>
              {title}
            </Typography>

            {description && (
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {description}
              </Typography>
            )}
          </Stack>
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
