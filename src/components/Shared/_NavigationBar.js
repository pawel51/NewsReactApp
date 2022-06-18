import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {faDoorOpen, faHome} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "../../constants";
import "../../App.css"
import {useEffect, useState} from "react";
import {getUserRoles} from "./NavigationAPICalls";

const _NavigationBar = (props) => {

    const [userRoles, setUserRoles] = useState(
        []
    )

    useEffect(() => {

        getUserRoles()
            .then(res => setUserRoles(res))

    }, [])

    const logout = () => {
        sessionStorage.removeItem(ACCESS_TOKEN_NAME)
        sessionStorage.removeItem(REFRESH_TOKEN_NAME)
    }

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/home"><FaIcon icon={faHome}/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link className={"lastNav"} as={Link} to={"/categories"}>Categories</Nav.Link>
                </Nav>
                <Nav className="me-auto">
                    <Nav.Link className={"lastNav"} as={Link} to={"/announcements"}>My Announcements</Nav.Link>
                </Nav>
                {userRoles.filter(roles => roles.name === "ROLE_ADMIN").length > 0 ?
                    <Nav className="me-auto">
                        <Nav.Link className={"lastNav"} as={Link} to={"/adminpanel"}>AdminPanel</Nav.Link>
                    </Nav> : null
                }
                {userRoles.filter(roles => roles.name === "ROLE_ADMIN" || roles.name === "ROLE_MANAGER").length > 0?
                    <Nav className="me-auto">
                        <Nav.Link className={"lastNav"} as={Link} to={"/moderate"}>Moderate</Nav.Link>
                    </Nav> : null
                }
                <NavDropdown title="More" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to={"/"} onClick={logout}>
                        Login
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/register"} onClick={logout}>
                        Register
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to={"/"} onClick={logout}>
                            <FaIcon icon={faDoorOpen}/><span>   </span>
                            LogOut
                    </NavDropdown.Item>
                </NavDropdown>
            </Container>
        </Navbar>
    )
}

export default _NavigationBar