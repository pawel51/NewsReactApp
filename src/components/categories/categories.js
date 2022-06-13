import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React, {useEffect, useState} from "react";
import {Button, Modal, Col, Container, Row, Navbar, Nav} from "react-bootstrap";
import {addCategory, deleteCategory, editCategory, getAllCategories} from "./categoryAPICalls";
import {Link, withRouter} from "react-router-dom";
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import _NavigationBar from "../Shared/_NavigationBar";

function Categories(props) {

    //loadCategoriesOnStart
    useEffect(() => {
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
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }, []);

    //Modal
    const [show, setShow] = useState(false);
    const handleShow = (value, id, name) => {
        setShow(value);
        let category = {id: id, name: name};
        setCategoryEdit(category);
    }

    //Category for put
    const [dataEdit, setCategoryEdit] = useState([
        {
            id: "",
            name: ""
        }
    ])
    //Category for get
    const [dataOutput, setCategories] = useState([
        {
            "id": 1,
            "name": "c1"
        },
        {
            "id": 2,
            "name": "c2"
        }
    ])
    //Category for post
    const [dataInput, setCategory] = useState([
        {
            name: ""
        }
    ])
    //submit form handler (post method)
    const submitHandler = (e) => {
        e.preventDefault();
        addCategory(dataInput.name).then(function (){
            getAllCategories()
                .then(data => {
                    setCategories(data)
                })
                .catch(err => {
                    console.log(err.response)
                })
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    //add category input
    const changeHandler = (e) => {
        let category = {name: e.target.value};
        setCategory(category);
    }
    //edit category input (in modal)
    const changeEditHandler = (e) => {
        let category = {id: dataEdit.id, name: e.target.value};
        setCategoryEdit(category);
    }
    //put method
    const editHandler = (id, name) => {
        editCategory(id, name).then(function (){
            getAllCategories()
                .then(data => {
                    setCategories(data)
                    setShow(false)
                })
                .catch(err => {
                    console.log(err.response)
                })
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    //delete method
    const deleteHandler = (id) => {
        deleteCategory(id).then(function (){
            getAllCategories()
                .then(data => {
                    setCategories(data)
                })
                .catch(err => {
                    console.log(err.response)
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //page
    return (
        <div className="row">
            <_NavigationBar/>
            <div className="col-2"></div>
            <div className="col-8">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10">
                        <form onSubmit={submitHandler}>
                            <div className="d-flex">
                                <div className="col-8 mx-2">
                                    <input onChange={changeHandler} type="text" className="form-control" placeholder="Name" value={dataOutput.name}/>
                                </div>
                                <div className="">
                                    <button type="submit" className="btn btn-primary">Add Category</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <h3 className="float-start">Categories</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Operations</th>
                            </tr>
                            </thead>
                            <tbody>
                            {dataOutput.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>
                                        <button onClick={() => handleShow(true, category.id, category.name)} className="btn btn-primary me-2">Edit Category</button>
                                        <button onClick={() => deleteHandler(category.id)} className="btn btn-primary">Delete Category</button>
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
                    <Modal.Title>Login Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-2"></div>
                    <div className="col-8">
                        <input onChange={changeEditHandler} type="text" className="form-control" placeholder="Name" value={dataEdit.name}/>
                    </div>
                    <div className="col-2"></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleShow(false)} variant="secondary">Close Modal</Button>
                    <Button onClick={() => editHandler(dataEdit.id, dataEdit.name)} variant="primary">Accept</Button>
                </Modal.Footer>
            </Modal>
        </div>
        );
}

export default withRouter(Categories);