import { Component } from "react";
import { Container, Form, Button, ButtonGroup } from "react-bootstrap";
import './Auth.css';
import { Route, Routes } from 'react-router-dom';
import Login from "./AuthSubComponents/Login";
import Register from "./AuthSubComponents/Register";

function CheckForCurrentPath(path) {
    if (path === "login") {
        if (window.location.pathname.toLocaleLowerCase().includes(path) || window.location.pathname === "/auth") { //either "/creators/new" or "/creators"
            return 'creators-current';
        }
        else {
            return '';
        }
    }
    else {
        return window.location.pathname.toLocaleLowerCase().includes(path) ? 'creators-current ' : '';
    }
}


class Auth extends Component {
    render() {
        return (
            <div>
                <div className="feed-button-group">
                    <ButtonGroup aria-label="Basic example">
                        <Button className={CheckForCurrentPath("login")} variant="outline-success feed" href="/auth/login">Login</Button>
                        <Button className={CheckForCurrentPath("register")} variant="outline-success feed" href="/auth/register">Register</Button>
                    </ButtonGroup>
                </div>
                    <Routes>
                        <Route path="login" element={<Login/>} />
                        <Route path="register" element={<Register />} />
                        <Route path="/" element={<Login />} />
                    </Routes>
            </div>);
    }
}

export default Auth;