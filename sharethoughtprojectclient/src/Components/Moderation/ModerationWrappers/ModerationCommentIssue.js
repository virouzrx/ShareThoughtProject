import { Button, Col, Row, ButtonGroup, Modal } from "react-bootstrap";
import '../Moderation.css';
import React, { useEffect, useState } from "react";
const ModerationCommentIssue = (props) => {
    const [show, setShow] = useState(false);
    const [rerender, reRender] = useState(0);
    const rerenderStuff = () => reRender(rerender + 1);
    const handleClose = () => {
        setShow(false);
        reRender(rerender + 1);
    }
    const handleShow = () => {
        setShow(true);
        reRender(rerender + 1);
    }
    return (
        <div style={{ width: '65%', marginLeft: 'auto', marginRight: 'auto', border: '1px solid #ced4da', padding: '1em' }}>
            <Row className="user-comments-wrapper"><a className="postLink" href="/">Very fascinating post</a></Row>
            <Row>
                <Col className="comment-avatar-col"><img className="commentor-pic" src="https://transportationenergypartners.org/wp-content/uploads/2020/08/random-person-3.jpg" /></Col>
                <Col>
                    <Row className="commentor-name" xs={6}>MagicChris_87</Row>
                    <Row className="comment-date">22.04.2021</Row>
                </Col>
            </Row>
            <Row className="comment-content">
                <Col>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta ante velit, non ullamcorper turpis tincidunt at. Praesent varius venenatis vulputate. Fusce egestas ornare urna ut tempor. Mauris suscipit ornare nulla sed viverra. Nunc nec purus porta, elementum mauris eu, malesuada ante.
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>Reported: 23.02.2021</div>
                    <div>Reported for: {props.reason}</div>
                    <div>Status: {rerender}</div>
                </Col>
                <Col>
                    <Button variant="warning" className="resolve-button" onClick={handleShow}>Resolve</Button>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button variant="outline-success" onClick={handleClose}>
                            Mark as safe
                        </Button>
                        <Button variant="outline-danger" onClick={handleClose} style={{ marginLeft: '0px', borderRadius: '0' }}>
                            Remove
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        </div>);
}

export default ModerationCommentIssue;