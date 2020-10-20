import React from 'react';
import './App.css';
import LiveStreamings from './liveStreamings';
import { Switch, Route } from 'react-router-dom';
import { Comments } from './comments';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={LiveStreamings} />
      <Route exact path='/comments/:id' component={Comments} />
    </Switch>
  );
}

export default App;
