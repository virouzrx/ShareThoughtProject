import { Component } from "react";
import { Container, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import './Search.css';
import { Routes, Route} from "react-router-dom";
import SearchedPostsWrapper from "./SearchSubComponents/SearchedPostsWrapper";
import SearchedUserWrapper from "./SearchSubComponents/SearchedPostsWrapper";
import Home from "../Home/Home";

function GetRouteAddress() {
    console.log(window.location.pathname)
    var parts = window.location.pathname.split('/');
    var answer = parts[parts.length - 1];
    return answer;
}

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedPhrase: "",
            pageNumber: 1
        };
        this.increment = this.increment.bind(this);
    }

    increment = () => {
        this.setState({pageNumber : this.state.pageNumber + 1 })
        console.log(this.setState.pageNumber);
        console.log(this.state.pageNumber + 10);
      }


    render() {
        return (
            <Container>
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
                            <SearchedPostsWrapper pageNumber={this.state.pageNumber}></SearchedPostsWrapper>
                        </Row>
                    </Col>
                </Row>
                <ButtonGroup>
                        <Button variant="outline-success feed" href={`posts/${1}`} onClick={this.increment}>Posts</Button>
                        <Button variant="outline-success feed"  onClick={this.increment}>inc</Button>
                        <Button  variant="outline-success feed" href="users">Users</Button>
                    </ButtonGroup>
                <Routes>
                    <Route path=":searchedphrase/users" element={<Home />} />
                    <Route exact path=":searchedphrase/posts" element={<Home />} />
                </Routes>
            </Container>
        );
    }
}

export default Search;