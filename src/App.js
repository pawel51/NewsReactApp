import './App.css';
import {faHome, faBook, faDoorOpen} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {getAllUsers, login} from "./client/client";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "./constants";
import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import Categories from "./components/categories/categories"
import {BrowserRouter as Router, Routes, Route, Switch, Link} from 'react-router-dom';
import _NavigationBar from "./components/Shared/_NavigationBar";

function App() {
    const [users, setUsers] = useState([
        {
            "username": "",
            "email": ""
        }
    ])
    const [tokens, setTokens] = useState({
        access_token: "",
        refresh_token: ""
    })

    useEffect(() => {
        sessionStorage.setItem(ACCESS_TOKEN_NAME, tokens.access_token);
        sessionStorage.setItem(REFRESH_TOKEN_NAME, tokens.refresh_token);
    }, [tokens]);

    useEffect(() => {
        login("John Travolta", "1234")
            .then(data => {
                setTokens(data)
            
            })
        }, [])
        
    return (
        <div className="App">
            <_NavigationBar></_NavigationBar>
        </div>
    );
}

export default App;
