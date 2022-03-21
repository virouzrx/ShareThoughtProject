import { Button, Card, Row, Col, ListGroupItem, ListGroup, ButtonGroup } from "react-bootstrap";
import { Component } from "react";
import CreatorLikesCount from './CreatorLikesCount';
import './Creators.css';
import { propTypes } from "react-bootstrap/esm/Image";
import CreatorHashtagWrapper from "./CreatorHashtagWrapper";

const examples = [
    {
        authorPicPath: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        authorName: "Viktor Raan",
        postCount: 20,
        upvoteCount: 5012,
        joined: "21.02.2021",
        description: "Just an ordinary guy, who likes tech news as much, or even more, as you. Big Android fan and Nintendo enthusiast.",
        mainHashtags: ["Android", "Microsoft", "IOT", "Siema", "Byq", "Elo"]
    }];

const CreateGrid = (props) => {
    let columns = [];
    let rows = [];
    for (let index = 0; index < 5; index++) {
        for (let index = 0; index < 2; index++) {
            columns.push(
                <Col xs lg="5">
                    <a href="/user/1" class="hyperlink-card">
                        <Card className="author-regular-card" href="http://google.pl">
                            <Card.Img variant="top" src={props.authorPicPath} />
                            <Card.Body>
                                <Card.Title className="creator-name">{props.authorName}</Card.Title>
                                <Card.Title className="date-joined">Joined: {props.joined}</Card.Title>
                                <CreatorLikesCount className="creator-stats-wrapper" postCount={props.postCount} upvoteCount={props.upvoteCount}></CreatorLikesCount>
                                <Card.Title className="hashtag-title">Most used hashtags:</Card.Title>
                                <CreatorHashtagWrapper mainHashtags={props.mainHashtags}></CreatorHashtagWrapper>
                            </Card.Body>
                            <Card.Body>
                                <Card.Text>
                                    {examples[0].description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </a>
                </Col>);
        }
        rows.push(<Row className="justify-content-md-center">{columns}</Row>);
        columns = [];
    }
    return rows;
}


class NewCreatorsWrapper extends Component {
    state = {}
    render() {
        return (
            <div>
                {CreateGrid(examples[0])}
            </div >);
    }
}

export default NewCreatorsWrapper;