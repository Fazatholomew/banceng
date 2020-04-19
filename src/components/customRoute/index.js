import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { StoreContext } from 'util/store';

export const ProtectedRoute = ({...props}) => {
  const globalStore = useContext(StoreContext)
  const { userInfoState } = globalStore.userInfo;
  const { globalWaitState } = globalStore.globalWait;
  let render = false;
  if (!globalWaitState) {
    if (userInfoState.token) {
      render = true;
    } 
    return render ? <Route {...props} /> : <Redirect to='/login'/>;
  } else {
    return null
  }
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