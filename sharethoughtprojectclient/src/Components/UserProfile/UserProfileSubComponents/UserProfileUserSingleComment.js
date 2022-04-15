import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import '../UserProfile.css';

const UserProfileUserSingleComment = (props) => {
    return (
        <div className="comment-wrapper">
            <Row className="user-comments-wrapper"><a className="postLink" href={`/post/${props.postId}`}>{props.title}</a></Row>
            <Col>
                {props.content}
            </Col>
        </div>);
}

export default UserProfileUserSingleComment;