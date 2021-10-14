import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductList from './pages/ProductList/ProductList';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/main' component={Main} />
          <Route exact path='/product/shoes/:id' component={ProductDetail} />
          <Route exact path='/products/shoes' component={ProductList} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
