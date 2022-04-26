import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const SignInForm: React.FC<{
  emailErrMsg?: string;
  passwordErrMsg?: string;
  resetErrMsg?: () => void;
  onSignIn?: (email: string, password: string) => Promise<void>;
}> = ({ emailErrMsg, passwordErrMsg, resetErrMsg, onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const items = [
    {
      label: 'email',
      value: email,
      error: !!emailErrMsg,
      setValue: (value: string) => {
        setEmail(value);
      },
      helperText: emailErrMsg,
      autoComplete: 'email',
    },
    {
      label: 'password',
      value: password,
      error: !!passwordErrMsg,
      setValue: (value: string) => {
        setPassword(value);
      },
      helperText: passwordErrMsg,
      autoComplete: 'current-password',
    },
  ];
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        !!onSignIn && onSignIn(email, password);
      }}
    >
      {items.map((item, index) => (
        <div key={index}>
          <CustomTextField
            label={item.label}
            value={item.value}
            error={item.error}
            setValue={item.setValue}
            helperText={item.helperText}
            autoComplete={item.autoComplete}
            resetErrMsg={resetErrMsg}
          />
          {index !== items.length - 1 && <div style={{ height: 24 }} />}
        </div>
      ))}
      <div style={{ height: 24 }} />
      <Button
        type='submit'
        color='primary'
        variant='contained'
        fullWidth
        style={{ color: 'white' }}
      >
        サインイン
      </Button>
    </form>
  );
};

export default SignInForm;

const CustomTextField: React.FC<{
  label: string;
  value: string;
  error: boolean;
  setValue: (value: string) => void;
  helperText?: string;
  autoComplete: string;
  resetErrMsg?: () => void;
}> = ({
  label,
  value,
  error,
  setValue,
  helperText,
  autoComplete,
  resetErrMsg,
}) => {
  return (
    <TextField
      variant='outlined'
      size='small'
      fullWidth
      type={label}
      label={label}
      value={value}
      error={error}
      onChange={(e) => {
        !!resetErrMsg && resetErrMsg();
        setValue(e.target.value);
      }}
      style={{ color: '#aaa', fontWeight: 500 }}
      helperText={helperText}
      autoComplete={autoComplete}
      required
    />
  );
};
