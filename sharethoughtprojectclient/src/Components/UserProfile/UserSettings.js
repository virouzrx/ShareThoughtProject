import { Component } from "react";
import axios from 'axios';
import { Button, Container, Form } from "react-bootstrap";
import jwt_decode from "jwt-decode";
const api = axios.create({
    baseURL: `https://localhost:5001/api/v1/`
})

function GetRouteAddress() {
    var parts = window.location.pathname.split('/');
    return parts[2];
}


class UserSettings extends Component {
    state = {
        selectedFile: null,
        description: '',
        token: localStorage.getItem("token"),
        disableDescription: false,
        disablePhoto: false
    }
    constructor(props) {
        super(props);

        api.get(`users/${GetRouteAddress()}`)
            .then(res => {
                console.log(res.data)
                this.setState({ user: res.data })
                this.setState({ loading: false })
            })
            .catch(error => {
                console.log(error)
                this.setState({ notFound: true })
                this.setState({ loading: false })
            })
    }

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

    handlePhotoSubmit = (event) => {
        event.preventDefault();
        const decoded = jwt_decode(this.state.token);
        const formData = new FormData();
        formData.append(
            "UserId",
            decoded.id
        );
        formData.append(
            "Avatar",
            this.state.selectedFile
        );

        console.log(this.state.selectedFile);
        axios.post('https://localhost:5001/api/v1/users/setuserphoto', formData, this.config)
            .then(function (response) {
                document.getElementById("message2").innerHTML = "Your avatar has been changed successfuly.";
                setTimeout(() => {
                    setInterval(document.getElementById('message2').innerHTML = "", 10000)
                }, 3000);
            })
            .catch(function (error) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
    };

    disableForm = () => {
        this.setState({ disableDescription: true });
    }

    handleDescriptionSubmit = (event) => {
        event.preventDefault();
        const decoded = jwt_decode(this.state.token);
        const formData = new FormData();
        formData.append(
            "UserId",
            decoded.id
        );
        formData.append(
            "Description",
            this.state.description
        );

        console.log(this.state.selectedFile);
        axios.post('https://localhost:5001/api/v1/users/setuserdescription', formData, this.config)
            .then(function (response) {
                document.getElementById("message").innerHTML = "Your profile description has been changed successfuly.";
                setTimeout(() => {
                    setInterval(document.getElementById('message').innerHTML = "", 10000)
                }, 3000);
            })
            .catch(function (error) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
    };

    render() {
        return (
            <Container>
                <h2 style={{ marginTop: '1em' }}>Change your profile settings</h2>
                <br></br>
                <Form onSubmit={this.handleDescriptionSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="label-header">Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Description..."
                            autoComplete="off"
                            onChange={this.onDescriptionChange}
                            disabled={this.state.disableDescription} />
                    </Form.Group>
                    <Button variant="outline-success" type="submit">Set description</Button>
                    <span id="message" style={{ marginLeft: '1em' }}></span>
                </Form>
                <br></br>
                <br></br>
                <br></br>
                <Form onSubmit={this.handlePhotoSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicPassword" >
                        <Form.Label className="label-header">Avatar</Form.Label>
                        <Form.Control type="file" onChange={this.onFileChange} />
                    </Form.Group>
                    <Button variant="outline-success" type="submit">Set photo</Button>
                    <span id="message2" style={{ marginLeft: '1em' }}></span>
                </Form>
            </Container>
        );
    }
}

export default UserSettings;