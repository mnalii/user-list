import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../types/user';

const initialState: IUserState = {
  isLoading: false,
  error: null,
  users: [],
  user: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addUser(state, action) {
      state.isLoading = false;
      state.users = [action.payload, ...state.users];
    },
    updateUser(state, action) {
      const { id, values } = action.payload;

      const index = state.users.findIndex((user) => user.id === id);
      state.users[index] = values;
    },
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      const index = state.users.findIndex((user) => user.id === action.payload);
      state.user = state.users[index];
    },
    deleteUser(state, action) {
      state.isLoading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export default slice.reducer;
export const {
  addUser,
  deleteUser,
  getUserSuccess,
  getUsersSuccess,
  hasError,
  startLoading,
  updateUser,
} = slice.actions;
