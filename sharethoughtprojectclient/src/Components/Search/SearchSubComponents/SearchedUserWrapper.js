import { Component, useEffect, useState } from "react";
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import SearchResultUser from "./SearchResultUser";
import '../Search.css';
import { ArrowLeftCircleFill, ArrowRightCircleFill } from "react-bootstrap-icons";
import axios from "axios";

function GetRouteAddress() {
    console.log(window.location.pathname)
    var parts = window.location.pathname.split('/');
    return parts.length >= 4 ? parts[parts.length - 2] : parts[parts.length - 1];
}

function SearchedUserWrapper() {
    const [count, setCount] = useState(1);
    const [posts, setPosts] = useState([{}]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        document.title = `Kliknięto ${count} razy`;
        getSearchResult();
    });

    useEffect(() => {
        getSearchResult();
    }, []);

    const getSearchResult = () => {
        axios
        .get(`https://localhost:5001/api/v1/users/search/${GetRouteAddress()}/${10}/${count}`)
        .then((response) => {
            setPosts(response.data);
            setLoading(false);
            console.log(posts);
        })
        .catch((error) => {
            setLoading(false);
            document.getElementById("errorMessage").innerHTML = "No users found!"
            console.log(error);
        });
    };

    const decrement = () => {
        if (count === 1) {
            return 0;
        }
        else {
            setCount(count - 1);
        }
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    else {
        return (
            <div>
                <p>Kliknięto {count} razy</p>
                <div className="search-pagination">
                    <p id="errorMessage"></p>
                    <ButtonGroup style={{ marginBottom: '1em' }}>
                        <Button variant="outline-success" onClick={() => decrement()}><ArrowLeftCircleFill /></Button>
                        <div className="color-info-container search-page-number" >{count}</div>
                        <Button variant="outline-success" onClick={() => setCount(count + 1)}><ArrowRightCircleFill /></Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default SearchedUserWrapper;
