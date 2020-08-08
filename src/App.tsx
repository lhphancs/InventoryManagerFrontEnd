import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './Domain/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/"><Home /></Route>
      </Switch>
    </Router>
  );
}

export default App;
