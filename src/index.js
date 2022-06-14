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
import Announcements from "./components/news/Announcements";
import AdminPanel from "./components/admin/AdminPanel";
import AdminUsers from "./components/admin/AdminUsers";
import AdminEditUser from "./components/admin/AdminEditUser";
import Register from './components/registration/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <Switch>

            <Route path={"/"} exact={true}>
                <LoginView/>
            </Route>
            <Route path={"/register"} exact={true}>
                <Register/>
            </Route>
            <Route path={"/users/users/save"} exact={true}>
            </Route>
            <PrivateRoute path="/categories">
                <Categories/>
            </PrivateRoute>
            <PrivateRoute path="/announcements">
                <Announcements/>
            </PrivateRoute>
            <PrivateRoute path="/adminpanel/users" exact={true}>
                <AdminUsers/>
            </PrivateRoute>
            <PrivateRoute path="/adminpanel/users/edit/:username" exact={true}>
                <AdminEditUser/>
            </PrivateRoute>
            <PrivateRoute path="/adminpanel">
                <AdminPanel/>
            </PrivateRoute>

        </Switch>
    </BrowserRouter>

);

