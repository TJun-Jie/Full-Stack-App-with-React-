import React from 'react';
import { Consumer } from './Context';
import { Redirect } from 'react-router-dom';
import {Route} from 'react-router-dom';
function PrivateRoute({component: Component, location, ...rest}) {
    return(
        <Consumer>
            { context => (
                <Route {...rest}>
                    {context.authenticatedUser 
                        ? (<Component></Component>)
                        : (<Redirect to={{
                            pathname:"/signin",
                            state: {from: location}
                        }} />)
                    }
                </Route>
            )}
        </Consumer>
    )
}

export default PrivateRoute;