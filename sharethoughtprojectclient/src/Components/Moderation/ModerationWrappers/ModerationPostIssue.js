import { Button, Card, Col, Row, Modal, ButtonGroup } from "react-bootstrap";
import AuthorInfoAndCreateDate from "../../Home/PostsContainers/SinglePostComponent/AuthorInfoAndCreationDate";
import '../Moderation.css';
import React, { useEffect, useState } from "react";

const ModerationPostIssue = (props) => {
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
        <div className="new-post">
            <Row>
                <Col md={4}>
                    <a className="hyperlink-card" href="/post/1">
                        <Card.Img variant="top" src={props.postPic} />
                    </a>
                </Col>
                <Col>
                    <Row>
                        <Card.Title className="custom-card-title">{props.title}</Card.Title>
                        <AuthorInfoAndCreateDate showInfo={props.showInfo} authorName={props.authorName} authorPic={props.authorPic}></AuthorInfoAndCreateDate>
                        <Card.Text>{props.desc}</Card.Text>
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
        </div>
    );
}

export default ModerationPostIssue;