import React from 'react';
import logo from './logo.svg';
import './App.css';
import LiveStreamings from './liveStreamings';
import { Switch, Route } from 'react-router-dom';
import { Comments } from './comments';

function App() {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={prevProps => <LiveStreamings {...prevProps} />}
      />
      <Route exact path='/comments/:id' component={Comments} />
    </Switch>
  );
}

export default App;
