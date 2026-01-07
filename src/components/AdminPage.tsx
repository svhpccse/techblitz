// Protected Admin Page with Authentication
import { useState, useEffect } from 'react';
import Admin from './Admin';
import AdminAuth from './AdminAuth';

export const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated in this session
    const authToken = sessionStorage.getItem('admin-auth');
    if (authToken === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return <Admin />;
};

export default AdminPage;
