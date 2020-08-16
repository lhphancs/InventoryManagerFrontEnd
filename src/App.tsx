import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { PathProduct, PathShelves, PathProductForm } from './paths';
import { Shelf } from './domains/Configurations/Shelf/Shelf';
import Product from './domains/Configurations/Product/Product';
import { makeStyles } from '@material-ui/core';
import SideNavigation from './SideNavigation';
import GlobalMessages from './GlobalMessages';
import ProductForm from './domains/Configurations/Product/ProductForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1
  },
}));


export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SideNavigation />
        <BrowserRouter>
        <main className={classes.content}>
          <GlobalMessages />

          <Switch>
            <Route path={PathProductForm}><ProductForm /></Route>
            <Route path={PathProduct}><Product /></Route>
            
            <Route path={PathShelves}><Shelf /></Route>
            <Route path="/"><Product /></Route>
          </Switch>
      </main>
      </BrowserRouter>
    </div>
  );
}

