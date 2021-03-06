import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing/Landing';
import Home from './pages/Home/Home'


class Routes extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Landing} />
                    <Route path="/Home" exact component={Home} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Routes