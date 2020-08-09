import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import NavTabs from './NavTabs';
import { PathProducts, PathShelves } from './paths';
import { Shelf } from './pages/Shelf/Shelf';
import Product from './pages/Product/Product';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import IGlobalErrorProps from './interfaces/IGlobalErrorProps';

interface IAppProps extends IGlobalErrorProps {

}

function App(props: IAppProps) {
  return (
    <div>
      <NavTabs />
      {props.globalError.message && <Box bgcolor='error.main' style={{padding: 5, margin: 5}}>
        {props.globalError.message}
      </Box>}
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

const mapStateToProps = (state: any) => {
    return { 
        globalError: state.globalError
    };
}

export default connect(mapStateToProps)(App);

