import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { PathProduct, PathWholesaler, PathWholesalerProducts, PathShelf, PathShelfProducts } from './paths';
import Product from './domains/Configurations/Product/Product';
import { makeStyles } from '@material-ui/core';
import SideNavigation from './SideNavigation';
import GlobalMessages from './GlobalMessages';
import ProductForm from './domains/Configurations/Product/ProductForm';
import Wholesaler from './domains/Configurations/Wholesaler/Wholesaler';
import WholesalerForm from './domains/Configurations/Wholesaler/WholesalerForm';
import WholesalerProducts from './domains/Configurations/WholesalerProducts/WholesalerProducts';
import Shelf from './domains/Configurations/Shelf/Shelf';
import ShelfForm from './domains/Configurations/Shelf/ShelfForm';
import ShelfProduct from './domains/ShelfProduct/ShelfProduct';

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
            <Route path={`${PathProduct}/:id`}><ProductForm /></Route>
            <Route path={`${PathProduct}`}><Product /></Route>
            <Route path={`${PathWholesaler}/:id`}><WholesalerForm /></Route>
            <Route path={`${PathWholesaler}`}><Wholesaler /></Route>
            <Route path={`${PathWholesalerProducts}/:id`}><WholesalerProducts /></Route>
            
            <Route path={`${PathShelf}/:id`}><ShelfForm /></Route>
            <Route path={PathShelf}><Shelf /></Route>

            <Route path={`${PathShelfProducts}/:id`}><ShelfProduct /></Route>

            <Route path="/"><Product /></Route>
          </Switch>
      </main>
      </BrowserRouter>
    </div>
  );
}

