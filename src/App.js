import './App.css';
import {faHome, faBook, faDoorOpen} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {getAllUsers, login} from "./client/client";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "./constants";
import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import Categories from "./components/categories/categories"
import {BrowserRouter as Router, Routes, Route, Switch, Link} from 'react-router-dom';

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
        localStorage.setItem(ACCESS_TOKEN_NAME, tokens.access_token)
        localStorage.setItem(REFRESH_TOKEN_NAME, tokens.refresh_token)
    }, [ tokens ])

    useEffect(() => {
        login("John Travolta", "1234")
            .then(data => {
                setTokens(data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const loadStudents = () => {
        getAllUsers()
            .then(data => {
                setUsers(data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div className="App">
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/"><FaIcon icon={faHome}/></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/categories"}>Categories</Nav.Link>
                        <Nav.Link as={Link} to={"/"}>Login</Nav.Link>
                    </Nav>
                    <NavDropdown title="More" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">
                            <Button value={"Quit"}>
                                <FaIcon icon={faDoorOpen}/>
                            </Button>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Container>
            </Navbar>
        </div>
    );
}

export default App;
