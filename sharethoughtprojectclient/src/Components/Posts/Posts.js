import { Component } from "react";
import { Route, Routes } from 'react-router-dom';
import { ButtonGroup, Button, Container } from "react-bootstrap";
import NewPostsWrapper from "./PostsWrappers/NewPostsWrapper";

function CheckForCurrentPath(path){
    if (path === "new") {
        if (window.location.pathname.toLocaleLowerCase().includes(path) || window.location.pathname === "/posts"){ //either "/creators/new" or "/creators"
            return 'creators-current';
        }
        else {
            return '';
        }
    }
    else {
        return window.location.pathname.toLocaleLowerCase().includes(path) ? 'creators-current ' : '';
    }
}

class Posts extends Component {
    constructor(props) {
        super(props);
        console.log(window.location.pathname)
    }

    render() {
        return (<div>
            <Container>
                <div className="feed-button-group">
                    <ButtonGroup aria-label="Basic example">
                        <Button className={CheckForCurrentPath("new")} variant="outline-success feed" href="/posts/new">New</Button>
                        <Button className={CheckForCurrentPath("top")} variant="outline-success feed" href="/posts/top">Top</Button>
                        <Button className={CheckForCurrentPath("suggested")} variant="outline-success feed" href="/posts/suggested">Choosed for you</Button>
                    </ButtonGroup>
                </div>

                <Routes>
                    <Route path="popular" element={<NewPostsWrapper/>} />
                    <Route path="popular/:pagenumber" element={<NewPostsWrapper />} />
                    <Route path="top" element={<NewPostsWrapper/>} />
                    <Route path="top/:timesort" element={<NewPostsWrapper />} />
                    <Route path="top/:timesort/:pagenumber" element={<NewPostsWrapper />} />
                    <Route path="new/:pagenumber" element={<NewPostsWrapper />}/>
                    <Route path="new" element={<NewPostsWrapper />}/>
                    <Route path="suggested" element={<NewPostsWrapper />} />
                    <Route path="suggested/:pagenumber" element={<NewPostsWrapper />} />
                    <Route exact path="/" element={<NewPostsWrapper />} />
                </Routes>
            </Container>
        </div>);
    }
}


export default Posts;