import axios from 'axios';
import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import './CreatePost.css';
class App extends Component {

    state = {
        selectedFile: null,
        title: '',
        description: '',
        hashtags: [],
        content: ''
    };

    config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onDescriptionChange = event => {
        this.setState({ description: event.target.value });
    };

    onTitleChange = event => {
        this.setState({ title: event.target.value });
    };

    onHashtagsChange = event => {
        this.setState({ hashtags: event.target.value.split(',') });
    };

    onContentChange = event => {
        this.setState({ content: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        const history = createBrowserHistory({ forceRefresh: true });
        formData.append(
            "Image",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        formData.append(
            "Description",
            this.state.description
        );
        formData.append(
            "Title",
            this.state.title
        );
        formData.append(
            "Content",
            this.state.content
        );
        formData.append(
            "Hashtags",
            this.state.hashtags
        )

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
        return (
            <Container>
                <h1 style={{ marginBottom: '0.5em', marginTop: '1em' }}>
                    Create your post
                </h1>
                <p id="errorMessage" style={{ marginBottom: '0.5em'}}></p>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label-header">Title</Form.Label>
                            <Form.Control type="text" placeholder="Title of your cool post" autoComplete="off" onChange={this.onTitleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label-header">Hashtags</Form.Label>
                            <Form.Control type="text" placeholder="React, IT, webdev" autoComplete="off" onChange={this.onHashtagsChange} />
                            <Form.Text className="text-muted">
                                Write up to 3 hashtags, separated by coma.
                            </Form.Text>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="label-header">Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description..."
                                autoComplete="off"
                                onChange={this.onDescriptionChange} />
                            <Form.Text className="text-muted">
                                Set description.
                            </Form.Text>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="label-header">Content</Form.Label>
                            <Form.Control as="textarea" rows={30} resize="none" style={{ resize: 'none' }} onChange={this.onContentChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="label-header">Post image</Form.Label>
                            <Form.Control type="file" onChange={this.onFileChange} />
                        </Form.Group>

                        <Button variant="outline-success" type="submit" style={{ marginBottom: '3em', marginTop: '0.75em' }}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </Container>
        );
    }
}

export default App; 