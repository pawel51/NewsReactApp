import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon as FaIcon} from "@fortawesome/react-fontawesome";
import {faDoorOpen, faHome} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "../../constants";
import "../../App.css"

const _NavigationBar = (props) => {

    const logout = () => {
        sessionStorage.removeItem(ACCESS_TOKEN_NAME)
        sessionStorage.removeItem(REFRESH_TOKEN_NAME)
    }

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/"><FaIcon icon={faHome}/></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link className={"lastNav"} as={Link} to={"/categories"}>Categories</Nav.Link>
                </Nav>
                <Nav className="me-auto">
                    <Nav.Link className={"lastNav"} as={Link} to={"/announcements"}>Announcements</Nav.Link>
                </Nav>
                <Nav className="me-auto">
                    <Nav.Link className={"lastNav"} as={Link} to={"/adminpanel"}>AdminPanel</Nav.Link>
                </Nav>
                <Nav className="me-auto">
                    <Nav.Link className={"lastNav"} as={Link} to={"/moderate"}>Moderate</Nav.Link>
                </Nav>
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