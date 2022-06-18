import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React, {useEffect, useState} from "react";
import {Button, Modal, Col, Container, Row, Navbar, Nav, Table} from "react-bootstrap";
import {getAllCategories} from "../categories/categoryAPICalls";
import _NavigationBar from "../Shared/_NavigationBar";
import {getUserId, getAllNews, getAllStatuses} from "../news/AnnouncementsAPICalls";
import {withRouter} from "react-router-dom";
import {getAllPublicNews} from "./HomeAPICalss";


const Home = (props) => {

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

    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        getAllPublicNews()
            .then(res => setNews(res))
        getAllCategories()
            .then(res => setCategories(res))
        getAllStatuses()
            .then(res => setStatuses(res))
    }, [])



    return (
        <>
            <_NavigationBar/>
            <h2>All public Announcements</h2>
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
                    </tr>
                )) : null}
                </tbody>
            </Table>
        </>
    )
}

export default withRouter(Home)