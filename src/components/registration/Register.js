import '../../App.css';
import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Container, Form, Nav, Navbar, Row, Spinner} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "../../constants";
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import _NavigationBar from "../Shared/_NavigationBar";
import { register } from "./RegisterAPICalls";

function Register(props) {


    const [creds, setCreds] = useState(
        {
            username: "",
            password: "",
            email: "",
            // roles: [{id: 1, name: "ROLE_USER"}],
        }
    )

    const handleChange = (e) => {
        const {id , value} = e.target
        setCreds(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleRegisterClick = async (e) => {
        e.preventDefault()
        console.log(creds);
        await register(creds)
            .then(() => {
                props.history.push("/categories")
            })
    }


    return (
        <>
            <Form>
                <Container>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Login</Form.Label>
                                <Form.Control className={"w-25"} id={"username"} value={creds.username} placeholder="Enter unique username" onChange={handleChange}/>
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control className={"w-25"} id={"email"} type="email" value={creds.email} placeholder="Enter unique email address" onChange={handleChange}/>
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control className={"w-25"} id={"password"} value={creds.password} type="password" placeholder="Password" onChange={handleChange}/>
                            </Form.Group>
                        </Col>

                    </Row>


                    <Button variant="primary" type="submit" onClick={handleRegisterClick}>
                        Register
                    </Button>
                    <Link to={"/"}>
                        <Button>
                            Login
                        </Button>
                    </Link>
                </Container>

            </Form>
        </>

    )
}

export default withRouter(Register)

