import { ButtonGroup, Container, Col, Row, Card, Button, Form, FormControl } from "react-bootstrap";
import CommentsCount from "../Home/PostsContainers/SinglePostComponent/CommentsCount";
import './SinglePost.css';
import AuthorAndDate from "./SinglePostSubComponents/AuthorAndDate";
import SinglePostHashtagWrapper from "./SinglePostSubComponents/SinglePostHashtagWrapper";
import SinglePostLikeButton from "./SinglePostSubComponents/SinglePostLikeButton";
import SinglePostCommentsCountButton from "./SinglePostSubComponents/SinglePostCommentsCountButton";
import CommentList from "./Comments/CommentList";

const SinglePostPage = (props) => {
    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={8}>
                        <SinglePostHashtagWrapper mainHashtags={["Angular", "ReactJS", "Webdev"]}></SinglePostHashtagWrapper>
                        <div className="post-title">This is a very fascinating post!</div>
                        <AuthorAndDate authorName="Nina Kasai" authorPic="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"></AuthorAndDate>
                        <ButtonGroup className="me-2 likes-and-comments-wrapper" aria-label="First group">
                            <SinglePostLikeButton upvoteCount={5}></SinglePostLikeButton>
                            <SinglePostCommentsCountButton commentCount={15}></SinglePostCommentsCountButton>
                        </ButtonGroup>
                        <div className="single-post-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</div>
                        <img className="single-post-img" src="https://s0.2mdn.net/simgad/8623654726582243725"></img>
                        <div className="single-post-content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisl enim, ultricies ac mi sollicitudin, viverra vehicula eros. Vestibulum et egestas enim. Quisque a lorem non orci auctor ultricies non eu velit. Nam dapibus lorem quam, vel egestas arcu sollicitudin at. Donec erat lorem, posuere vulputate molestie at, egestas id metus. Donec semper placerat metus, eu tristique purus. Curabitur eu fermentum lacus, id vestibulum sapien. Aliquam sagittis, lectus id ullamcorper tincidunt, ligula magna volutpat lacus, ut elementum lectus turpis gravida felis. Sed eget lectus sit amet nulla luctus ultrices. Aliquam tristique diam nibh, sed molestie magna ullamcorper ac. Suspendisse dictum nisi et massa condimentum lacinia. Suspendisse potenti.
                            <br /><br />Etiam est lectus, lobortis sodales ornare a, auctor nec dolor. Nunc luctus tortor ut nisi egestas, a dapibus ligula tristique. Aenean rhoncus euismod velit, ac luctus lectus congue vitae. Pellentesque finibus justo sem, vitae luctus mauris maximus nec. Ut bibendum, diam rhoncus fringilla interdum, nunc elit mollis enim, sit amet rutrum sem ante sed risus. Donec posuere feugiat hendrerit. Sed ac aliquet neque, eget scelerisque nisl. Praesent malesuada sed felis vitae elementum. Curabitur efficitur eu felis nec luctus. Integer vulputate massa dolor, non tristique erat ornare quis. Aenean ac ante velit. Suspendisse hendrerit justo nec enim molestie tristique. Nunc fringilla eros quis risus auctor, sit amet sodales eros viverra. Cras porttitor porttitor purus feugiat consectetur. Aliquam id lacus at ex consectetur condimentum.
                            <br /><br />Nunc gravida nulla a ullamcorper consequat. Duis tincidunt purus urna, eu vestibulum libero vehicula eget. Curabitur nisi quam, interdum eget neque sed, luctus porta neque. Cras id facilisis ipsum. Aliquam erat volutpat. Quisque odio orci, finibus sit amet congue sit amet, euismod et eros. Phasellus et lacus ac leo mollis accumsan. Etiam interdum sapien vel diam maximus, id tristique tortor maximus. Nunc et sodales nulla, nec aliquam dui. Curabitur at ex ante. Praesent a diam eu nibh egestas varius. Ut at purus at orci pretium feugiat ut vitae quam. Sed et bibendum lacus.</div>
                        <div className="comments-header">Comments</div>
                        <Form className="d-flex">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{width: '100%'}}>
                                <Form.Control as="textarea" rows={3} resize="none" style={{resize: 'none'}}/>
                            </Form.Group>
                        </Form>
                        <Button variant="outline-primary" style={{marginTop: '-0.5em', marginBottom: '1em'}}>Add comment</Button>
                        <CommentList postId={1}></CommentList>
                    </Col>
                    <Col className="related-posts">
                        <p className="secondary-column-header">More from this.authorName</p>
                        <Card className="side-column-card">
                            <Card.Img variant="top" src="https://i.ytimg.com/vi/LL70ksp198M/maxresdefault.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="side-column-card">
                            <Card.Img variant="top" src="https://i.ytimg.com/vi/LL70ksp198M/maxresdefault.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="side-column-card">
                            <Card.Img variant="top" src="https://i.ytimg.com/vi/LL70ksp198M/maxresdefault.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src="https://i.ytimg.com/vi/LL70ksp198M/maxresdefault.jpg" />
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>);
}

export default SinglePostPage;