import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import NavTabs from './NavTabs';
import { PathProducts, PathShelves } from './paths';
import { Shelf } from './pages/Shelf/Shelf';
import Product from './pages/Product/Product';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

interface IAppProps {
  globalMessages: {
    errorMessages: string[],
    successMessages: string[]
  }
}

const globalMessages = (successMessages: string[], errorMessages: string[]) => {
    return <div>
      {successMessages.length > 0 && <Box bgcolor='success.main' style={{padding: 5, margin: 5}}>
        {successMessages.map((x: string, index: number) => <div key={`success-msg-${index}`}>{x}</div>)}
      </Box>}

      {errorMessages.length > 0 && <Box bgcolor='error.main' style={{padding: 5, margin: 5}}>
        {errorMessages.map( (x: string, index: number) => <div key={`error-msg-${index}`}>{x}</div>)}
      </Box>}
    </div>;

}

function App(props: IAppProps) {
  return (
    <div>
      <NavTabs />

      {globalMessages(props.globalMessages.successMessages, props.globalMessages.errorMessages)}

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
        globalMessages: state.globalMessages
    };
}

export default connect(mapStateToProps)(App);

