import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RequireRoleProps {
  allowedRoles: Array<'ets' | 'vendor' | 'public'>;
  children: React.ReactElement;
}

const RequireRole: React.FC<RequireRoleProps> = ({ allowedRoles, children }) => {
  const { currentUser, userRole, loading, isApproved, approvalStatus } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is approved (only for ETS/vendor roles)
  if (!isApproved && (userRole === 'ets' || userRole === 'vendor')) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          <h4>Account Pending Approval</h4>
          <p>Your <strong>{userRole?.toUpperCase()}</strong> account is currently <strong>{approvalStatus}</strong>.</p>
          {approvalStatus === 'pending' && (
            <p>Please wait for an administrator to approve your account.</p>
          )}
          {approvalStatus === 'denied' && (
            <p>Your account request was denied. Please contact support for more information.</p>
          )}
          <a href="/" className="btn btn-primary mt-3">Go to Home</a>
        </div>
      </div>
    );
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Access Denied</h4>
          <p>You don't have permission to access this page.</p>
          <p>Your current role: <strong>{userRole || 'None'}</strong></p>
          <p>Required role: <strong>{allowedRoles.join(' or ')}</strong></p>
          <a href="/" className="btn btn-primary mt-3">Go to Home</a>
        </div>
      </div>
    );
  }

  return children;
};

export default RequireRole;
