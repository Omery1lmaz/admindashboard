import React, { useEffect } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { GetUserDetails } from '../store/authenticationSlices';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
const GuardedRoute = ({ component: Component, auth, ...rest }: any) => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: any) => state.auth);
  const token = Cookies.get('connect.sid');
  useEffect(() => {}, [user]);
  let sayac = 0;
  useEffect(() => {
    if (user) {
      // @ts-ignore
      dispatch(GetUserDetails());
    }
  }, []);

  return <>{user ? <Component /> : <Navigate to="/auth/signin" />}</>;
};

export default GuardedRoute;
