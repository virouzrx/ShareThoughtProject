import axios from 'axios';
import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
class PromotionRequest extends Component {
    constructor() {
        super();
        this.state = {
            content: '',
            decodedToken: jwt_decode(localStorage.getItem("token"))
        };
    }

    config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }

    componentWillMount = () => {
        axios.get(`https://localhost:5001/api/v1/requestPromotion/${this.state.decodedToken.id}`)
            .then(function (response) {
                this.setState({ isSent: true })
            })
            .catch(function (error) {
                this.setState({ isSent: false })
            });
    }

    onContentChange = event => {
        this.setState({ content: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append(
            "Content",
            this.state.content
        );

        formData.append(
            "UserId",
            this.state.decodedToken.id
        );

        console.log(this.state.selectedFile);
        axios.post('https://localhost:5001/api/v1/requestPromotion', formData, this.config)
            .then(function (response) {
                const history = createBrowserHistory({ forceRefresh: true });
                document.getElementById('RequestErrorMessage').innerHTML = "Your request have been sent!";
                history.push('/');
                setTimeout(() => {
                    setInterval(document.location.reload(), 5000)
                }, 3000);
            })
            .catch(function (error) {
                document.getElementById("RequestErrorMessage").innerHTML = error.response.data;
                setTimeout(() => {
                    setInterval(document.getElementById('RequestErrorMessage').innerHTML = "", 5000)
                }, 3000);
            });
    };

    GenerateContent() {
            return (
                <Container>
                    <h1 style={{ marginBottom: '0.5em', marginTop: '1em' }}>
                        Tell us why you want to become a creator.
                    </h1>
                    <h5>
                        What motivates you to become a contributor to our page? <br /><br />
                        What are your passions, hobbys? Do you have any experience? <br /><br />
                        Your request will be reviewed by one of our awesome mods ( ͡~ ͜ʖ ͡°)
                    </h5>
                    <p id="errorMessage" style={{ marginBottom: '0.5em' }}></p>
                    <div>
                        <br></br>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control as="textarea" rows={8} resize="none" style={{ resize: 'none' }} onChange={this.onContentChange} />
                            </Form.Group>

                            <Button variant="outline-success" type="submit">
                                Submit
                            </Button>
                            <span id="RequestErrorMessage" style={{ marginLeft: '1.5em' }}></span>
                        </Form>
                    </div>
                </Container>
            );
    }

    render() {
        return this.GenerateContent();
    }
}

export default PromotionRequest; 