import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getAllUsers, login } from '../../client/client';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../../constants';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes, withRouter} from 'react-router-dom';
import AdminUsers from './AdminUsers';

import { Link } from 'react-router-dom';

function AdminPanel(props) {

    const [showUsers, setShowUsers] = useState(false)

    function redirectToUsers() {
        props.history.push("/adminpanel/users")
    }

    return (
        <div className="AdminPanel">
            <nav>
                <ul>
                    <Button onClick={() => setShowUsers(true)}>
                        <li>users</li>
                    </Button>
                </ul>
            </nav>

            {showUsers ? <AdminUsers/> : null}
        </div>
    );
}

export default withRouter(AdminPanel);
