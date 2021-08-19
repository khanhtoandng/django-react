import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
// import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './component/Header';
import HomePage from './pages/homePage';
import ProductPage from './pages/productPage';
import ManagePage from './pages/managementPage';
import ProductDetailPage from './pages/productDetailPage';
import ProductUpdatePage from './pages/productUpdatePage';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/products">
            <ProductPage />
          </Route>
          <Route path="/manage">
            <ManagePage />
          </Route>
          <Route path="/product/:id">
            <ProductDetailPage />
          </Route>
          <Route path="/update/:id">
            <ProductUpdatePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
