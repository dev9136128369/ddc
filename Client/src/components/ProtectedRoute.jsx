// 31-10-25
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Apne user context ko import karein
import api from '../api/axios'; // Aapka axios instance
import { Spinner } from 'react-bootstrap'; // Ya koi bhi loading component

// adminOnly=true ka matlab yeh route sirf admin ke liye hai
const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, logout } = useUser(); // Context se current user/token
  const [isVerifying, setIsVerifying] = useState(true); // 1. Loading state
  const [isAuthorized, setIsAuthorized] = useState(false); // 2. Authorize state
  const token = localStorage.getItem('token');

  useEffect(() => {
    const verifyToken = async () => {
      // Agar token hi nahi hai, toh verify mat karo
      if (!token) {
        setIsAuthorized(false);
        setIsVerifying(false);
        return;
      }

      try {
        // Server se token verify karwayein
        const response = await api.get('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          // Agar admin route hai, toh check karo ki user admin hai
          if (adminOnly && response.data.user.email !== 'delhidentalclinicindia@gmail.com') {
            setIsAuthorized(false); // Login hai, par admin nahi
          } else {
            setIsAuthorized(true); // Login bhi hai aur admin bhi (ya admin zaroori nahi)
          }
        } else {
          logout(); // Token galat hai, logout karein
          setIsAuthorized(false);
        }
      } catch (error) {
        logout(); // Error matlab token invalid
        setIsAuthorized(false);
      } finally {
        setIsVerifying(false); // Verification poora hua
      }
    };

    verifyToken();
  }, [token, adminOnly, logout]); // Dependency array

  // --- YEH SABSE IMPORTANT PART HAI ---

  // 1. Jab tak check ho raha hai (loading state)
  if (isVerifying) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  // 2. Jab check ho gaya, aur user authorized hai
  if (isAuthorized) {
    return <Outlet />; // Outlet ka matlab 'ManagementDashboard' dikhao
  }

  // 3. Jab check ho gaya, aur user authorized NAHI hai
  return <Navigate to="/LoginPage" replace />;
};

export default ProtectedRoute;












