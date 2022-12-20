import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import { useDispatch, useSelector } from '../redux/store';
import { getUserSuccess } from '../redux/slices/user';

import AddOrEditUser from '../section/AddOrEditUser';

export default function EditUser() {
  const { id } = useParams();
  const { user, users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSuccess(id));
  }, []);

  console.log(user);

  return (
    <Box sx={{ py: 4 }}>
      <Container>
        {user && <AddOrEditUser isEdit selectedUser={user} />}
      </Container>
    </Box>
  );
}
