import { useState, useCallback, useMemo, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import {
  MenuItem,
  Button,
  Grid,
  TextField,
  Card,
  Stack,
  Typography,
} from '@mui/material';

import { FormProvider, RHFSelect, RHFTextfield } from '../components/hook-form';
import SearchboxSelect from '../components/searchbox-select';
import User from '../types/user';

import { useDispatch, useSelector } from '../redux/store';
import { addUser, updateUser } from '../redux/slices/user';

const userAccess = [
  {
    label: 'Admin',
    value: 'Admin',
  },
  {
    label: 'User',
    value: 'User',
  },
  {
    label: 'Manager',
    value: 'Manager',
  },
  {
    value: 'Developer',
    label: 'Developer',
  },
];

type FormValuesProps = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordExpiredDate: string;
  groupAccess: string;
};

type Props = {
  isEdit?: boolean;
  selectedUser?: User;
};

export default function AddOrEditUser({ isEdit, selectedUser }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.user);

  const [searchOption, setSearchOption] = useState('');

  const filterOption = userAccess.filter(
    (u) => u.label.toLowerCase().indexOf(searchOption.toLowerCase()) !== -1
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchOption(e.target.value);
  };

  const Schema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm password is required'),
    passwordExpiredDate: Yup.date().min(
      new Date(),
      'Expired date cannot be less than current time'
    ),
    groupAccess: Yup.string().required('Group access is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstname: selectedUser?.firstname || '',
      lastname: selectedUser?.lastname || '',
      username: selectedUser?.username || '',
      email: selectedUser?.email || '',
      password: selectedUser?.password || '',
      confirmPassword: selectedUser?.confirmPassword || '',
      passwordExpiredDate:
        selectedUser?.passwordExpiredDate || new Date().toISOString(),
      groupAccess: selectedUser?.groupAccess || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedUser]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (isEdit) {
        dispatch(
          updateUser({
            id: selectedUser?.id,
            values: { id: selectedUser?.id, ...data },
          })
        );
      } else {
        dispatch(
          addUser({
            id: uuidv4(),
            ...data,
          })
        );
      }

      navigate('/');
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  useEffect(() => {
    if (isEdit && selectedUser) {
      reset(defaultValues);
    }

    // if (!isEdit) {
    //   reset(defaultValues);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, selectedUser]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }} elevation={2}>
        <Typography variant='h6' mb={2}>
          Add New User
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <RHFTextfield name='firstname' label='First Name' />
              <RHFTextfield name='password' label='Password' type='password' />
              <RHFTextfield name='username' label='User Name' />
              <Controller
                name='passwordExpiredDate'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MobileDateTimePicker
                    {...field}
                    onChange={(newValue: Date | null) =>
                      field.onChange(newValue)
                    }
                    label='Password Expired Date'
                    inputFormat='dd/MM/yyyy hh:mm a'
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!error}
                        helperText={error && error?.message}
                      />
                    )}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <RHFTextfield name='lastname' label='Last Name' />

              <RHFTextfield
                name='confirmPassword'
                label='Confirm Password'
                type='password'
              />

              <RHFTextfield name='email' label='Email' />

              <RHFSelect
                placeholder='Choose group access'
                name='groupAccess'
                label='Group Access'
              >
                <SearchboxSelect
                  value={searchOption}
                  handleChange={handleSearchChange}
                  setSearchOption={setSearchOption}
                />

                {filterOption.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}

                {filterOption.length === 0 && (
                  <MenuItem value='' disabled>
                    No result
                  </MenuItem>
                )}
              </RHFSelect>
            </Stack>
          </Grid>
        </Grid>
        <Button sx={{ mt: 2 }} variant='outlined' type='submit'>
          Submit
        </Button>
      </Card>
    </FormProvider>
  );
}
