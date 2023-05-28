import React, { useEffect } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { GetUserDetails, deleteUser } from '../store/authenticationSlices';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { LargeCircularProgressBar } from '../components/progressBar/circularProgressBar';
const GuardedRoute = ({ component: Component, auth, ...rest }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: any) => state.auth);
  const token = Cookies.get('connect.sid');
  useEffect(() => {
    if (!token && !user) {
      console.log('No token founded');
      dispatch(deleteUser());
      navigate('/auth/signin');
    } else {
      console.log('Token and user founded successfully');
      // @ts-ignore
      dispatch(GetUserDetails());
    }
  }, []);
  return (
    <>
      {user && token && !isLoading ? (
        <Component />
      ) : (
        <Navigate to="/auth/signin" />
      )}
      {/* {!token && <Navigate to="/auth/signin" />} */}
      {isLoading && <LargeCircularProgressBar />}
    </>
  );
};

export default GuardedRoute;
