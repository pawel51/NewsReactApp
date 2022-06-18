import {getAllUsers} from "../../client/client";
import {Button, Col, Container, Nav, Row} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import EditUser from "./EditUser";
import {useState} from "react";
import _NavigationBar from "../Shared/_NavigationBar";

const Users = (props) => {
    const [users, setUsers] = useState([
        {
            username: '',
            email: '',
            id: '',
            roles: [],
        },
    ]);

    const [showEdit, setShowEdit] = useState(false)

    const [editUser, setEditUser] = useState({
        username: '',
        email: '',
        id: '',
        roles: [],
    })

    const loadStudents = () => {
        getAllUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const updateOnSuccess = () => {
        loadStudents()
    }

    function handleShow(user) {
        setEditUser(user)
        setShowEdit(true)
    }

    return (
        <div className="Home">

            <_NavigationBar/>

            <Button onClick={loadStudents}>Load Students</Button>
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
                                        <Button onClick={() => handleShow(v)}>Edit</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </li>
                    );
                })}
            </ul>

            <EditUser
                show={showEdit}
                setShow={setShowEdit}
                updateOnSuccess={updateOnSuccess}
                editItem={editUser}
                setEditItem={setEditUser}/>

        </div>
    );
}

export default withRouter(Users);