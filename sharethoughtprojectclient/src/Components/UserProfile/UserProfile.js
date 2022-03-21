import { Component } from "react";
import { Route, Routes } from 'react-router-dom';
import { ButtonGroup, Button, Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import './UserProfile.css';
import UserProfileHashtagWrapper from "./UserProfileSubComponents/UserProfileHashtagWrapper";
import UserProfileCommentsWrapper from "./UserProfileWrappers/UserProfileCommentsWrapper";
import UserProfileLikedPostsWrapper from "./UserProfileWrappers/UserProfileLikedPostsWrapper";
import UserProfilePostsWrapper from "./UserProfileWrappers/UserProfilePostsWrapper";

function CheckForCurrentPath(path) {
    if (path === "new") {
        if (window.location.pathname.toLocaleLowerCase().includes(path) || window.location.pathname === "/creators") { //either "/creators/new" or "/creators"
            return 'creators-current';
        }
        else {
            return '';
        }
    }
    else {
        return window.location.pathname.toLocaleLowerCase().includes(path) ? 'creators-current ' : '';
    }
}

class UserProfile extends Component {
    constructor(props) {
        super(props);
        console.log(window.location.pathname)
    }

    render() {
        return (<div>
            <Container>
                <Row>
                    <Col>
                        <Card className="user-profile-card">
                            <Card.Img variant="top" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" />
                            <Card.Body>
                                <Card.Title>J33se_Pinkman</Card.Title>
                                <Card.Text>
                                    Dunno what do you want to see here, I'm just a user man.
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>
                                    <Row>
                                        <Col style={{ borderRight: '1px solid' }}>
                                            Comment Score: 213
                                        </Col>
                                        {/*Put if here which will validate if user is a creator or normal*/}
                                        <Col>
                                            katana
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>Observes:
                                    <UserProfileHashtagWrapper mainHashtags={["Android", "Microsoft", "IOT"]}>

                                    </UserProfileHashtagWrapper>
                                </ListGroupItem>
                            </ListGroup>
                            <Button variant="outline-warning" className="report-user-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                                </svg>
                            </Button>
                        </Card>
                    </Col>
                    <Col>
                        <div className="feed-button-group">
                            <ButtonGroup aria-label="Basic example">
                                <Button className={CheckForCurrentPath("recentlyliked")} variant="outline-success feed" href="/user/1/recentlyliked">Recently liked</Button>
                                <Button className={CheckForCurrentPath("recentposts")} variant="outline-success feed" href="/user/1/recentposts">Recent posts</Button>
                                <Button className={CheckForCurrentPath("recentcomments")} variant="outline-success feed" href="/user/1/recentcomments">Recent comments</Button>
                            </ButtonGroup>
                        </div>

                        <Routes>
                            <Route path="recentcomments" element={<UserProfileCommentsWrapper />} />
                            <Route path="recentlyliked" element={<UserProfileLikedPostsWrapper />} />
                            <Route path="recentposts" element={<UserProfilePostsWrapper />} />
                            <Route exact path="/" element={<UserProfileLikedPostsWrapper />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </div >);
    }
}


export default UserProfile;