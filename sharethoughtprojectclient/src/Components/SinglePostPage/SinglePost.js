import axios from "axios";
import { Component } from "react";
import './SinglePost.css';
import AuthorAndDate from "./SinglePostSubComponents/AuthorAndDate";
import SinglePostHashtagWrapper from "./SinglePostSubComponents/SinglePostHashtagWrapper";
import SinglePostLikeButton from "./SinglePostSubComponents/SinglePostLikeButton";
import SinglePostCommentsCountButton from "./SinglePostSubComponents/SinglePostCommentsCountButton";
import CommentList from "./Comments/CommentList";
import { ButtonGroup, Card, Col, Container, Form, Row, Button } from "react-bootstrap";


const api = axios.create({
    baseURL: `https://localhost:5001/api/v1/`
})

class SinglePost extends Component {
    state = {
        post: []
    }
    constructor(props) {
        super(props);
        api.get(`posts/9a6b5be6-b3ef-4c2d-a36b-08da14c62914`)
        .then(res => {
            console.log(res.data)
            this.setState({ post: res.data })   
        })
        .catch(error => {
            console.log(error)
        })
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
                            <ButtonGroup className="me-2 likes-and-comments-wrapper" aria-label="First group">
                                <SinglePostLikeButton upvoteCount={this.state.post.score}></SinglePostLikeButton>
                                {this.state.post.comments}
                                <SinglePostCommentsCountButton commentCount={this.state.post.comments}></SinglePostCommentsCountButton>
                            </ButtonGroup>
                            <div className="single-post-desc">{this.state.post.description}</div>
                            <img className="single-post-img" src={`data:image/jpeg;base64,${this.state.post.imagePath}`} ></img>
                            <div className="single-post-content">
                                {this.state.post.content}
                            </div>
                            <div className="comments-header">Comments</div>
                            <Form className="d-flex">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ width: '100%' }}>
                                    <Form.Control as="textarea" rows={3} resize="none" style={{ resize: 'none' }} />
                                </Form.Group>
                            </Form>
                            <Button variant="outline-primary" style={{ marginTop: '-0.5em', marginBottom: '1em' }}>Add comment</Button>
                            <CommentList postId={1}></CommentList>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default SinglePost;