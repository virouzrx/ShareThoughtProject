import { Component, useEffect, useState } from "react";
import { Container, ButtonGroup, Button, Col } from "react-bootstrap";
import { Route, Routes } from 'react-router-dom';
import Home from "../Home/Home";
import './Moderation.css';
import ModerationPostIssue from "./ModerationWrappers/ModerationIssue";
import axios from 'axios';
import { ArrowLeftCircleFill, ArrowRightCircleFill } from "react-bootstrap-icons";


function Moderation() {
    const [resolved, setResolved] = useState(false);
    const [requests, setRequests] = useState([{}]);
    const [isLoading, setLoading] = useState(true);
    const [count, setCount] = useState(1);

    useEffect(() => {
        getSearchResult();
    }, [count]);

    useEffect(() => {
        getSearchResult();
    }, [count]);

    const getSearchResult = () => {
        setLoading(true);
        axios
            .get(`https://localhost:5001/api/v1/promotionRequests/${10}/${count}/${false}`)
            .then((response) => {
                setRequests(response.data);
                setLoading(false);
                document.getElementById("errorMessage").innerHTML = "";
            })
            .catch((error) => {
                setLoading(false);
                setRequests(null);
                document.getElementById("errorMessage").innerHTML = "No requests found!"
                console.log(error);
            });
    };

    const decrement = () => {
        if (count === 1) {
            return 0;
        }
        else {
            setCount(count - 1);
        }
    }

    const increment = () => {
        if (requests === null) {
            return 0;
        }
        else {
            setCount(count + 1);
        }
    }

    const SetButtonActive = (buttonType) => {
        if (buttonType === "unresolved") {
            return resolved ? "outline-danger" : "outline-danger active";
        }
        else {
            return resolved ? "outline-secondary active" : "outline-secondary";
        }
    }

    const GenerateRequests = () => {
        if (requests !== null) {
            return (requests.map((requestInfo) => (
                <Container>
                    <div key={requestInfo.id}>
                        <ModerationPostIssue
                            requestId={requestInfo.id}
                            showInfo={true}
                            postPic={requestInfo.userAvatar}
                            authorName={requestInfo.username}
                            desc={requestInfo.promotionRequestContent}
                        />
                    </div>
                </Container>)))
        }
        else {
            return <p></p>
        }
    }

    if (isLoading) {
        return <div className="App">
            Loading...
        </div>;
    }
    else {
        return (
            <div>

                {GenerateRequests()}
                <div className="search-pagination">
                    <p id="errorMessage" style={{ marginBottom: '1em' }}></p>
                    <ButtonGroup style={{ marginBottom: '1em' }}>
                        <Button variant="outline-success" onClick={() => decrement()}><ArrowLeftCircleFill /></Button>
                        <div className="color-info-container search-page-number" >{count}</div>
                        <Button variant="outline-success" onClick={() => increment()}><ArrowRightCircleFill /></Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default Moderation;