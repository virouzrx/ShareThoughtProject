import { Component } from "react";
import { Container, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import './Search.css';
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import SearchedPostsWrapper from "./SearchSubComponents/SearchedPostsWrapper";
import SearchedUserWrapper from "./SearchSubComponents/SearchedPostsWrapper";

function GetRouteAddress() {
    console.log(window.location.pathname)
    var parts = window.location.pathname.split('/');
    var answer = parts[parts.length - 1];
    return answer;
}

const Search = () => {

    let history = useNavigate();
    function increment() {
        this.setState({ pageNumber: this.state.pageNumber + 1 })
        console.log(this.setState.pageNumber);
        console.log(this.state.pageNumber + 10);
    }

    function handleClick(param) {
        var parts = window.location.pathname.split('/');
        if (parts.length >= 4) {
            parts[parts.length] = param;
            history(parts.join("/"));
        }
        else {
            history(param);
        }
    }

    return (<Container>
        <p style={{ fontSize: 'xx-large' }}>Searched phrase: {GetRouteAddress()}</p>
        <Row>
            <Col className="right-column">
                <p className="search-headers">Users</p>
                <Row>
                    <SearchedUserWrapper></SearchedUserWrapper>
                </Row>
            </Col>
            <Col>
                <p className="search-headers">Posts</p>
                <Row>
                    <SearchedPostsWrapper pageNumber={1}></SearchedPostsWrapper>
                </Row>
            </Col>
        </Row>
        <ButtonGroup>
            <Button variant="outline-success feed" href={window.location.pathname + "/users"}>Posts</Button>
            <Button variant="outline-success feed" >inc</Button>
            <Button variant="outline-success feed" onClick={() => handleClick(window.location.pathname + "/users")}>Users</Button>
        </ButtonGroup>
        <Routes>
            <Route path=":searchedphrase/users" element={<SearchedUserWrapper />} />
            <Route exact path=":searchedphrase/posts" element={<SearchedPostsWrapper />} />
        </Routes>
    </Container>);
}

export default Search;