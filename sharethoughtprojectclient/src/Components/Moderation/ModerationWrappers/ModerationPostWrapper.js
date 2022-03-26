import { Component } from "react";
import { Button, Container } from "react-bootstrap";
import HorizontalPostList from "../../Home/PostsContainers/HorizontalPostList";
import ModerationPostIssue from "./ModerationPostIssue";

class ModerationPostWrapper extends Component {
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
                    <ModerationPostIssue
                        showInfo={true}
                        authorPic={"https://prsmeble.pl/wp-content/uploads/2013/10/300x201xperson.jpg.pagespeed.ic.jkTJYjUU9H.webp"}
                        postPic={"https://i0.wp.com/konsolowe.info/wp-content/uploads/2021/08/lir-usp-in-engine-screen-twotown-royam-no-logo.jpg.adapt_.crop16x9.1455w-1.jpg?fit=1455%2C818&ssl=1"}
                        authorName={"Dżeremaja Kutahaja"}
                        reason={"Dumb name lol"}
                        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vestibulum libero vitae venenatis scelerisque. Proin mattis in leo eu tempus. Morbi nec pulvinar eros, at vulputate quam. Fusce a vestibulum ex, id aliquam leo."
                    ></ModerationPostIssue>
                </div>);
        }
        else {
            return (
                <div>
                    <ModerationPostIssue></ModerationPostIssue>
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

export default ModerationPostWrapper;