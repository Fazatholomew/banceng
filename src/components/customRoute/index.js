import React, { useContext, useState, useEffect } from 'react';
import { Route, Redirect, useParams, useLocation } from 'react-router-dom';

import { StoreContext } from 'util/store';
import { checkRoom } from 'util/fetch';

export const ProtectedRoute = ({...props}) => {
  const globalStore = useContext(StoreContext);
  const { userInfoState } = globalStore.userInfo;
  const { globalWaitState } = globalStore.globalWait;
  const [render, setRender] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!globalWaitState) {
      if (userInfoState.token) {
        setAuthenticated(true);
      }
      setRender(true);
    }
  }, [globalWaitState]) // eslint-disable-line
  //console.log('auth')
  //console.log(authenticated, render, globalWaitState);
  if (render) {
    //console.log(authenticated);
    return authenticated ? <Route {...props} /> : 
      <Redirect 
        to={{
          pathname: '/login',
          state: {pathname}
        }}
      />;
  } else {
    return null;
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

export const RoomRoute = ({...props}) => {
  const globalStore = useContext(StoreContext);
  const { userInfoState } = globalStore.userInfo;
  const { setGlobalError } = globalStore.globalError;
  const { token } = userInfoState;
  const { roomId } = useParams();
  const [render, setRender] = useState(false);
  const [error, setError] = useState(false);  

  useEffect(() => {
    const fetchCheckRoom = async () => {
      const response = await checkRoom({token, roomId});
      if (response.status === 500) {
        setGlobalError('Ada error coba lagi.');
        setError(true);
      } else if (response.status === 429) {
        setGlobalError('Lapak penuh');
        setError(true);
      } else if (response.status === 404) {
        setGlobalError('Ngawur, gak ada lapaknya!');
        setError(true);
      }
      setRender(true);
    }
    fetchCheckRoom();
  }, []) // eslint-disable-line

    if (render) {
      return error ? <Redirect to='/room'/> : <Route {...props} />;
    } else {
    return null
  }
}