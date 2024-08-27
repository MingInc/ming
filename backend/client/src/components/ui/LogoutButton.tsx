import { useAuth } from '@/contexts/AuthContext';
import React from 'react';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
