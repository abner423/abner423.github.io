import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing/Landing';


class Routes extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Landing} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Routes