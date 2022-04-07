import { Component } from "react";
import { ButtonGroup, Card, Col, Row } from "react-bootstrap";
import AuthorInfoAndCreateDate from "../../Home/PostsContainers/SinglePostComponent/AuthorInfoAndCreationDate";
import CommentsCount from "../../Home/PostsContainers/SinglePostComponent/CommentsCount";
import HashtagWrapper from "../../Home/PostsContainers/SinglePostComponent/HashtagWrapper";
import LikesCount from "../../Home/PostsContainers/SinglePostComponent/LikesCount";

class SearchResultPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false
        };
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                isMobile: window.innerWidth < 800
            });
        }, false);
    }

    renderHashtags(hashtags) {
        if (hashtags === undefined) {
            return <span></span>
        }
        else {
            return (hashtags.map((ht) => {
                <div key={ht.id} className="hashtag">{ht.hashtagName}</div>
            }))
        }
    }

    render() {
        var date = new Date(this.props.joined)
        var stringifiedDate = date.toLocaleDateString("es-PE");
        return (
            <div className="new-post">
                <a className="hyperlink-card" href={"/post/" + this.props.id}>
                    <Row>
                        <Col md={3}>
                            <Card.Img variant="top" src={`data:image/jpeg;base64,${this.props.imagePath}`} style={{ width: '100%' }} />
                        </Col>
                        <Col md={8}>
                            <Card.Title className="custom-card-title">{this.props.title}</Card.Title>
                            {this.renderHashtags(this.props.hashtags)} {/*todo - WHY THE HELL THIS DOESNT WORK?! */}
                            <AuthorInfoAndCreateDate showInfo={this.props.showInfo} authorName={this.props.authorName} authorPic={this.props.authorPic} created={this.props.created}></AuthorInfoAndCreateDate>
                            <Card.Text>{this.props.desc}</Card.Text>
                            <ButtonGroup className="me-2" aria-label="First group">
                                <div className="likes-count">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="bi bi-arrow-up-square-fill icon-placement adjusted-icon-placement" viewBox="0 0 16 16">
                                        <path
                                            d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z">
                                        </path>
                                    </svg>
                                    {this.props.upvoteCount === undefined ? 0 : this.props.upvoteCount}
                                </div>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </a>
            </div>);
    }
}

export default SearchResultPost;