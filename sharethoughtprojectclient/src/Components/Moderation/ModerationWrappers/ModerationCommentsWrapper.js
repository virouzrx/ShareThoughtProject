import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import HorizontalPostList from "../../Home/PostsContainers/HorizontalPostList";
import ModerationCommentIssue from "./ModerationCommentIssue";

class ModerationCommentsWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resolved: false
        };
    }

    SetButtonActive(buttonType) {
        if (buttonType === "unresolved") {
            return this.state.resolved ? "outline-danger" : "outline-danger active";
        }
        else {
            return this.state.resolved ? "outline-secondary active" : "outline-secondary";
        }
    }

    changeActivity = () => {
        if (this.state.resolved) {
            this.setState({ resolved: false })
        }
        else {
            this.setState({ resolved: true })
        }
    }

    renderContentForReview = () => {
        if (this.state.resolved) {
            return (
                <div>
                    <ModerationCommentIssue>
                        
                    </ModerationCommentIssue>
                </div>);
        }
        else {
            return (
                <div>
  
                </div>);
        }
    }



    render() {
        return (
            <Container>
                <Button
                    className="moderation-buttons"
                    variant={this.SetButtonActive("unresolved")}
                    onClick={this.changeActivity}>
                    Unresolved
                </Button>
                <Button
                    className="moderation-buttons"
                    style={{ marginLeft: '-1px' }}
                    variant={this.SetButtonActive("resolved")}
                    onClick={this.changeActivity} >
                    Resolved
                </Button>
                {this.renderContentForReview()}
            </Container>
        );
    }
}

export default ModerationCommentsWrapper;