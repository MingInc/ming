import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const LoginButton: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    // Simulate user data
    const user = { name: 'John Doe', email: 'john@example.com' };
    login(user);
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default LoginButton;
