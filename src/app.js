import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, useHistory, Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Signup from 'container/signup';
import Login from 'container/login';
import Room from 'container/room';
import Lobby from 'container/lobby';
import { ProtectedRoute, AuthRoute, RoomRoute } from 'components/customRoute';
import { StoreContext } from 'util/store';


const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 0.5em;
  };
  .title {
    height: 20vh;
    width: 100%;
    font-family: customFont;
    font-size: ${props => props.width * 10}em;
    color: white;
    text-shadow: 0.1em 0.1em 0px #000000;
  };
  .page {
    display: flex;
    height: 70vh;
    width: 100%;
  }
  .footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    width: 100%;
    height: 5vh;
  };
`;

const App = () => {
  const globalStore = useContext(StoreContext);
  const [ globalWidthState, setGlobalWidth ] =  globalStore.globalWidth;
  const { userInfoState, setUserInfo } = globalStore.userInfo;
  const { setGlobalWait } = globalStore.globalWait;
  const history = useHistory();
  
  const changeWidth = () => {
    if (window.innerWidth < 900 * globalWidthState) {
      setGlobalWidth(window.innerWidth / 1700);
    }
  };

  useEffect(() => {
    changeWidth();
  }, [window.innerWidth]);

  useEffect(() => {
    const savedInfo = localStorage.getItem('rahasiaKita');
    if (savedInfo) {
      const { token } = JSON.parse(savedInfo);
      if (!userInfoState.token || userInfoState.token !== token) {
        setUserInfo(token);
      }
    } else {
      if (userInfoState.token) {
        const token = JSON.stringify({ userId: userInfoState.userId, token: userInfoState.token })
        localStorage.setItem('rahasiaKita', token);
      } else {
        setGlobalWait(false);
      }
    }
  }, [userInfoState]);

  return (
    <StyledDiv width={globalWidthState}>
      <div className='content'>
        <div>
          <div onClick={() => history.push('/')} className='title centered hoverable'>Banceng Mowal?</div>
        </div>
        <div className='page centered'>
          <Switch>
            <Route path='/' exact><Redirect to='/room'/></Route>
            <AuthRoute path="/signup" component={Signup} exact/>
            <AuthRoute path="/login" component={Login} exact/>
            <ProtectedRoute path="/room/" component={Lobby} exact/>
            <ProtectedRoute path="/room/:roomId">
              <RoomRoute>
                <Room/>
              </RoomRoute>
            </ProtectedRoute>
          </Switch>
        </div>
        <div className='footer centered'>This is footer</div>
      </div>
    </StyledDiv>
  )
};

export default App;