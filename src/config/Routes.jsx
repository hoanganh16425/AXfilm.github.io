import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import IframeMv from '../pages/IframeMv'

const Routes = () => {
    return (
        <Switch>
            <Route
                exact
                path='/:category/:id/play'
                component={IframeMv}
            />
            <Route
                exact
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
            exact
                path='/:category/:id'
                component={Detail}
            />
            <Route
            exact
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                exact
                component={Home}
            />
        </Switch>
    );
}

export default Routes;
