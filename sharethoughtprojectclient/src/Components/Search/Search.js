import { Container, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import './Search.css';
import { Routes, Route} from "react-router-dom";
import SearchedPostsWrapper from "./SearchSubComponents/SearchedPostsWrapper";
import SearchedUserWrapper from "./SearchSubComponents/SearchedUserWrapper";

function GetRouteAddress() {
    console.log(window.location.pathname)
    var parts = window.location.pathname.split('/');
    return parts.length >= 4 ? parts[parts.length - 2] : parts[parts.length - 1];
}

function CheckForCurrentPath(path) {
    var parts = window.location.pathname.split('/');
    if (parts.length === 3 && path === "posts"){
        return 'active';
    }
    else {
        return window.location.pathname.toLocaleLowerCase().includes(path) ? 'active' : '';
    }
}

const Search = () => {
    return (<Container>
        <p style={{ fontSize: 'xx-large' }}>Searched phrase: {GetRouteAddress()}</p>
        <div className="feed-button-group">
                    <ButtonGroup aria-label="Basic example">
                        <Button className={CheckForCurrentPath("posts")} variant="outline-success feed" href={`/search/${GetRouteAddress()}/posts`}>Posts</Button>
                        <Button className={CheckForCurrentPath("users")} variant="outline-success feed" href={`/search/${GetRouteAddress()}/users`}>Users</Button>
                    </ButtonGroup>
                </div>
        <Routes>
            <Route exact path="users" element={<SearchedUserWrapper />} />
            <Route exact path="posts" element={<SearchedPostsWrapper />} />
            <Route path="/" element={<SearchedPostsWrapper />} />
        </Routes>
    </Container>);
}

export default Search;