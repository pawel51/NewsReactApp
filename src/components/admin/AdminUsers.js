import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getAllUsers, login } from '../../client/client';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../../constants'
import {Button, Col, Container, Nav, Row} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes, withRouter} from 'react-router-dom';
import Navigation from '../Navigation';
import {Link} from 'react-router-dom'


const AdminUsers = (props) => {
    const [users, setUsers] = useState([
        {
            username: '',
            email: '',
            id: '',
            roles: [],
        },
    ]);

    useEffect(() => {
        let a = props
        console.log(a)
    }, [])

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
                {console.log(users)}
                <ul>
                    {users.map((v, index) => {
                        return (
                            <li key={index}>
                                <Container>
                                    <Row>
                                        <Col>{v.email}</Col>
                                        <Col>{v.username}</Col>
                                        {/* {v.roles.map(role => (
                                            <Col key={role}>
                                                <p>{role}</p>
                                            </Col>
                                        ))
                                        }     */}
                                        
                                        <Col>
                                            <Nav>
                                                <Nav.Link as={Link} to={`/adminpanel/users/edit/${v.username}`}>
                                                    <Button>Edit</Button>
                                                </Nav.Link>
                                            </Nav>

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

export default withRouter(AdminUsers);
