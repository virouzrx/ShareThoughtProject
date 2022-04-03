import { Col, Button } from 'react-bootstrap'
import PostHorizontal from '../PostsContainers/SinglePostComponent/PostHorizontal';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ExtractHashtagsFromObject(object) {
    let list = [];
    object.map(ht => {
        list.push(ht);
    })
    return list;
}

function HorizontalPostList(props) {
    const [posts, setPosts] = useState([{}]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAllNodes();
    }, []);


    var body = {
        PageSize: 3,
        PageNumber: 1
    };

    const getAllNodes = () => {
        axios.get("https://localhost:5001/api/v1/posts/" + props.endpoint + `/${props.pageSize}/${props.PageNumber}`).then((response) => {
            setPosts(response.data);
            setLoading(false);
            console.log(posts);
        });
    };

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    return (
        <>
            <div>
                <div className="container">
                    {posts.map((postInfo) => (
                        <Col>
                            <div key={postInfo.id}>
                                <PostHorizontal
                                    id={postInfo.id}
                                    title={postInfo.title}
                                    desc={postInfo.description}
                                    upvoteCount={postInfo.score}
                                    commentCount={ExtractHashtagsFromObject(postInfo.comments)}
                                    authorName={postInfo.authorName}
                                    dateCreated={postInfo.created}
                                    imagePath={postInfo.imagePath}
                                    authorPic={postInfo.authorProfilePic}
                                    comments={postInfo.comments}
                                    created={postInfo.created}
                                    hashtags={ExtractHashtagsFromObject(postInfo.hashtags)}
                                    showInfo={true}
                                />
                            </div>
                        </Col>))}
                </div>
            </div>
        </>

    )
}
export default HorizontalPostList;

