import React from 'react';
import { Redirect, Route } from "react-router-dom";
import {ACCESS_TOKEN_NAME} from "../../constants";

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                sessionStorage.getItem(ACCESS_TOKEN_NAME) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;