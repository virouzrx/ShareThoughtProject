import { Component } from "react";
import { Container, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import './Search.css';
import { Routes, Route } from "react-router-dom";
import SearchedPostsWrapper from "./SearchSubComponents/SearchedPostsWrapper";
import SearchedUserWrapper from "./SearchSubComponents/SearchedUserWrapper";
import Home from "../Home/Home";

function GetRouteAddress() {
    var parts = window.location.pathname.split('/');
    if (parts.length === 3){ 
        var answer = parts[parts.length - 1];
        return answer;
    }
    else {
        var answer = parts[2];
        return answer;
    }

}

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedPhrase: window.location.pathname.split('/').pop(),
            pageNumber: 1
        };
        this.increment = this.increment.bind(this);
    }


    increment = () => {
        this.setState({ pageNumber: this.state.pageNumber + 1 })
    }

    render() {

        return (
            <Container>
                <p style={{ fontSize: 'xx-large' }}>Searched phrase: {GetRouteAddress()}</p>
                <ButtonGroup>
                    <Button className={("posts")} variant="outline-success feed" href={`/search/${GetRouteAddress()}/posts`}>Posts</Button>
                    <Button className={("comments")} variant="outline-success feed" href={`/search/${GetRouteAddress()}/users`}>Users</Button>
                </ButtonGroup>
                {console.log(this.state.searchedPhrase)}
                <Routes>
                    <Route path="posts/*" element={<SearchedPostsWrapper />} />
                    <Route path="users/*" element={<SearchedUserWrapper />} />
                    <Route path="/" element={<SearchedUserWrapper />} />
                </Routes>
            </Container>
        );
    }
}

export default Search;