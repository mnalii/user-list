import { useState, useRef, forwardRef } from 'react';
import { Divider, MenuItem, Popover, TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

import AutoFocusTextField from './AutoFocusTextField';
import {
  StyledButton,
  StyledSearch,
  StyledSearchBarContainer,
  StyledSearchIcon,
} from './styles';

const options = [
  {
    value: 'Susan',
    label: 'Susan',
  },
  {
    value: 'Rahul',
    label: 'Rahul',
  },
  {
    value: 'Rasul',
    label: 'Rasul',
  },
  {
    value: 'Kamla',
    label: 'Kamla',
  },
];

export default function Select({ ...other }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selection, setSelection] = useState('');
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = () => {
    if (buttonRef?.current) {
      setAnchorEl(buttonRef.current);
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLLIElement>) => {
    if (
      e.currentTarget.innerText !== selection &&
      e.currentTarget.innerText !== ''
    ) {
      setSelection(e.currentTarget.innerText);
    }

    setSearchText('');
    setAnchorEl(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  function renderOptions() {
    const displayOptions = options
      .map((item) => {
        if (item.label.toLowerCase().includes(searchText.toLowerCase())) {
          return item;
        }
        return undefined;
      })
      .filter((item) => item !== undefined);

    return (
      // <Popover
      //   open={open}
      //   onClose={handleClose}
      //   anchorEl={anchorEl}
      //   anchorOrigin={{
      //     vertical: 'bottom',
      //     horizontal: 'left',
      //   }}
      // >
      <>
        <StyledSearchBarContainer>
          <StyledSearch>
            <StyledSearchIcon>
              <SearchIcon />
            </StyledSearchIcon>

            <AutoFocusTextField
              onChange={handleSearchChange}
              sx={{
                input: {
                  padding: '10px 10px 10px 0',
                  paddingLeft: `calc(1em + 40px)`,
                  width: '100%',
                },
              }}
            />
          </StyledSearch>
        </StyledSearchBarContainer>
        <Divider />
        {displayOptions.length === 0 && <MenuItem>Not result</MenuItem>}
        {displayOptions.map((item, index) => {
          return (
            <option
              key={index}
              value={item?.label}
              // onClick={(e) => handleClose(e)}
              // selected={selection === item?.label}
            >
              {item?.label}
            </option>
          );
        })}
      </>
      // </Popover>
    );
  }

  return (
    <>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </>
  );
}
