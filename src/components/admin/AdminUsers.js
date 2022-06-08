import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getAllUsers, login } from '../../client/client';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../../constants'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation';
import {Link} from 'react-router-dom'


function AdminUsers() {
    const [users, setUsers] = useState([
        {
            username: '',
            email: '',
            id: '',
            roles: [],
        },
    ]);
    const [tokens, setTokens] = useState({
        access_token: '',
        refresh_token: '',
    });

    useEffect(() => {
        localStorage.setItem(ACCESS_TOKEN_NAME, tokens.access_token);
        localStorage.setItem(REFRESH_TOKEN_NAME, tokens.refresh_token);
    }, [tokens]);

    useEffect(() => {
        login('John Travolta', '1234')
            .then((data) => {
                setTokens(data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const loadStudents = () => {
        getAllUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    return (
        <div className="Home">

                <Navigation/>

                <FaIcon icon={faHome} className={'text-lg-center'} />
                <Button onClick={loadStudents}>Load Students</Button>

                <ul>
                    {users.map((v, index) => {
                        return (
                            <li key={index}>
                                <Container>
                                    <Row>
                                        <Col>{v.email}</Col>
                                        <Col>{v.username}</Col>
                                        <Col>{v.id}</Col>
                                        <Col>{v.roles}</Col>
                                        <Col>
                                            <Link to={`/adminpanel/users/edit/${v.username}`}>
                                                <Button>Edit</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Container>
                            </li>
                        );
                    })}
                </ul>
            
        </div>
    );
}

export default AdminUsers;
