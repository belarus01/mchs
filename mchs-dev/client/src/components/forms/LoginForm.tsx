
import * as yup from 'yup';
import { signIn } from '../../services/auth.service';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

import { Button, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { authenticate } from '../../store/action-creators/auth';
import { ROLES } from '../../shared/constants';


export const LoginForm = () => {
  const navigate = useNavigate();
  const {loading, error, user, token} = useTypedSelector(state => state.auth);

  useEffect(()=>{
    // if(user?.userRole === ROLES.User)
    //   navigate('/events');
    // else
    //   navigate('/users');
      
  }, [token, user, navigate]);

  const onFinish = async (values: { login: string; password: string; }) => {
    console.log(values);
    authenticate(values);
  };

  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: 'Введите логин!',
            },
          ]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Логин" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: false,
              message: 'Введите пароль!',
            },
          ]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
} 