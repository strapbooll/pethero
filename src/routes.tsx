import React, { Component, FunctionComponent } from 'react';
import {Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { isAutheticate } from "./services/auth";

import Home from './pages/Home';
import ListPets from './pages/ListPets';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route
      {...rest}
      render={(props) =>
        isAutheticate() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <PrivateRoute component={ListPets} path="/list-pets"/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
