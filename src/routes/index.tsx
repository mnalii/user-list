import { useRoutes } from 'react-router-dom';

import Main from '../layouts/Main';

import UserListPage from '../pages/UserListPage';
import AddUser from '../pages/AddUser';
import EditUser from '../pages/EditUser';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Main />,
      children: [
        {
          element: <UserListPage />,
          index: true,
        },
        {
          element: <AddUser />,
          path: 'user/new',
        },
        {
          element: <EditUser />,
          path: 'user/:id',
        },
      ],
    },
  ]);
}
