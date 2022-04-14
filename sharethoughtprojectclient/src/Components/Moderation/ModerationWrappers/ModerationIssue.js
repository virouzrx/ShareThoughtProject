import { Button, Card, Col, Row, Modal, ButtonGroup } from "react-bootstrap";
import AuthorInfoAndCreateDate from "../../Home/PostsContainers/SinglePostComponent/AuthorInfoAndCreationDate";
import '../Moderation.css';
import React, { useEffect, useState } from "react";
import axios from 'axios';

const ModerationPostIssue = (props) => {
    const [show, setShow] = useState(false);
    const [count, setCount] = useState(0);

    const handleClose = () => {
        var body = {
            RequestId: props.requestId,
            Resolution: false
        };
        if (count !== 0) {
            axios.post('https://localhost:5001/api/v1/resolvePromotionRequest', body)
                .then(function (response) {
                    document.location.reload()
                })
                .catch(function (error) {

                });
            setShow(false);
        }
    }


    const handleShow = () => {
        setCount(1);
        setShow(true);
    }
    var date = new Date(props.created)
    var stringifiedDate = date.toLocaleDateString("es-PE");

    return (
        <div className="new-post">
            <Row>
                <Col md={4}>
                    <a className="hyperlink-card" href="/post/1">
                        <Card.Img variant="top" src={'data:image/jpeg;base64,' + props.postPic} />
                    </a>
                </Col>
                <Col>
                    <Row>
                        <Card.Title className="custom-card-title">{props.title}</Card.Title>
                        <Card.Text>{props.desc}</Card.Text>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="warning" className="resolve-button" onClick={handleShow}>Resolve</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to promote user?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button variant="outline-success" onClick={handleClose}>
                            Yes
                        </Button>
                        <Button variant="outline-danger" onClick={handleClose} style={{ marginLeft: '0px', borderRadius: '0' }}>
                            No
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModerationPostIssue;