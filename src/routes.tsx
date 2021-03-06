import React from 'react';
import {Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { isAutheticate } from "./services/auth";

import Home from './pages/Home';
import Register from './pages/Register';
import ListPets from './pages/ListPets';
import PetDetail from './pages/PetDetail';
import RegisterPet from './pages/RegisterPet';

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
                <Route component={Register} path="/register" exact />
                <PrivateRoute component={RegisterPet} path="/register-pet"/>
                <PrivateRoute component={ListPets} path="/list-pets"/>
                <PrivateRoute component={PetDetail} path="/pet-detail/:id"/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
