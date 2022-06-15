import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React, {useEffect, useState} from "react";
import {Button, Modal, Col, Container, Row, Navbar, Nav} from "react-bootstrap";
import {getAllCategories} from "../categories/categoryAPICalls";
import {deleteAnnouncement, editAnnouncement, getAllNotPublicNews} from "./AnnouncementsAPICalls";
import {Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import _NavigationBar from "../Shared/_NavigationBar";
import {getAllUsers} from "../../client/client";
import {STATUSES} from "../../constants";

function ModerateAnnouncements(props) {

    // announcements list
    const [news, setNews] = useState([
        {
            "id": 0,
            "name": "",
            "content": "",
            "creationDate": "",
            "expirationDate": "",
            "announcementState": "",
            "categoryId": 0,
            "appUserId": 0
        }
    ])

    // categories list
    const [categories, setCategories] = useState([
        {id: 0, name: ""}
    ])

    // users list
    const [users, setUsers] = useState([
        {id: 0, username: 'null', email: 'null', roles: []}
    ])

    // modal related
    const [show, setShow] = useState(false);
    const moderate = (announcement) => {
        setAnnouncementEdit(announcement);
        handleShow(true);
    }
    const handleShow = (value) => {
        setShow(value);
    }

    //Announcement model
    const [announcementEdit, setAnnouncementEdit] = useState(
        {
            "id": 0,
            "name": "",
            "content": "",
            "creationDate": "2022-06-12 18:11:08",
            "expirationDate": "2022-06-12 18:11:08",
            "announcementState": "NotPublic",
            "categoryId": 0,
            "appUserId": 0
        }
    )

    const loadCategories = () =>  {
        getAllCategories()
            .then(data => {
                if (data.error_message?.startsWith("The Token has expired") ?? false){
                    props.history.push("/")
                }
                else if (data === null){
                    setCategories([])
                }
                else {
                    setCategories(data)
                    console.log(data)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }
    const loadAnnouncements = () => {
        getAllNotPublicNews()
            .then(data => {
                if (data.error_message?.startsWith("The Token has expired") ?? false){
                    props.history.push("/")
                }
                else if (data === null){
                    setNews([])
                }
                else {
                    setNews(data)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }
    const loadUsers = () => {
        getAllUsers()
            .then(data => {
                if (data.error_message?.startsWith("The Token has expired") ?? false){
                    props.history.push("/")
                }
                else if (data === null){
                    setUsers([])
                }
                else {
                    setUsers(data)
                    console.log(data)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    // load categories and news
    useEffect(() => {
        loadCategories()
        loadAnnouncements()
        loadUsers()
    }, []);

    //put method - publish announcement
    const publish = (announcement) => {
        announcement.announcementState = STATUSES[1];
        console.log(announcement)
        editAnnouncement(announcement).then(function (){
            loadAnnouncements()
            setShow(false)
        })
    }
    //delete method - delete announcement
    const deleteTheAnnouncement = (id) => {
        deleteAnnouncement(id).then(function () {
            loadAnnouncements()
            setShow(false)
        })
    }

    //page
    return (
        <div className="row">
            <_NavigationBar/>
            <div className="col-2"></div>
            <div className="col-8">
                <div className="row mt-4">
                    <div className="col-12">
                        <h3 className="float-start">Announcements</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>User Email</th>
                                <th>Creation Date</th>
                                <th>Expiration Date</th>
                                <th>Category</th>
                                <th>Operations</th>
                            </tr>
                            </thead>
                            <tbody>
                            {news.map((announcement) => (
                                <tr key={announcement.id}>
                                    <td>{announcement.name}</td>
                                    <td>{users.find(u => u.id === announcement.appUserId)?.email}</td>
                                    <td>{announcement.creationDate}</td>
                                    <td>{announcement.expirationDate}</td>
                                    <td>{categories.find(c => c.id === announcement.categoryId)?.name}</td>
                                    <td>
                                        <button onClick={() => moderate(announcement)} className="btn btn-primary me-2">Moderate</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="col-2"></div>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Moderate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>{announcementEdit.name}</h5>
                    </div>
                    <div className="col-12">
                        <p className="form-control">{announcementEdit.content}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleShow(false)} variant="secondary">Close Modal</Button>
                    <Button onClick={() => deleteTheAnnouncement(announcementEdit.id)} variant="danger">Delete</Button>
                    <Button onClick={() => publish(announcementEdit)} variant="primary">Publish</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModerateAnnouncements;