import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getAllUsers, getUser, login, saveUserRoles } from '../../client/client';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../../constants';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes, withRouter} from 'react-router-dom';
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { wait } from '@testing-library/user-event/dist/utils';

function AdminEditUser() {

    const roleOptions = [
        {value: 'ROLE_USER', label: 'ROLE_USER'},
        {value: 'ROLE_MANAGER', label: 'ROLE_MANAGER'},
        {value: 'ROLE_ADMIN', label: 'ROLE_ADMIN'},
    ];

    class Role {
        constructor(id, name) {
            this.id = id
            this.name = name

        }
    }

    const [roles, setRoles] = useState([]);

    const [user, setUser] = useState({
        username: '',
        email: '',
        id: '',
        roles: [],
    });

    useEffect(() => {
        //setTokens(tokens);

        const currURL = window.location.href;
        const splittedURL = currURL.split("/");
        const username = splittedURL[splittedURL.length - 1];
        
        (async function loading(){
            await loadUser(username);
        })();

    }, [])


    const loadUser = async function(username) {
        await getUser(username)
            .then((data) => {
                setUser(data);
                setRoles(data.roles)
                console.log(data)
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const modifyUser = async function(user) {
        await saveUserRoles(user)
    }


    const saveChanges = (e) => {
        e.preventDefault()

        const rolesDTO = roles.map(r => {
            let roleDTO 

            if(r === 'ROLE_USER') roleDTO = new Role(1, r)
            else if(r === 'ROLE_USER') roleDTO = new Role(1, r)
            else if(r === 'ROLE_MANAGER') roleDTO =  new Role(2, r)
            else if(r === 'ROLE_ADMIN')  roleDTO = new Role(3, r)
        
            return roleDTO
        })


        const modifiedUser = {
            username: user.username,
            email: user.email,
            id: user.id,
            roles: rolesDTO,
        }

        console.log(modifiedUser)
        modifyUser(modifiedUser)

        

    }

    const updateRoles= (e) => {
        const roles = [...e].map(r => r.value)
        setRoles(roles)
    }

    return (
        <div className="Home">
            <Navigation />

        
            <form>
                <p>{user.email}</p>
                <p>{user.username}</p>

                <div div className="field">
                    <label>Role</label>
                    <Select
                        options={roleOptions}
                        isMulti
                        onChange={(e) => {
                            updateRoles(e);
                        }}
                    />
                </div>
                <div div className="field">
                    <Button type="submit" onClick={e => saveChanges(e)}>Save</Button>
                </div>
            </form>
            
        </div>
    );
}

export default withRouter(AdminEditUser);
