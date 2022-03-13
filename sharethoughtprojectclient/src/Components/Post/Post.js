import Card from 'react-bootstrap/Card'
import { ButtonGroup} from 'react-bootstrap';
import './Post.css';
import LikesCount from './LikesCount';
import CommentsCount from './CommentsCount';

function Post(props) {
    return (
        <Card style={{ width: "95%" }}>
            <Card.Img variant="top" src={props.postPic} />
            <Card.Body>
                <Card.Title className='likesCount'>{props.title}</Card.Title>
                <div class="hashtag-wrapper">
                    <div class="hashtag">Travels</div>
                    <div class="hashtag">Mexico</div>
                    <div class="hashtag">Something</div>
                  </div>
                <div class="post-author-and-info">
                    <img class="card-author-avatar" src={props.authorPic} />
                    <p class="author-name-and-date">Jacquline Kerez</p>
                    <div class="vr"></div>
                    <p class="author-name-and-date">15.12.2021</p>
                </div>
                <Card.Text>{props.desc}</Card.Text>
                <ButtonGroup className="me-2" aria-label="First group">                
                        <LikesCount upvoteCount={props.upvoteCount}></LikesCount>
                        <CommentsCount commentCount={props.commentCount}></CommentsCount>
                </ButtonGroup>
            </Card.Body>
        </Card>);
}

export default Post;