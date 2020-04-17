import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Signup from 'container/signup';
import Login from 'container/login';
import Room from 'container/room';
import Lobby from 'container/lobby';
import { ProtectedRoute, AuthRoute } from 'components/customRoute';
import { StoreContext } from 'util/store';


const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .navbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 3vw;
  };
  .content {
    display: flex;
    flex-direction: column;
    max-width: 95vw;
    overflow: hidden;
    width: 97vw;
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
      }
    }
  }, [userInfoState]);

  return (
    <StyledDiv width={globalWidthState}>
      <div className='navbar'>
        <div>Home</div>
        <div>Profile</div>
      </div>
      <div className='content'>
        <div className='title centered'>Banceng Mowal?</div>
        <div className='page centered'>
          <Switch>
            <AuthRoute path="/signup" component={Signup} exact/>
            <AuthRoute path="/login" component={Login} exact/>
            <ProtectedRoute path="/room/" component={Lobby}/>
            <ProtectedRoute path="/room/:roomId" component={Room}/>
          </Switch>
        </div>
        <div className='footer centered'>This is footer</div>
      </div>
    </StyledDiv>
  )
};

export default App;