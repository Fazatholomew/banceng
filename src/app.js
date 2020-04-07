import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './components/login';
import Room from 'container/room';
import { StoreContext } from 'util/store';

const App = () => {
  const [ globalWidthState, setGlobalWidth ] =  useContext(StoreContext).globalWidth;
  const changeWidth = () => {
    if (window.innerWidth < 900 * globalWidthState) {
      setGlobalWidth(window.innerWidth / 1700);
    }
  };
  useEffect(() => {
    changeWidth();
  });
  return (
    <Switch>
      <Route path="/login" component={Login} exact/>
      <Route path="/room/:roomId" component={Room}/>
    </Switch>
  )
};

export default App;