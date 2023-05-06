import React, { useEffect } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { GetUserDetails, deleteUser } from '../store/authenticationSlices';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
const GuardedRoute = ({ component: Component, auth, ...rest }: any) => {
  console.log('guardedRoute');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: any) => state.auth);
  const token = Cookies.get('connect.sid');
  useEffect(() => {}, [user]);
  useEffect(() => {
    if (!token) {
      console.log('Token');
      dispatch(deleteUser());
      navigate('/auth/signin');
    }
    if (user && token) {
      // @ts-ignore
      dispatch(GetUserDetails());
    }
  }, []);
  return <>{user ? <Component /> : <Navigate to="/auth/signin" />}</>;
};

export default GuardedRoute;
