import { forwardRef } from 'react';
import { Box, BoxProps } from '@mui/material';

const Image = forwardRef<HTMLSpanElement, BoxProps>(({ sx, ...other }, ref) => {
  const content = (
    <Box
      component='img'
      sx={{ width: 1, height: 1, objectFit: 'cover' }}
      {...other}
      src='/no_data.svg'
    />
  );

  return (
    <Box
      ref={ref}
      component='span'
      sx={{
        lineHeight: 1,
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        '& .wrapper': {
          width: 1,
          height: 1,
          backgroundSize: 'cover !important',
        },
        ...sx,
      }}
    >
      {content}
    </Box>
  );
});

export default Image;
