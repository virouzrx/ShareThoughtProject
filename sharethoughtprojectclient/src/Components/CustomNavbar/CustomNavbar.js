import { Button, Navbar, Nav, Form, Container, FormControl, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomNavbar.css'
import { Component } from 'react';
import { Link } from 'react-bootstrap-icons';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { createBrowserHistory } from 'history';

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
    let list = [];
    if (token) {
        const decoded = jwt_decode(token);
        list.push(<Nav.Link className={CheckForCurrentPath("posts")} href="/posts">Posts</Nav.Link>);
        list.push(<Nav.Link className={CheckForCurrentPath("creators")} href="/creators">Creators</Nav.Link>);
        if (decoded.role === 'Admin' || decoded.role === "Moderator") {
            list.push(<Nav.Link className={CheckForCurrentPath("moderation")} href="/moderation">Moderation</Nav.Link>);
        }
        if (decoded.role === "Creator") {
            list.push(<Nav.Link className={CheckForCurrentPath("createpost")} href="/createpost">Create post</Nav.Link>);
        }
    }
    else {
        list.push(<Nav.Link className={CheckForCurrentPath("posts")} href="/posts">Posts</Nav.Link>);
        list.push(<Nav.Link className={CheckForCurrentPath("creators")} href="/creators">Creators</Nav.Link>);
    }
    return list;
}


const GenerateUserInfoByToken = () => {
    const token = localStorage.getItem("token");
    let list = [];
    if (token) {
        const decoded = jwt_decode(token);
        return (
            <Nav className="d-flex">
                <div className="vr" style={{ width: '1.5px', backgroundColor: 'white', marginLeft: '1em', marginRight: '0.25em' }}></div>
                <div>
                    <NavDropdown title={decoded.username} id="navbarScrollingDropdown" className='current navbar-element'>
                        <NavDropdown.Item href={`/user/lol}`}>Profile</NavDropdown.Item>
                        <NavDropdown.Item href={`/user/lol/settings`}>Account settings</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/logout">
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
            </Nav>);
    }
    else {
        return (
            <Nav className="d-flex" style={{ marginLeft: '1em' }}>
                <Nav.Link className="navbar-element" href="/auth/login">Login</Nav.Link>
                <div className="vr" style={{ width: '1.5px', backgroundColor: 'white' }}></div>
                <Nav.Link className="navbar-element" href="/auth/register">Register</Nav.Link>
            </Nav>
        );
    }
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
                        <Nav className="me-auto my-2 my-lg-0 text-light" style={{ maxHeight: '100px' }}>
                            {GenerateNavbarElementsByToken()}
                        </Nav>
                        <Form className="d-flex" style={{ marginTop: '-0.4em' }}>
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
                        {GenerateUserInfoByToken()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>);
    }
}

export default CustomNavbar;
