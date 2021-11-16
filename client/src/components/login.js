import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button, Alert } from 'react-bootstrap';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userData, setuserData] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);
  const [validation] = useState(false);
  const [displayAlertBox, alertDisplay] = useState(false);
  const onChangeValue = (event) => {
    const { name, value } = event.target;
    setuserData({ ...userData, [name]: value });
  };

  const onClickSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userData }
      });
      console.log(data);

      Auth.login(data.login.token);

    } catch (e) {
      console.error(e);
      alertDisplay(true);
    }

    setuserData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validation={validation} onSubmit={onClickSubmit}>
        <Alert dismissible onClose={() => alertDisplay(false)} show={displayAlertBox} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            name='email'
            onChange={onChangeValue}
            value={userData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            onChange={onChangeValue}
            value={userData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userData.email && userData.password)}
          type='submit'
          className='app-button btn-block'
          variant='normal'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
