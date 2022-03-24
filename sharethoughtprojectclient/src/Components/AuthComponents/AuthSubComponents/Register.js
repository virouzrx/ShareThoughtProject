import { Component } from "react";
import { Form, Button } from "react-bootstrap";
import '../Auth.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }


    setEmail = () => {
        this.setState({ email: this.state.email })
    }
    render() {
        return (
            <div className="Login">
                <Form>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={this.state.value} onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="email"
                            value={this.state.value} onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value=''
                        />
                    </Form.Group>
                    <Button size="lg" type="submit" variant="outline-success login-button">
                        Register
                    </Button>
                </Form>
            </div>);
    }
}

export default Register;