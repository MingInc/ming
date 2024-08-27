import { useAuth } from '@/contexts/AuthContext';
import React from 'react';

const UserProfile: React.FC = () => {
  const { state } = useAuth();

  return (
    <div>
      {state.isAuthenticated ? (
        <div>
          <h2>Welcome, {state.user?.name}</h2>
          <p>Email: {state.user?.email}</p>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default UserProfile;
