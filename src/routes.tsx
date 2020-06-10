import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home';
import ListPets from './pages/ListPets';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={ListPets} path="/list-pets"/>
        </BrowserRouter>
    );
}

export default Routes;
