import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React, {useEffect, useState} from "react";
import {Button, Modal, Col, Container, Row, Navbar, Nav, Table} from "react-bootstrap";
import {getAllCategories} from "../categories/categoryAPICalls";
import {Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import _NavigationBar from "../Shared/_NavigationBar";
import {getUserId, getAllNews, deleteAnnouncement, getAllStatuses} from "./AnnouncementsAPICalls";
import {CATEGORIES} from "../../constants";
import EditAnnouncement from "./EditAnnouncement";
import AddAnnouncement from "./AddAnnouncement";

const Announcements = (props) => {

    const [news, setNews] = useState([
        {
            "id": 0,
            "name": "",
            "content": "",
            "creationDate": "2022-06-12 18:11:08",
            "expirationDate": "2022-06-12 18:11:08",
            "announcementState": "NotPublic",
            "categoryId": 0
        }
    ])

    const [categories, setCategories] = useState([
        {id: 0, name: ""}
    ])

    const [statuses, setStatuses] = useState([""])

    const [userId, setUserId] = useState()

    const [showEdit, setShowEdit] = useState(false)
    const [showAdd, setShowAdd] = useState(false)

    const [annToEdit, setAnnToEdit] = useState({})

    useEffect(() => {
        getUserId()
            .then(res => {
                setUserId(res)
                getAllNews(res)
                    .then(res => setNews(res))
            })
        getAllCategories()
            .then(res => setCategories(res))
        getAllStatuses()
            .then(res => setStatuses(res))
    }, [])



    function handleShow(value, annToEdit) {
        setAnnToEdit(annToEdit)
        setShowEdit(value)
    }

    const updateOnSuccess = () => {
        getAllNews(userId)
            .then(res => setNews(res))
    }

    const deleteAnnon = (e) => {
        const id = parseInt(e.target.name)
        deleteAnnouncement(id)
            .then(() => {
                getAllNews(userId)
                    .then(res => setNews(res))
            })
    }

    return (
        <>
            <_NavigationBar/>
            <Button onClick={() => setShowAdd(true)} >Add</Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>State</th>
                    <th>Content</th>
                    <th>Creation Date</th>
                    <th>Expiration Date</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>

                {news.length ? news.map((v) => (
                    <tr key={v.id}>
                        <td>{v.id}</td>
                        <td>{v.name}</td>
                        <td>{v.announcementState}</td>
                        <td>{v.content}</td>
                        <td>{v.creationDate}</td>
                        <td>{v.expirationDate}</td>
                        <td>{categories.find(e => e.id === v.categoryId)?.name}</td>
                        <td>
                            <Button onClick={() => handleShow(true, v)}>Edit</Button>
                        </td>
                        <td>
                            <Button name={v.id.toString()} onClick={(e) => deleteAnnon(e)}>Delete</Button>
                        </td>
                    </tr>
                )) : null}
                </tbody>
            </Table>

            <AddAnnouncement show={showAdd}
                             setShow={setShowAdd}
                             updateOnSucces={updateOnSuccess}
                             categories={categories}/>

            <EditAnnouncement show={showEdit}
                              setShowEdit={setShowEdit}
                              editItem={annToEdit}
                              setEditItem={setAnnToEdit}
                              updateOnSucces={updateOnSuccess}/>
        </>
    )
}

export default Announcements