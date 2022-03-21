import { Component } from "react";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import { Route, Routes } from 'react-router-dom';
import Home from "../Home/Home";
import './Moderation.css';
import ModerationCommentsWrapper from "./ModerationWrappers/ModerationCommentsWrapper";
import ModerationPostWrapper from "./ModerationWrappers/ModerationPostWrapper";


function CheckForCurrentPath(path) {
    if (path === "posts") {
        if (window.location.pathname.toLocaleLowerCase().includes(path) || window.location.pathname === "/moderation"){ //either "/creators/new" or "/creators"
            return 'active';
        }
        else {
            return '';
        }
    }
    else {
        return window.location.pathname.toLocaleLowerCase().includes(path) ? 'active' : '';
    }
}


class Moderation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resolved: true
        };
    }

    changeActivity = () => {
        if (this.state.resolved){
            this.setState({resolved: false})
        }
        else {
            this.setState({resolved: true})
        }
      }




    render() {
        return (
            <Container>
                <div className="feed-button-group">
                    <ButtonGroup>
                        <Button className={CheckForCurrentPath("posts")} variant="outline-success feed" href="/moderation/posts">Posts</Button>
                        <Button className={CheckForCurrentPath("comments")} variant="outline-success feed" href="/moderation/comments">Comments</Button>
                    </ButtonGroup>
                </div>

                <Routes>
                    <Route path="posts" element={<ModerationPostWrapper />} />
                    <Route exact path="comments" element={<ModerationCommentsWrapper />} />
                    <Route exact path="/" element={<ModerationPostWrapper />} />
                </Routes>
            </Container>
        );
    }
}

export default Moderation;