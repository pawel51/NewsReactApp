import logo from './logo.svg';
import './App.css';
import {faHome} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import {getAllUsers, login} from "./client";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "./constants";
import {Button, Col, Container, Row} from "react-bootstrap";

function App() {
    const [users, setUsers] = useState([
        {
            "id": 0,
            "name": "name",
            "username": "username",
            "password": "xdd",
            "roles": [
                {
                    "id": 1,
                    "name": "role1name"
                },
                {
                    "id": 2,
                    "name": "role2name"
                }
            ]
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
        login("john", "1234")
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
                {users.map((v) => {
                    return (
                        <li key={v.id}>
                            <Container>
                                <Row>
                                    <Col>{v.name}</Col>
                                    <Col>{v.username}</Col>
                                </Row>
                            </Container>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default App;
