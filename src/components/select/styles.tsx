import { Button, Menu, Box, OutlinedInput } from '@mui/material';
import styled from '@emotion/styled';

export const StyledButton = styled(Button)({
  margin: '50px 50px',
  fontSize: '1.125rem',
  width: '320px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '2px solid #007bff',
  borderRadius: '10px',
  backgroundColor: 'white',
  cursor: 'pointer',
  padding: '0px 20px',
});

export const StyledSearchBarContainer = styled(Box)({
  padding: 10,
  display: 'flex',
  justifyContent: 'space-evenly',
  cursor: 'default',
});

export const StyledSearch = styled('div')({
  position: 'relative',
  width: '100%',
});

export const StyledSearchIcon = styled('div')({
  padding: '0 20px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledInputBase = styled(OutlinedInput)({
  input: {
    padding: '10px 10px 10px 0',
    paddingLeft: `calc(1em + 40px)`,
    width: '100%',
  },
});

export const StyledMenu = styled(Menu)({
  '& .MuiPopover-paper': {
    maxWidth: 'fit-content',
  },
});
