import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please enter a valid email and password.");
    } else {
      setError(null);
      // Add code here to send the login request to your backend
      // After the request is successful, use the useHistory hook to redirect the user to the home page.
      history.push('/home');
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please enter a valid email and password.");
    } else {
      setError(null);
      try {
        // Send login request to the backend
        const response = await axios.post('/api/login', { email, password });

        // If the request is successful, update the UI and redirect the user to the home page.
        if(response.status === 200) {
          history.push('/home');
        }
      } catch (error) {
        // If the request fails, update the UI to display an error message
        setError('Invalid email or password');
      }
    }
  };

  return (
    <Form onFinish={handleSubmit} className="login-form">
        <Form.Item
          validateStatus={error ? "error" : ""}
          help={error}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          validateStatus={error ? "error" : ""}
          help={error}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
    </Form>
  );
};

export default LoginForm;
