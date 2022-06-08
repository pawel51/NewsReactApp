import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Categories from "./components/categories/categories";
import LoginView from "./components/login/login";
import {Container, Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <Switch>

            <Route path={"/"} exact={true}>
                <LoginView/>
            </Route>
            <PrivateRoute path="/categories">
                <Categories/>
            </PrivateRoute>
        </Switch>
    </BrowserRouter>

);

