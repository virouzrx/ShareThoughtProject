import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import './Comment.css';

const Comment = (props) => {
    return (
        <div className="comment-wrapper">
            <Row>
                <Col className="comment-avatar-col"><img className="commentor-pic" src="https://transportationenergypartners.org/wp-content/uploads/2020/08/random-person-3.jpg" /></Col>
                <Col>
                    <Row>
                        <Col>
                            <Col>
                                <Row className="commentor-name" xs={6}>MagicChris_87</Row>
                                <Row className="comment-date">20.04.2021</Row>
                            </Col>
                        </Col>
                        <Col style={{ paddingLeft: '1em', textAlign: 'right' }} xs={6}>
                            <Button variant="outline-warning">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z" />
                                </svg>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="comment-content">
                <Col>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta ante velit, non ullamcorper turpis tincidunt at. Praesent varius venenatis vulputate. Fusce egestas ornare urna ut tempor. Mauris suscipit ornare nulla sed viverra. Nunc nec purus porta, elementum mauris eu, malesuada ante.
                </Col>
            </Row>
            <Row>
                <Col>
                    <ButtonGroup aria-label="Basic example" className="comment-votes">
                        <Button variant="outline-success" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                            </svg><span className="votes-count">1</span>
                        </Button>
                        <Button variant="outline-danger" style={{ margin: '0', borderRadius: '0' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                            </svg><span className="votes-count">1</span>
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </div>);
}

export default Comment;