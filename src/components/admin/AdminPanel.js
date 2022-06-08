import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getAllUsers, login } from '../../client/client';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../../constants';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminUsers from './AdminUsers';

import { Link } from 'react-router-dom';

function AdminPanel() {
    const [tokens, setTokens] = useState({
        access_token: '',
        refresh_token: '',
    });

    useEffect(() => {
        localStorage.setItem(ACCESS_TOKEN_NAME, tokens.access_token);
        localStorage.setItem(REFRESH_TOKEN_NAME, tokens.refresh_token);
    }, [tokens]);

    return (
        <div className="AdminPanel">
            <nav>
                <ul>
                    <Link to="/adminpanel/users">
                        <li>users</li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}

export default AdminPanel;
