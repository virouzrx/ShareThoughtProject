import React from "react";
import { Button, Form } from "react-bootstrap";
import '../Auth.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { createBrowserHistory } from "history";

function SendRegisterRequest(email, username, password) {
    const history = createBrowserHistory({forceRefresh:true});
    var body = {
        email: email,
        username: username,
        password: password
    };

    axios.post('https://localhost:5001/api/v1/identity/register', body)
        .then(function (response) {
            history.push('/confirm');
            document.location.reload()
        })
        .catch(function (error) {
            document.getElementById("errorMessage").innerHTML = error.response.data.errors[0];
        });
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            cpassword: '',
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleCpasswordChange = this.handleCpasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleCpasswordChange = (event) => {
        this.setState({ cpassword: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        document.getElementById("errorMessage").innerHTML = "";
        if (this.state.password != this.state.cpassword) {
            document.getElementById("errorMessage").innerHTML = "Passwords don't match!";
        }
        else {
            SendRegisterRequest(this.state.email, this.state.username, this.state.password);
        }

    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.cpassword}
                            onChange={this.handleCpasswordChange}
                        />
                    </Form.Group>
                    <p id="errorMessage"></p>
                    <Button size="lg" type="submit" style={{backgroundColor: '#198754', border: '0'}}>
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Register