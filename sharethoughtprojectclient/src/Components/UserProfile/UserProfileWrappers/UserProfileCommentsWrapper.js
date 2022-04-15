import axios from "axios";
import { useEffect, useState } from "react";
import UserProfileUserSingleComment from "../UserProfileSubComponents/UserProfileUserSingleComment";
import jwt_decode from "jwt-decode";

const CommentList = (props) => {
    const [count, setCount] = useState(1);
    const [comments, setComments] = useState([{}]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getSearchResult();
    }, [count]);

    useEffect(() => {
        getSearchResult();
    }, [count]);

    const getSearchResult = () => {
        setLoading(true);
        const decoded = jwt_decode(localStorage.getItem("token"));
        axios
            .get(`https://localhost:5001/api/v1/comments/user/${decoded.id}`)
            .then((response) => {
                setComments(response.data);
                setLoading(false);
                console.log(comments);
            })
            .catch((error) => {
                setLoading(false);
                setComments(null);
                console.log(error);
            });
    };

    const GenerateComments = () => {
        if (comments !== null) {
            return (comments.map((comment) => (
                <div key={comment.id}>
                    <UserProfileUserSingleComment
                        content={comment.content}
                        title={comment.postTitle}
                        postId={comment.postId}
                    />
                </div>
            )))
        }
        else {
            return <p></p>
        }
    }

    if (isLoading) {
        return (<p>loading</p>);
    }
    else {
        return (
            <div>
                <div>
                    {GenerateComments()}
                </div>
            </div>
        );
    }

}

export default CommentList;
