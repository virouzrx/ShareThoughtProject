import { Button, Navbar, Nav, Form, Container, FormControl, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomNavbar.css'
import { Component } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';

class CustomNavbar extends Component {
    state = {
        val: "",
        userinfo: {}
    };

    onSubmit = () => {
        console.log(this.state.val);
    };

    componentWillMount() {
        axios.get('https://localhost:5001/api/v1/user/9ecac069-8cfc-4cac-8056-87093fb9c57c')
            .then(res => {
                const userinfo = res.data;
                this.setState({ userinfo });
                console.log(this.state.userinfo);
            })
    }






    render() {
        return (
                <div>dupa</div>
            );
    }
}

export default CustomNavbar;
