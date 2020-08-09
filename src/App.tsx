import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import NavTabs from './NavTabs';
import { PathProducts, PathShelves } from './paths';
import { Product } from './pages/Product/Product';
import { Shelf } from './pages/Shelf/Shelf';

function App() {
  return (
    <div>
      <NavTabs />
      <Router>
        <Switch>
          <Route path={PathProducts}><Product /></Route>
          <Route path={PathShelves}><Shelf /></Route>
          <Route path="/"><Product /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
