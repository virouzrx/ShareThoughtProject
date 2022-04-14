import axios from 'axios';
import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
class PromotionRequest extends Component {

    state = {
        content: '',
        isSent: false
    };

    config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }

    onContentChange = event => {
        this.setState({ content: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        const history = createBrowserHistory({ forceRefresh: true });
        formData.append(
            "Content",
            this.state.content
        );

        console.log(this.state.selectedFile);
        axios.post('https://localhost:5001/api/v1/posts', formData, this.config)
            .then(function (response) {
                history.push('/post/' + response.data.id);
                document.location.reload()
            })
            .catch(function (error) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                document.getElementById("errorMessage").innerHTML = error.response.data;
            });
    };

    render() {
        if (this.state.isSent) {
            return 
        }
        return (
            <Container>
                <h1 style={{ marginBottom: '0.5em', marginTop: '1em' }}>
                    Tell us why you want to become a creator.
                </h1>
                <h5>
                    What motivates you to become a contributor to our page? <br/><br/>
                    What are your passions, hobbys? Do you have any experience? <br/><br/> 
                    Your request will be reviewed by one of our awesome mods ( ͡~ ͜ʖ ͡°)
                </h5>
                <p id="errorMessage" style={{ marginBottom: '0.5em'}}></p>
                <div>
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control as="textarea" rows={8} resize="none" style={{ resize: 'none' }} onChange={this.onContentChange} />
                        </Form.Group>

                        <Button variant="outline-success" type="submit" style={{ marginBottom: '3em'}}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </Container>
        );
    }
}

export default PromotionRequest; 