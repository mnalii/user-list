import { Link as ReactLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';

export default function Header() {
  return (
    <AppBar
      position='static'
      color='default'
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <nav>
          <Link
            component={ReactLink}
            to='/'
            className='nounderline'
            variant='button'
            color='text.primary'
            sx={{ my: 1, mx: 1.5, textDecoration: 'none' }}
          >
            User List
          </Link>
          <Link
            component={ReactLink}
            to='/user/new'
            variant='button'
            color='text.primary'
            sx={{ my: 1, mx: 1.5, textDecoration: 'none' }}
          >
            Add New User
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
