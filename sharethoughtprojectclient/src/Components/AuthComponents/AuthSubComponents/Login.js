import { Component } from "react";
import { Form, Button } from "react-bootstrap";
import '../Auth.css';
import React, { useState } from "react";
import axios from 'axios';

function LoginToApi(credential, password){
  var body = {
      credential: credential,
      password: password
  };
  
  axios.post('https://localhost:5001/api/v1/identity/login', body)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    function handleSubmit(event) {
      LoginToApi();
    }

  
    return (
      <div className="Login">
        <Form onSubmit={LoginToApi(email, password)}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()} > 
            Login
          </Button>
        </Form>
      </div>
    );
  }
  