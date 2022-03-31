import { Button, Navbar, Nav, Form, Container, FormControl, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomNavbar.css'
import { Component } from 'react';
import { Link } from 'react-bootstrap-icons';
import jwt_decode from "jwt-decode";

function CheckForCurrentPath(path) {
    if (path === "posts") {
        var routeElements = window.location.pathname.split('/');
        var mainRoute = routeElements[1];
        return mainRoute === "posts" ? 'current navbar-element' : 'navbar-element';
    }
    else {
        return window.location.pathname.toLocaleLowerCase().includes(path) ? 'current navbar-element' : 'navbar-element';
    }
}

function GenerateNavbarElementsByToken() {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    let list = [];
    list.push(<Nav.Link className={CheckForCurrentPath("posts")} href="/posts">Posts</Nav.Link>);
    list.push(<Nav.Link className={CheckForCurrentPath("creators")} href="/creators">Creators</Nav.Link>);
    if (decoded.role === 'Admin' || decoded.role === "Moderator") {
        list.push(<Nav.Link className={CheckForCurrentPath("moderation")} href="/moderation">Moderation</Nav.Link>);
    }
    if (decoded.role === "Creator") {
        list.push(<Nav.Link className={CheckForCurrentPath("createpost")} href="/createpost">Create post</Nav.Link>);
    }
    return list;
}

class CustomNavbar extends Component {
    state = {
        val: ""
    };

    onSubmit = () => {
        console.log(this.state.val);
    };

    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container fluid className='container'>
                    <Navbar.Brand className='navbar-title' href="/">ShareThought</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 text-light" style={{ maxHeight: '100px' }} navbarScroll>
                            {GenerateNavbarElementsByToken()}
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={this.state.val}
                                onChange={e => this.setState({ val: e.target.value })}
                            />
                            <Button type="submit" variant="success navbar-button" href={`/search/${this.state.val}`}>Search</Button>
                        </Form>
                        <Nav className="d-flex">
                            <Nav.Link>
                                <img className="profile-pic" src="https://images.generated.photos/zJwBEDrZXdCfWQjUVHbRPHAAFx4ophx0DTxYY5egRmY/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODkzNTQ5LmpwZw.jpg" />
                            </Nav.Link>
                            <div>
                                <NavDropdown title="Virouz98" id="navbarScrollingDropdown" className='profile-name'>
                                    <NavDropdown.Item href="/user/virouz98">Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="/user/virouz98/settings">Account settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/logout">
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown></div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>);
    }
}

export default CustomNavbar;
