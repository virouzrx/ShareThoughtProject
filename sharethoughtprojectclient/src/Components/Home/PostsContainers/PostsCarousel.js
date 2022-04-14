import * as bootstrap from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import PostCard from './SinglePostComponent/PostCard.js'
import "react-multi-carousel/lib/styles.css";
import '../../Home/Home.css';
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
        <div className="carousel-button-group">
            <Button variant="outline-success" className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} ><ArrowLeftCircleFill /></Button>
            <Button variant="outline-success" onClick={() => next()} ><ArrowRightCircleFill /></Button>
        </div>
    );
};

function ExtractHashtagsFromObject(object) {
    let list = [];
    object.map(ht => {
        list.push(ht);
    })
    return list;
}

function PostsCarousel(props) {
    const [posts, setPosts] = useState([{}]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAllNodes();
    }, []);

    const getAllNodes = () => {
        axios.get("https://localhost:5001/api/v1/posts/" + props.endpoint).then((response) => {
            setPosts(response.data);
            setLoading(false);
            console.log(posts);
        });
    };


    if (isLoading) {
        return <div className="App">
            <div style={{ marginLeft: '-2em', textAlign: 'center', marginTop: '5em', opacity: '0.9' }}>
                <HashLoader color='#198754' loading={true} size={70} />
            </div>
        </div>;
    }
    return (
        <>
            <div>

                <div className="container">
                    <Row>
                        <Carousel
                            responsive={responsive}
                            arrows={false}
                            renderButtonGroupOutside={true}
                            customButtonGroup={<ButtonGroup />}
                            style={{ border: "1px solid" }}
                            infinite={true}>
                            {posts.map((postInfo) => (
                                <Col>
                                    <PostCard
                                        key={postInfo.id}
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
                                        showInfo={true}>
                                    </PostCard>
                                </Col>))}
                        </Carousel>
                    </Row>
                </div>

            </div>
        </>

    );
}

export default PostsCarousel;
