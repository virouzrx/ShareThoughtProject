import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Button, ButtonGroup, Form, Container } from "react-bootstrap";
import { ArrowLeftCircleFill, ArrowRightCircleFill } from "react-bootstrap-icons";
import '../SinglePostPage/Comments/Comment.css';
import Comment from '../SinglePostPage/Comments/Comment';
import jwt_decode from "jwt-decode";
import PostHorizontal from "../Home/PostsContainers/SinglePostComponent/PostHorizontal";

function Posts(props) {
    const [posts, setPosts] = useState([{}]);
    const [isLoading, setLoading] = useState(true);
    const [content, setContent] = useState("");
    const [index, setIndex] = useState(1);
    const [count, setCount] = useState(1);

    useEffect(() => {
        getSearchResult();
    }, [index]);

    useEffect(() => {
        getSearchResult();
    }, [count]);

    const getSearchResult = () => {
        setLoading(true);
        axios
            .get(`https://localhost:5001/api/v1/posts/new/${10}/${count}`)
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
                console.log(posts);
            })
            .catch((error) => {
                setLoading(false);
                setPosts(null);
                document.getElementById("errorMessage").innerHTML = "No more posts found!"
                console.log(error);
            });
    };

    const ExtractHashtagsFromObject = (object) => {
        let list = [];
        object.map(ht => {
            list.push(ht);
        })
        return list;
    }



    const GenerateComments = () => {
        if (posts !== null) {
            return (posts.map((horizontalPost) => (
                <div key={horizontalPost.id}>
                    <PostHorizontal
                        id={horizontalPost.id}
                        title={horizontalPost.title}
                        desc={horizontalPost.description}
                        upvoteCount={horizontalPost.score}
                        commentCount={ExtractHashtagsFromObject(horizontalPost.comments)}
                        authorName={horizontalPost.authorName}
                        dateCreated={horizontalPost.created}
                        imagePath={horizontalPost.imagePath}
                        authorPic={horizontalPost.authorProfilePic}
                        comments={horizontalPost.comments}
                        created={horizontalPost.created}
                        hashtags={ExtractHashtagsFromObject(horizontalPost.hashtags)}
                        showInfo={true}
                    />
                </div>
            )))
        }
        else {
            return <p></p>
        }
    }

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

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        var body = {
            content: content,
            userId: decoded.id
        };
        axios
            .post(`https://localhost:5001/api/v1/comments/${props.postId}`, body)
            .then((response) => {
                console.log(posts);
                setIndex(index + 1)
            })
            .catch((error) => {
                setLoading(false);
                document.getElementById('commentErrorMessage').innerHTML = error.response.data;
                setTimeout(() => {
                    setInterval(document.getElementById('commentErrorMessage').innerHTML = "", 5000)
                }, 3000);
                console.log(error);
            });
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    else {
        return (
            <Container>
                <Col>
                    <div id="commentErrorMessage" style={{ color: 'red' }}></div>
                    {GenerateComments()}
                    <div className="search-pagination">
                        <p id="errorMessage" style={{ marginBottom: '1em' }}></p>
                        <ButtonGroup style={{ marginBottom: '1em' }}>
                            <Button variant="outline-success" onClick={() => decrement()}><ArrowLeftCircleFill /></Button>
                            <div className="color-info-container search-page-number" >{count}</div>
                            <Button variant="outline-success" onClick={() => increment()}><ArrowRightCircleFill /></Button>
                        </ButtonGroup>
                    </div>
                </Col>
            </Container>
        );
    }
}
export default Posts;
