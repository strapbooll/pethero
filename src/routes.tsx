import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home';
import CreatePet from './pages/CreatePet';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home}
                path="/"
                exact/>
            <Route component={CreatePet}
                path="/login"/>
        </BrowserRouter>
    );
}

export default Routes;
