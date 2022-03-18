import '../../../Home/Home.css';
import HashtagWrapper from './HashtagWrapper';
import { Row, Col, Card } from 'react-bootstrap'
import { ButtonGroup } from 'react-bootstrap';
import LikesCount from './LikesCount';
import CommentsCount from './CommentsCount';
import AuthorInfoAndCreateDate from './AuthorInfoAndCreationDate';

function PostHorizontal(props) {
    return (

        <div className="new-post">
            <Row>
                <Col md={4}>
                    <Card.Img variant="top" src={props.postPic} />
                </Col>
                <Col md={8}>
                    <Card.Title className="custom-card-title">{props.title}</Card.Title>
                    <HashtagWrapper hashtags={props.hashtags} />
                    <AuthorInfoAndCreateDate authorPic={props.authorPic}></AuthorInfoAndCreateDate>
                    <Card.Text>{props.desc}</Card.Text>
                    <ButtonGroup className="me-2" aria-label="First group">
                        <LikesCount upvoteCount={props.upvoteCount}></LikesCount>
                        <CommentsCount commentCount={props.commentCount}></CommentsCount>
                    </ButtonGroup>
                </Col>
            </Row>
        </div>);
}

export default PostHorizontal;