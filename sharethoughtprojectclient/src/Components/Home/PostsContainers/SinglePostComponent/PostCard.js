import Card from 'react-bootstrap/Card'
import { ButtonGroup } from 'react-bootstrap';
import '../../../Home/Home.css';
import LikesCount from './LikesCount';
import CommentsCount from './CommentsCount';
import HashtagWrapper from './HashtagWrapper';
import AuthorInfoAndCreateDate from './AuthorInfoAndCreationDate';

function PostCard(props) {
    return (
        <a className="hyperlink-card" href="/post/1">
            <Card className="standard-card">
                <Card.Img variant="top" img src={`data:image/jpeg;base64,${props.imagePath}`}  />
                <Card.Body>
                    <Card.Title className='custom-card-title'>{props.title}</Card.Title>
                    <HashtagWrapper hashtags={props.hashtags}></HashtagWrapper>
                    <AuthorInfoAndCreateDate showInfo={true} authorPic={props.authorPic} authorName={props.authorName} created={props.created}></AuthorInfoAndCreateDate>
                    <Card.Text>{props.desc}</Card.Text>
                    <ButtonGroup className="me-2" aria-label="First group">
                        <LikesCount upvoteCount={props.upvoteCount}></LikesCount>
                        <CommentsCount commentCount={props.comments}></CommentsCount>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </a>);
}

export default PostCard;