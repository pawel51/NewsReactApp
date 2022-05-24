import './App.css';
import {faHome} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {getAllUsers, login} from "./client/client";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "./constants";
import {Button, Col, Container, Row} from "react-bootstrap";
import Categories from "./components/categories/categories"
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
            <FaIcon icon={faHome} className={"text-lg-center"}/>
            <Button onClick={loadStudents}>Load Students</Button>
            <ul>
                {users.map((v ,index) => {
                    return (
                        <li key={index}>
                            <Container>
                                <Row>
                                    <Col>{v.email}</Col>
                                    <Col>{v.username}</Col>
                                </Row>
                            </Container>
                        </li>
                    )
                })}
            </ul>
            <Router>
                <Routes>
                    <Route path="/categories" element={<Categories/>} exact/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
