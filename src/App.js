import './App.css';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getAllUsers, login } from './client/client';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from './constants';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/admin/AdminPanel';
import AdminUsers from './components/admin/AdminUsers'
import AdminEditUser from './components/admin/AdminEditUser';
import Home from './components/Home';

function App() {

    const [tokens, setTokens] = useState({
        access_token: '',
        refresh_token: '',
    });

    useEffect(() => {
        localStorage.setItem(ACCESS_TOKEN_NAME, tokens.access_token);
        localStorage.setItem(REFRESH_TOKEN_NAME, tokens.refresh_token);
    }, [tokens]);



    return (
    <Router>
        <div className="App">

                <Routes>
                    <Route path="/" element={<Home />} exact={true}></Route>
                    <Route path="/adminpanel" element={<AdminPanel />}></Route>
                    <Route path="/adminpanel/users" element={<AdminUsers />}></Route>
                    <Route path="/adminpanel/users/edit/:username" element={<AdminEditUser />}></Route>
                    {/* <Route path="/adminpanel/users/:id" element={<AdminUserEdit />}></Route> */}

                </Routes>

        
        </div>
        </Router>
    );
}

export default App;
