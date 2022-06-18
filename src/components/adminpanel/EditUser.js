import React, { useEffect, useState } from 'react';
import { getAllUsers, getUser, login, saveUserRoles } from '../../client/client';
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../../constants';
import {Button, Col, Container, Modal, Row, Spinner} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes, withRouter} from 'react-router-dom';
import Select from 'react-select';

function EditUser(props) {

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

    const [roles, setRoles] = useState(props.editItem.roles);




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
            username: props.editItem.username,
            email: props.editItem.email,
            id: props.editItem.id,
            roles: rolesDTO,
        }

        console.log(modifiedUser)
        modifyUser(modifiedUser)
        props.setShow(false)
        props.updateOnSuccess()
    }

    const updateRoles= (e) => {
        const roles = [...e].map(r => r.value)
        setRoles(roles)
    }

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)} className="Home">
            <Modal.Body>
                <form>
                    <p>{props.editItem.email}</p>
                    <p>{props.editItem.username}</p>
                    <ul>
                        {props.editItem.roles.map((v, i) => {
                            return (
                                <li key={v.id}>{v.name}</li>
                            )
                        })}
                    </ul>

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
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.setShow(false)} variant="secondary">Close</Button>
                <Button onClick={e => saveChanges(e)} variant="primary">
                    Accept
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default withRouter(EditUser);