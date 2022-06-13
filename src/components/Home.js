import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getAllUsers, login } from '../client/client';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../constants'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';


function Home() {
    const [users, setUsers] = useState([
        {
            username: '',
            email: '',
        },
    ]);
    const [tokens, setTokens] = useState({
        access_token: '',
        refresh_token: '',
    });

    useEffect(() => {
        sessionStorage.setItem(ACCESS_TOKEN_NAME, tokens.access_token);
        sessionStorage.setItem(REFRESH_TOKEN_NAME, tokens.refresh_token);
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
            
        </div>
    );
}

export default Home;
