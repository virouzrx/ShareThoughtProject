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
        <div className="user-searchresult" style={{ textDecoration: 'none' }}>
                <Row>
                    <Col className="searchresult-user-avatar-col"><img className="commentor-pic" src={`data:image/jpeg;base64,${props.postPic}`} /></Col>
                    <Col>
                        <Row className="search-result-username" xs={6}>{props.authorName}</Row>
                    </Col>
                    <Col>
                        {props.desc}
                    </Col>
                    <Col style={{textAlign: 'right'}}>
                        <Button variant="warning" style={{marginTop: '0.5em', marginRight: '0.5em'}} onClick={handleShow}>Resolve</Button>
                    </Col>
                </Row >
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