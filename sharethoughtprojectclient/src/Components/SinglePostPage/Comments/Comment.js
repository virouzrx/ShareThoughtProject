import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import './Comment.css';

const Comment = (props) => {
    var date = new Date(props.created)
    var stringifiedDate = date.toLocaleDateString("es-PE");
    return (
        <div>
            <div className="comment-wrapper">
                <Row>
                    <Col className="comment-avatar-col"><a className="hyperlink-card" href={`/user/${props.userId}`}><img src={`data:image/jpeg;base64,${props.authorAvatar}`} /></a></Col>
                    <Col>
                        <Row>
                            <Col>
                                <Col>
                                    <Row className="commentor-name" xs={6}><a className="hyperlink-card" href={`/user/${props.userId}`}>{props.authorName}</a></Row>
                                    <Row className="comment-date">{stringifiedDate}</Row>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="comment-content">
                    <Col>
                        {props.content}
                    </Col>
                </Row>
            </div>
        </div>);
}

export default Comment;