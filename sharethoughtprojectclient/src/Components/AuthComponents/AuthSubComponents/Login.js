import React from "react";
import { Button, Form } from "react-bootstrap";
import '../Auth.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { createBrowserHistory } from "history";

function SendRegisterRequest(email, username, password) {
  const history = createBrowserHistory({ forceRefresh: true });
  var body = {
    Credential: username,
    Password: password
  };

  axios.post('https://localhost:5001/api/v1/identity/login', body)
    .then(function (response) {
      localStorage.setItem("token", response.data.token)
      history.push('/');
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
      username: '',
      password: ''
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("errorMessage").innerHTML = "";

    SendRegisterRequest(this.state.email, this.state.username, this.state.password);


  }

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Username or email</Form.Label>
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
          <p id="errorMessage"></p>
          <Button size="lg" type="submit" style={{backgroundColor: '#198754', border: '0'}}>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register