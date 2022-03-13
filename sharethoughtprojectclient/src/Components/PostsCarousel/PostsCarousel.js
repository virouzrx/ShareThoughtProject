import * as bootstrap from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Post from '../Post/Post.js'
import "react-multi-carousel/lib/styles.css";
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';

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
            <Button variant="outline-success" className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} ><ArrowLeftCircleFill/></Button>
            <Button variant="outline-success" onClick={() => next()} ><ArrowRightCircleFill/></Button>
        </div>
    );
};
function PostsCarousel() {

    const list = []
    const products = ['orange', 'apple', 'watermelon', 'aaaaa'];
    const ffs = [
        {
            title: 'Title',
            desc: 'Lorem ipsum is dolores kurwo działaj',
            upvoteCount: 52,
            commentCount: 21,
            authorName: 'Carl Klaasje',
            dateCreated: new Date(2021, 5, 12),
            authorPic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
            postPic: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
            hashtags:  ['travels', 'stuff', 'tag']

        },
        {
            title: 'title',
            desc: 'desc',
            upvoteCount: 52,
            commentCount: 21,
            authorName: 'Carl Klaasje',
            dateCreated: new Date(2021, 5, 12),
            authorPic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
            postPic: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg',
            hashtags:  ['travels', 'stuff', 'tag']
        },
    ];

    for (const [i, product] of products.entries()) {
        list.push(<div>
            <Col>
                <Post 
                title={ffs[0].title} 
                desc={ffs[0].desc}
                upvoteCount={ffs[0].upvoteCount}
                commentCount={ffs[0].commentCount}
                authorName={ffs[0].authorName}
                dateCreated={ffs[0].dateCreated}
                postPic ={ffs[0].postPic}
                authorPic={ffs[0].authorPic}
                hashtags = {ffs[0].hashtags}
                ></Post>{//todo - wrap it into model
                        }
            </Col>
        </div>)
    }


    return (
        <div className="container">
            <Row>
                <Carousel responsive={responsive} arrows={false} renderButtonGroupOutside={true} customButtonGroup={<ButtonGroup />} interval={false}>
                    {list}
                </Carousel>
            </Row>
        </div>);
}

export default PostsCarousel;
