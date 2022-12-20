type User = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordExpiredDate: string;
  groupAccess: string;
};

export type IUserState = {
  isLoading: boolean;
  error: Error | string | null;
  users: User[];
  user: User | null;
};

export default User;
