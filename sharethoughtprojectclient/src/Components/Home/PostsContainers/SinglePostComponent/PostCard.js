import Card from 'react-bootstrap/Card'
import { ButtonGroup} from 'react-bootstrap';
import '../../../Home/Home.css';
import LikesCount from './LikesCount';
import CommentsCount from './CommentsCount';
import HashtagWrapper from './HashtagWrapper';
import AuthorInfoAndCreateDate from './AuthorInfoAndCreationDate';

function PostCard(props) {
    return (
        <Card style={{ width: "95%" }}>
            <Card.Img variant="top" src={props.postPic} />
            <Card.Body>
                <Card.Title className='custom-card-title'>{props.title}</Card.Title>
                <HashtagWrapper hashtags={props.hashtags}></HashtagWrapper>
                <AuthorInfoAndCreateDate authorPic={props.authorPic}></AuthorInfoAndCreateDate>
                <Card.Text>{props.desc}</Card.Text>
                <ButtonGroup className="me-2" aria-label="First group">                
                        <LikesCount upvoteCount={props.upvoteCount}></LikesCount>
                        <CommentsCount commentCount={props.commentCount}></CommentsCount>
                </ButtonGroup>
            </Card.Body>
        </Card>);
}

export default PostCard;