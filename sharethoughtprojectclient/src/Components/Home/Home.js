import PostsCarousel from "./PostsContainers/PostsCarousel";
import { Container } from 'react-bootstrap'
import { Component } from 'react';
import HorizontalPostList from "./PostsContainers/HorizontalPostList";
import './Home.css';
import { Button } from "react-bootstrap";


class Home extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                
                {/*first carousel*/}
                <Container>
                    <h2 className='carousel-header'>Popular today</h2>
                    <hr className="mb-5" />
                </Container>
                <PostsCarousel/>
                {/*second carousel*/}
                <Container>
                    <h2 className='carousel-header'>Top posts this week</h2>
                    <hr className="mb-5" />
                </Container>
                <PostsCarousel/>
                {/*list of new posts*/}
                <Container>
                    <h2 className='carousel-header'>New posts</h2>
                    <hr className="mb-5" />
                </Container>
                <HorizontalPostList postAmount={3}/>
            </div>);
    }
}

export default Home;