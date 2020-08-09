import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './pages/Home';

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
