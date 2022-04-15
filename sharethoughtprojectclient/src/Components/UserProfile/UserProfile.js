import { Component } from "react";
import { Route, Routes } from 'react-router-dom';
import { ButtonGroup, Button, Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import './UserProfile.css';
import UserProfileHashtagWrapper from "./UserProfileSubComponents/UserProfileHashtagWrapper";
import UserProfileCommentsWrapper from "./UserProfileWrappers/UserProfileCommentsWrapper";
import UserProfileLikedPostsWrapper from "./UserProfileWrappers/UserProfileLikedPostsWrapper";
import UserProfilePostsWrapper from "./UserProfileWrappers/UserProfilePostsWrapper";
import axios from 'axios';
import PropagateLoader from "react-spinners/PropagateLoader";
import jwt_decode from "jwt-decode";

const api = axios.create({
    baseURL: `https://localhost:5001/api/v1/`
})

function GetRouteAddress() {
    console.log(window.location.pathname)
    var parts = window.location.pathname.split('/');
    return parts[2];
}

function LoadCreatorData(user) {
    if (user !== undefined) {
        if (user.role === 'Creator') {
            return (
                <span>
                    <ListGroupItem>
                        Post amount: {user.postAmount}
                    </ListGroupItem>
                    <ListGroupItem>
                        Post score: {user.postScore}
                    </ListGroupItem>
                </span>)
        }
        else {
            return <div></div>
        }
    }
    else {
        return <div></div>
    }
}

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
    state = {
        user: {},
        loading: true,
        notFound: false
    }
    constructor(props) {
        super(props);

        api.get(`users/${GetRouteAddress()}`)
            .then(res => {
                console.log(res.data)
                this.setState({ user: res.data })
                this.setState({ loading: false })
            })
            .catch(error => {
                console.log(error)
                this.setState({ notFound: true })
                this.setState({ loading: false })
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <Container>
                    <Col>
                        <div style={{ marginLeft: '-2em', textAlign: 'center', marginTop: '10em', opacity: '0.9' }}>
                            <PropagateLoader color='#198754' loading={true} size={30} />
                        </div>
                        <p style={{ paddingTop: '5em', textAlign: 'center' }}>Loading...</p>
                    </Col>
                </Container>
            )
        }
        else if (this.state.notFound) {
            return (<h1 style={{ textAlign: 'center', fontSize: 'xx-large', marginTop: '5em', opacity: '0.7' }}>
                <Col>
                    <div>\(‸)/</div>
                    <div>No user with given username was found!</div>
                </Col>
            </h1>)
        }
        else {
            return (
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <Card className="user-profile-card">
                                    <Card.Img variant="top" src={'data:image/jpeg;base64,' + this.state.user.avatarPath} />
                                    <Card.Body>
                                        <Card.Title>{this.state.user.userName}</Card.Title>
                                        <Card.Text>
                                            {this.state.user.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>
                                            Comment amount: {this.state.user.commentAmount}
                                        </ListGroupItem>
                                        {LoadCreatorData(this.state.user)}
                                    </ListGroup>
                                </Card>
                            </Col>
                            <Col>
                                <div className="feed-button-group">
                                    <ButtonGroup aria-label="Basic example">
                                        <Button className={CheckForCurrentPath("recentcomments")} variant="outline-success feed" href={`/user/${GetRouteAddress()}/recentcomments`}>Recent comments</Button>
                                    </ButtonGroup>
                                </div>

                                <Routes>
                                    <Route path="recentcomments" element={<UserProfileCommentsWrapper />} />
                                </Routes>
                            </Col>
                        </Row>
                    </Container>
                </div >);
        }
    }
}


export default UserProfile;