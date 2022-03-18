import { Button, Navbar, Nav, Form, Container, FormControl, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomNavbar.css'
import { Component } from 'react';

function CheckForCurrentPath(path) {
    return window.location.pathname.toLocaleLowerCase().includes(path) ? 'current navbar-element' : 'navbar-element';
}

class CustomNavbar extends Component {
    render() {
        return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid className='container'>
                <Navbar.Brand className='navbar-title' href="/">ShareThought</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0 text-light" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link className={CheckForCurrentPath("posts")} href="/Posts">Posts</Nav.Link>
                        <Nav.Link className={CheckForCurrentPath("hashtags")} href="/Hashtags">Hashtags</Nav.Link>
                        <Nav.Link className={CheckForCurrentPath("creators")} href="/Creators">Creators</Nav.Link>
                        <Nav.Link className={CheckForCurrentPath("commentors")} href="/Commentors">Commentors</Nav.Link>
                        <Nav.Link className={CheckForCurrentPath("moderation")} href="/Moderation">Moderation</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="success navbar-button">Search</Button>
                    </Form>
                    <Nav className="d-flex">
                        <Nav.Link>
                            <img class="profile-pic" src="https://images.generated.photos/zJwBEDrZXdCfWQjUVHbRPHAAFx4ophx0DTxYY5egRmY/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODkzNTQ5LmpwZw.jpg" />
                        </Nav.Link>
                        <div>
                            <NavDropdown title="Virouz98" id="navbarScrollingDropdown" className='profile-name'>
                                <NavDropdown.Item href="/virouz98/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/virouz98/settings">Account settings</NavDropdown.Item>
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
