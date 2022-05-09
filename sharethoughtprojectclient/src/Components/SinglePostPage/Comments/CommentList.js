import axios from "axios";
import { useEffect, useState } from "react";
import { Row, Col, Button, ButtonGroup, Form } from "react-bootstrap";
import { ArrowLeftCircleFill, ArrowRightCircleFill } from "react-bootstrap-icons";
import SearchResultPost from "../../Search/SearchSubComponents/SearchResultPost";
import './Comment.css';
import Comment from './Comment';
import jwt_decode from "jwt-decode";

function CommentList(props) {
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
            .get(`https://localhost:5001/api/v1/getPostCommentsPaginated/${props.postId}/${10}/${count}`)
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
                console.log(posts);
            })
            .catch((error) => {
                setLoading(false);
                setPosts(null);
                document.getElementById("errorMessage").innerHTML = "No more comments found!"
                console.log(error);
            });
    };
    

    const GenerateComments = () => {
        if (posts !== null) {
            return (posts.map((comment) => (
                <div key={comment.id}>
                    <Comment
                        userId={comment.userId}
                        content={comment.content}
                        created={comment.created}
                        authorName={comment.authorName}
                        authorAvatar={comment.authorAvatar}
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


    const GenerateCommentForm = () => {
        let token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt_decode(token);
            return (
                <div>
                    <Form className="d-flex">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ width: '100%' }}>
                            <Form.Control as="textarea" rows={3} resize="none" style={{ resize: 'none' }}
                                value={content}
                                onChange={e => setContent(e.target.value)} />
                        </Form.Group>
                    </Form>
                    <ButtonGroup>
                        <Button variant="outline-success" style={{ marginTop: '-0.5em', marginBottom: '1em'}} type="submit" onClick={handleSubmit}>Add comment</Button>
                    </ButtonGroup>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Form className="d-flex">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ width: '100%' }}>
                            <Form.Control as="textarea" rows={3} resize="none" style={{ resize: 'none' }}
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                disabled
                                placeholder="Only logged users can comment posts." />
                        </Form.Group>
                    </Form>
                    <Button variant="outline-success" style={{ marginTop: '-0.5em', marginBottom: '1em' }} type="submit" onClick={handleSubmit} disabled>Add comment</Button>
                </div>
            );
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
            <Col>
                <div className="comments-header">Comments</div>
                <div id="commentErrorMessage" style={{ color: 'red' }}></div>
                {GenerateCommentForm()}
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
        );
    }
}
export default CommentList;
