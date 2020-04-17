import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { StoreContext } from 'util/store';

export const ProtectedRoute = ({...props}) => {
  const { userInfoState } = useContext(StoreContext).userInfo;
  let render = false;

  if (userInfoState.token) {
    render = true;
  } else {
    const savedInfo = localStorage.getItem('rahasiaKita');
    if (savedInfo) {
      const { token } = JSON.parse(savedInfo);
      render = Boolean(token);
    }
  }
  
  return render ? <Route {...props} /> : <Redirect to='/login'/>;
};

export const AuthRoute = ({...props}) => {
  const { userInfoState } = useContext(StoreContext).userInfo;
  let render = false;

  if (userInfoState.token) {
    render = true;
  } else {
    const savedInfo = localStorage.getItem('rahasiaKita');
    if (savedInfo) {
      const { token } = JSON.parse(savedInfo);
      render = Boolean(token);
    }
  }
  
  return render ? <Redirect to='/room'/> : <Route {...props} />;
};