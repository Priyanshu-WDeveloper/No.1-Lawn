import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/login';
import DashboardPage from '../pages/dashboard/DashboardPage';
import CustomerManagementPage from '../pages/customers/CustomerManagementPage';

const AppRoutes: React.FC = () => {
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthenticated = true;

  return (
    <Routes>
      {/* Public route for Login */}
      <Route
        path="/login"
        element={<Login />}
        // element={
        //   isAuthenticated ? (
        //     <Navigate to="/dashboard" replace />
        //   ) : (
        //     <Login />
        //   )
        // }
      />

      {/* Protected route for Dashboard */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <DashboardPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Protected route for Customer Management */}
      <Route
        path="/customers"
        element={
          isAuthenticated ? (
            <CustomerManagementPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Redirect root to dashboard if authenticated, otherwise to login */}
      <Route
        path="/"
        element={<Login />}
        // element={
        //   isAuthenticated ? (
        //     <Navigate to="/dashboard" replace />
        //   ) : (
        //     <Navigate to="/login" replace />
        //   )
        // }
      />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
