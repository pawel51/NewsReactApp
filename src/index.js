import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Categories from "./components/categories/categories";
import LoginView from "./components/login/login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Announcements from "./components/news/Announcements";
import Register from './components/registration/Register';
import ModerateAnnouncements from "./components/news/ModerateAnnouncements";
import Home from "./components/home/Home";
import Users from "./components/adminpanel/Users";

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
            <PrivateRoute path={"/home"} exact={true}>
                <Home/>
            </PrivateRoute>
            <PrivateRoute path="/categories">
                <Categories/>
            </PrivateRoute>
            <PrivateRoute path="/announcements">
                <Announcements/>
            </PrivateRoute>
            <PrivateRoute path="/adminpanel">
                <Users/>
            </PrivateRoute>
            <PrivateRoute path="/moderate">
                <ModerateAnnouncements/> 
            </PrivateRoute>

        </Switch>
    </BrowserRouter>

);

