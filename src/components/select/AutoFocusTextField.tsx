import { TextField, TextFieldProps } from '@mui/material';
import { useRef, useEffect } from 'react';

export default function AutoFocusTextField({ ...other }: TextFieldProps) {
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

  return <TextField inputRef={inputRef} {...other} />;
}
