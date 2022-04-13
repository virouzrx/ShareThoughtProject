import axios from "axios";
import { Component } from "react";
import './SinglePost.css';
import AuthorAndDate from "./SinglePostSubComponents/AuthorAndDate";
import SinglePostHashtagWrapper from "./SinglePostSubComponents/SinglePostHashtagWrapper";
import SinglePostLikeButton from "./SinglePostSubComponents/SinglePostLikeButton";
import SinglePostCommentsCountButton from "./SinglePostSubComponents/SinglePostCommentsCountButton";
import CommentList from "./Comments/CommentList";
import { ButtonGroup, Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";


const api = axios.create({
    baseURL: `https://localhost:5001/api/v1/`
})


function GetRouteAddress() {
    console.log(window.location.pathname)
    var parts = window.location.pathname.split('/');
    return parts[2];
}

class SinglePost extends Component {
    state = {
        post: {},
        buttonEnabled: false
    }
    constructor(props) {
        super(props);

        api.get(`posts/${GetRouteAddress()}`)
            .then(res => {
                console.log(res.data)
                this.setState({ post: res.data })
            })
            .catch(error => {
                console.log(error)
            })
        this.Upvote = this.Upvote.bind(this);
        this.Downvote = this.Downvote.bind(this);
    }

    TestMethod() {
        let ref = document.getElementById('error');
        if (ref !== undefined && ref) {
            document.getElementById('likeButton').classList.add('active');
            document.getElementById('error').innerHTML = "You have to be logged in to like the post."
            setTimeout(() => {
                setInterval(document.getElementById('error').innerHTML = "", 5000)
            }, 3000);
            this.setState({ buttonEnabled: true })
        }
    }

    Upvote() {
        let token = localStorage.getItem('token');
        let ref = document.getElementById('error');
        if (!token) {
            if (ref !== undefined && ref) {
                document.getElementById('error').innerHTML = "You have to be logged in to like the post."
                setTimeout(() => {
                    setInterval(document.getElementById('error').innerHTML = "", 5000)
                }, 3000);
                this.setState({ buttonEnabled: true })
            }
        }
        else {
            const decoded = jwt_decode(token);
            api.put(`/posts/vote/${GetRouteAddress()}/${decoded.id}/${true}`)
                .catch(error => {
                    document.getElementById('error').innerHTML = error.response.data;
                    setTimeout(() => {
                        setInterval(document.getElementById('error').innerHTML = "", 5000)
                    }, 3000);
                });
        }
    }

    Downvote() {
        let token = localStorage.getItem('token');
        let ref = document.getElementById('error');
        if (!token) {
            if (ref !== undefined && ref) {
                document.getElementById('error').innerHTML = "You have to be logged in to like the post."
                setTimeout(() => {
                    setInterval(document.getElementById('error').innerHTML = "", 5000)
                }, 3000);
                this.setState({ buttonEnabled: true })
            }
        }
        else {
            const decoded = jwt_decode(token);
            api.put(`/posts/vote/${GetRouteAddress()}/${decoded.id}/${false}`)
                .catch(error => {
                    document.getElementById('error').innerHTML = error.response.data;
                    setTimeout(() => {
                        setInterval(document.getElementById('error').innerHTML = "", 5000)
                    }, 3000);
                })
        }
    }


    render() {
        console.log(this.state.post.hashtags)
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={12} md={8}>
                            <SinglePostHashtagWrapper mainHashtags={this.state.post.hashtags}></SinglePostHashtagWrapper>
                            <div className="post-title">{this.state.post.title}</div>
                            <AuthorAndDate authorName={this.state.post.authorName} authorPic={this.state.post.authorProfilePic} created={this.state.post.created}></AuthorAndDate>
                            <ButtonGroup style={{ marginTop: '1em' }}>
                                <Button id="likeButton" variant='outline-success' onClick={this.Upvote} disabled={this.state.buttonEnabled} style={{ marginLeft: '0', marginBottom: '0', padding: '0.5em', textAlign: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-arrow-up-square-fill icon-placement" viewBox="0 0 16 16">
                                        <path
                                            d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z">
                                        </path>
                                    </svg>
                                    <span id="postScore">
                                    </span>
                                </Button>
                                <Button variant="outline-danger" onClick={this.Downvote} style={{ margin: '0', marginLeft: '0px', padding: '0.5em', textAlign: 'center' }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                                    </svg>
                                </Button>
                                <Button variant="outline-secondary"  style={{ margin: '0', marginLeft: '-1px', padding: '0.5em', textAlign: 'center' }} disabled>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z" />
                                    </svg>
                                    <span style={{ padding: '5px' }}>
                                        {this.state.post.score}
                                    </span>
                                </Button>
                                <Button variant="outline-primary" style={{ borderRadius: '0' }} disabled>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                        class="bi bi-chat-left-fill icon-placement" viewBox="0 0 16 16">
                                        <path
                                            d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    </svg>
                                    <span style={{ padding: '5px' }}>
                                        {this.state.post.comments === undefined ? 0 : this.state.post.comments.length}
                                    </span>
                                </Button>
                                <div id="error" style={{ marginTop: '7px', marginLeft: '8px' }}></div>
                            </ButtonGroup>

                            <div className="single-post-desc" style={{ marginTop: '1em' }}>{this.state.post.description}</div>
                            <img className="single-post-img" src={`data:image/jpeg;base64,${this.state.post.imagePath}`} ></img>
                            <div className="single-post-content">
                                {this.state.post.content}
                            </div>
                            <CommentList postId={GetRouteAddress()}></CommentList>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default SinglePost;