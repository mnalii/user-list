import { TextField, TextFieldProps } from '@mui/material';
import { useRef, useEffect } from 'react';

type Props = TextFieldProps & {
  setSearchOption: React.Dispatch<React.SetStateAction<string>>;
};

export const AutoFocusTextField = ({ setSearchOption, ...other }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputRef.current) {
        inputRef?.current.focus();
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <TextField
      fullWidth
      onKeyDown={(e) => e.stopPropagation()}
      inputRef={inputRef}
      placeholder='Search group access...'
      {...other}
      sx={{
        input: {
          padding: '10px 10px 10px 10px',
          paddingLeft: `calc(1em + 40px)`,
          width: '100%',
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#9e9e9e',
          },
        },
      }}
    />
  );
};
