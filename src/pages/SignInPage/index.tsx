import SignInForm from '@bit/chihatw.lang-gym.sign-in-form';
import { Container } from '@mui/material';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from '@firebase/auth';

import { auth } from '../../repositories/firebase';

const SignInPage = () => {
  const [emailErrMsg, setEmailErrMsg] = useState<string>('');
  const [passwordErrMsg, setPasswordErrMsg] = useState<string>('');

  const resetErrMsg = () => {
    setEmailErrMsg('');
    setPasswordErrMsg('');
  };

  const onSignIn = async (email: string, password: string) => {
    const { error } = await onSignInMail(email, password);
    setEmailErrMsg(error.emailErrMsg);
    setPasswordErrMsg(error.passwordErrMsg);
  };
  return (
    <Container maxWidth='xs'>
      <div style={{ paddingTop: 120 }}>
        <SignInForm
          emailErrMsg={emailErrMsg}
          passwordErrMsg={passwordErrMsg}
          resetErrMsg={resetErrMsg}
          onSignIn={onSignIn}
        />
      </div>
    </Container>
  );
};

export default SignInPage;

const onSignInMail = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true, error: { emailErrMsg: '', passwordErrMsg: '' } };
  } catch (error) {
    let emailErrMsg = 'サインインできませんでした。';
    let passwordErrMsg = 'サインインできませんでした。';
    switch ((error as any).code) {
      case 'auth/user-not-found':
      case 'auth/invalid-email':
        emailErrMsg = 'メールアドレスが間違っています。';
        passwordErrMsg = '';
        break;
      case 'auth/wrong-password':
        emailErrMsg = '';
        passwordErrMsg = 'パスワードが間違っています。';
        break;
      default:
    }
    return { error: { emailErrMsg, passwordErrMsg } };
  }
};
