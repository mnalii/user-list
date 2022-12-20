import { Box, Container } from '@mui/material';

import AddOrEditUser from '../section/AddOrEditUser';

export default function AddUser() {
  return (
    <Box sx={{ py: 4 }}>
      <Container>
        <AddOrEditUser />
      </Container>
    </Box>
  );
}
