import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React, {useEffect, useRef, useState} from "react";
import {Button, Modal, Col, Container, Row, Navbar, Nav, Table, Form, Spinner} from "react-bootstrap";
import {getAllCategories} from "../categories/categoryAPICalls";
import {Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import _NavigationBar from "../Shared/_NavigationBar";
import {getUserId, getAllNews, editAnnouncement} from "./AnnouncementsAPICalls";
import {CATEGORIES} from "../../constants";


const EditAnnouncement = (props) => {


    const [isEditing, setIsEditing] = useState(false)



    function editHandler() {
        setIsEditing(true)
        editAnnouncement(props.editItem)
            .then((res) => {
                if (res !== {})
                    props.updateOnSucces()
                    setIsEditing(false)
                    props.setShowEdit(false)
            })

        
    }

    const changeEditHandler = (e) => {
        const {id, value} = e.target


        props.setEditItem(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    return (
        <Modal show={props.show} onHide={() => props.setShowEdit(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Announcement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            id={"name"}
                            type="text"
                            value={props.editItem.name}
                            onChange={(e) => changeEditHandler(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            id={"content"}
                            as={"textarea"} rows={3}
                            value={props.editItem.content}
                            onChange={changeEditHandler}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.setShowEdit(false)} variant="secondary">Close</Button>
                <Button disabled={isEditing} onClick={editHandler} variant="primary">
                    {
                        isEditing ?
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> : "Accept"
                    }
                </Button>
            </Modal.Footer>
        </Modal>
        )


}


export default EditAnnouncement;
