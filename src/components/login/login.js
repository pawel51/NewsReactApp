import '../../App.css';
import React, {useEffect, useRef, useState} from "react";
import { login } from "./loginAPICalls";
import {Button, Col, Container, Form, Nav, Navbar, Row, Spinner} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "../../constants";
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import _NavigationBar from "../Shared/_NavigationBar";

function LoginView(props) {


    const [creds, setCreds] = useState(
        {
            "login": "",
            "password": ""
        }
    )

    const handleChange = (e) => {
        const {id , value} = e.target
        setCreds(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault()
        login(creds)
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
                                <Form.Control className={"w-25"} id={"login"} value={creds.login} placeholder="Enter unique username" onChange={handleChange}/>
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


                        <Button variant="primary" type="submit" onClick={handleSubmitClick}>
                            Submit
                        </Button>

                        <Link to={"/register"}>
                            <Button>
                                Register
                            </Button>
                        </Link>



                </Container>

            </Form>
        </>

    )
}

export default withRouter(LoginView)

