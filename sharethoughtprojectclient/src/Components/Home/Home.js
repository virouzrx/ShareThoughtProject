import PostsCarousel from "./PostsContainers/PostsCarousel";
import { Container } from 'react-bootstrap'
import { Component } from 'react';
import HorizontalPostList from "./PostsContainers/HorizontalPostList";
import './Home.css';
import { Button } from "react-bootstrap";

const Home = () => {
    return (
        <div>
            {/*first carousel*/}
            <Container>
                <h2 className='carousel-header'>Popular today</h2>
                <hr className="mb-5" />
            </Container>
            <PostsCarousel endpoint="populartoday" />
            {/*second carousel*/}
            <Container>
                <h2 className='carousel-header'>Top posts this week</h2>
                <hr className="mb-5" />
            </Container>
            <PostsCarousel endpoint="topthisweek" />
            {/*list of new posts*/}
            <Container>
                <h2 className='carousel-header'>New posts</h2>
                <hr className="mb-5" />
            </Container>
            <HorizontalPostList postAmount={3} pageSize={3} pageNumber={1} endpoint="new" />
            <Container>
                <Button variant="outline-success navbar-button new-posts-button-redirect" href="/posts/new">More new posts</Button>
            </Container>
        </div>);
}

export default Home;