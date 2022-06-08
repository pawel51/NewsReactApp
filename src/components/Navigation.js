import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getAllUsers, login } from '../client/client';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../constants';
import { Button, Col, Container, Row } from 'react-bootstrap';

import {Link} from 'react-router-dom'

function Navigation() {
    const [tokens, setTokens] = useState({
        access_token: '',
        refresh_token: '',
    });

    useEffect(() => {
        localStorage.setItem(ACCESS_TOKEN_NAME, tokens.access_token);
        localStorage.setItem(REFRESH_TOKEN_NAME, tokens.refresh_token);
    }, [tokens]);

    return (
        <div className="Navigation">
            <nav>
                <ul>
                    <Link to="/adminpanel">
                        <li>adminpanel</li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;
