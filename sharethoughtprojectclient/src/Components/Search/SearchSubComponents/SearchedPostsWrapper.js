import { Component, useEffect, useState } from "react";
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import SearchResultUser from "./SearchResultUser";
import '../Search.css';
import { ArrowLeftCircleFill, ArrowRightCircleFill } from "react-bootstrap-icons";
import axios from "axios";
import PostHorizontal from "../../Home/PostsContainers/SinglePostComponent/PostHorizontal";
import SearchResultPost from "./SearchResultPost";

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
        getSearchResult();
    }, [count]);

    useEffect(() => {
        getSearchResult();
    }, [count]);

    const getSearchResult = () => {
        setLoading(true);
        axios
            .get(`https://localhost:5001/api/v1/posts/search/${GetRouteAddress()}/${10}/${count}`)
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
                document.getElementById("errorMessage").innerHTML = "";
                console.log(posts);
            })
            .catch((error) => {
                setLoading(false);
                setPosts(null);
                document.getElementById("errorMessage").innerHTML = "No posts found!"
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

    const increment = () => {
        if (posts === null) {
            return 0;
        }
        else {
            setCount(count + 1);
        }
    }

    const GenerateUsers = () => {
        if (posts !== null) {
            return (posts.map((postInfo) => (
                <Col>
                    <div key={postInfo.id}>
                        <SearchResultPost
                            id={postInfo.id}
                            title={postInfo.title}
                            desc={postInfo.description}
                            upvoteCount={postInfo.score}
                            commentCount={postInfo.comments}
                            hashtags={postInfo.hashtags}
                            authorName={postInfo.authorName}
                            created={postInfo.created}
                            imagePath={postInfo.imagePath}
                            authorPic={postInfo.authorProfilePic}
                            showInfo={true}
                        />
                    </div>
                </Col>)))
        }
        else {
            return <p></p>
        }
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    else {
        return (
            <div>
                {GenerateUsers()}
                <div className="search-pagination">
                    <p id="errorMessage" style={{ marginBottom: '1em' }}></p>
                    <ButtonGroup style={{ marginBottom: '1em' }}>
                        <Button variant="outline-success" onClick={() => decrement()}><ArrowLeftCircleFill /></Button>
                        <div className="color-info-container search-page-number" >{count}</div>
                        <Button variant="outline-success" onClick={() => increment()}><ArrowRightCircleFill /></Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default SearchedUserWrapper;
