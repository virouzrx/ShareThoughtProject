import React from "react";
import { Button, Form } from "react-bootstrap";
import '../Auth.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = (event) => {
        alert('Login: ' + this.state.value + '\r\nPassword: ' + this.state.password);
    }

    render() {
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={this.state.value}
                            onChange={this.handleEmailChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.value}
                            onChange={this.handleEmailChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="email"
                            value={this.state.value}
                            onChange={this.handleEmailChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" >
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Register