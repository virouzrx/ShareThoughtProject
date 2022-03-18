import { Button, Card, Row, Col } from "react-bootstrap";
import { Component } from "react";
import './Creators.css';

const examples = [
    {
        authorPicPath: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
        authorName: "Viktor Raan",
        postCount: 20,
        postScore: 5012,
        joined: "21.02.2021",
        description: "Just an ordinary guy, who likes tech news as much, or even more, as you. Big Android fan and Nintendo enthusiast.",
        mainHashtags: ["Android", "Microsoft", "IOT"]
    }];

const CreateGrid = () => {
    let columns = [];
    let rows = [];
    for (let index = 0; index < 5; index++) {
        for (let index = 0; index < 2; index++) {
            columns.push(
                <Col xs lg="5">
                    <Card className="author-regular-card">
                        <Card.Img variant="top" src={examples[0].authorPicPath} />
                        <Card.Body>
                            <Card.Title>{examples[0].authorName}</Card.Title>
                            <Card.Text>
                                {examples[0].description}
                            </Card.Text>
                            <Button variant="primary">Lorem Ipsum Motherfucker</Button>
                        </Card.Body>
                    </Card>
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
                {CreateGrid()}
            </div >);
    }
}

export default NewCreatorsWrapper;