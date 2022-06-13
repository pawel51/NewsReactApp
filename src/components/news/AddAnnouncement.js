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
import {getUserId, getAllNews, editAnnouncement, addAnnouncement} from "./AnnouncementsAPICalls";
import {CATEGORIES, STATUSES} from "../../constants";
import categories from "../categories/categories";


const AddAnnouncement = (props) => {


    const [isEditing, setIsEditing] = useState(false)

    const [newItem, setNewItem] = useState({
        "id": 0,
        "name": "",
        "content": "",
        "creationDate": "2022-06-12 18:11:08",
        "expirationDate": "2022-06-12 18:11:08",
        "announcementState": "NotPublic",
        "categoryId": 1
    })




    function addHandler() {
        setIsEditing(true)
        addAnnouncement(newItem)
            .then((res) => {
                if (res !== {})
                    props.updateOnSucces()
                setIsEditing(false)
                props.setShow(false)
            })
            .catch(err => {
                console.log(err)
                setIsEditing(false)
            })


    }

    const changeEditHandler = (e) => {
        const {id, value} = e.target

        setNewItem(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)}>
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
                            value={newItem.name}
                            onChange={(e) => changeEditHandler(e)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            id={"content"}
                            as={"textarea"} rows={3}
                            value={newItem.content}
                            onChange={changeEditHandler}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Select Expiration Date</Form.Label>
                        <Form.Control type="date" id={"expirationDate"} placeholder="Expiration" onChange={changeEditHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Select Who Can See that</Form.Label>
                        <Form.Select id={"announcementState"} onChange={changeEditHandler}>
                            {STATUSES.map((value, index) => (
                                    <option key={"status" + index} value={index}>{value}</option>
                                )
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Select id={"categoryId"} onChange={changeEditHandler}>
                            {props.categories.map((value, index) => (
                                    <option key={"cat" + index} value={value.id}>{value.name}</option>
                                )
                            )}
                        </Form.Select>
                    </Form.Group>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.setShow(false)} variant="secondary">Close</Button>
                <Button disabled={isEditing} onClick={addHandler} variant="primary">
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


export default AddAnnouncement;
