import React, { useContext, useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Signup from 'container/signup';
import Login from 'container/login';
import Room from 'container/room';
import Lobby from 'container/lobby';
import { ProtectedRoute, AuthRoute, RoomRoute } from 'components/customRoute';
import { StoreContext } from 'util/store';

const DefaultPage = () => {
  const globalStore = useContext(StoreContext);
  const { setGlobalTitle } = globalStore.title;
  setGlobalTitle('Mau kemana atuh?');
  return <Redirect to='/'/>
}


const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100vw;
  height: 100vh;
  a {
    color: white;
  }
  .content {
    display: flex;
    flex-direction: column;
    font-family: 'Contrail One', cursive, sans-serif;
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 0.5em;
  };
  .title {
    height: 20vh;
    width: 100%;
    font-family: customFont;
    font-size: ${props => props.width * (props.titleLength > 20 ? 7 : 10)}em;
    color: white;
    text-shadow: 0.1em 0.1em 0px #000000;
  };
  .page {
    display: flex;
    height: 70vh;
    width: 100%;
  };
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    width: 100%;
    height: 5vh;
  };
  .github {
    color: white;
  };
`;

const App = () => {
  const globalStore = useContext(StoreContext);
  const [ globalWidthState, setGlobalWidth ] =  globalStore.globalWidth;
  const { userInfoState, setUserInfo } = globalStore.userInfo;
  const { setGlobalWait } = globalStore.globalWait;
  const { globalTitle } = globalStore.title;
  const history = useHistory();
  
  const changeWidth = () => {
    if (window.innerWidth < 900 * globalWidthState) {
      setGlobalWidth(window.innerWidth / 1700);
    }
  };

  useEffect(() => {
    changeWidth();
  }, [window.innerWidth]); // eslint-disable-line

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
  }, [userInfoState]); // eslint-disable-line

  return (
    <StyledDiv width={globalWidthState} titleLength={globalTitle.length}>
      <div className='content'>
        <div>
          <div onClick={() => history.push('/')} className='title centered hoverable'>{globalTitle}</div>
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
            <Route component={DefaultPage}/>
          </Switch>
        </div>
        <div className='footer centered'>
          <div>Copyright © 2020 Jimmy 'Bang Koboi'</div> 
          <div className='github'><a href='https://github.com/Fazatholomew/banceng'>Github</a></div>
          <div>Buatan Bandung.</div>
        </div>
      </div>
    </StyledDiv>
  )
};

export default App;