import { Col, Button } from 'react-bootstrap'
import PostHorizontal from '../PostsContainers/SinglePostComponent/PostHorizontal';
import { Link } from 'react-router-dom';

function HorizontalPostList() {
    const list = []
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
            hashtags: ['travels', 'stuff', 'tag']

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
            hashtags: ['travels', 'stuff', 'tag']
        },
    ];

    for (let i = 0; i < 3; i++) {
        list.push(
            <div>
                <Col>
                    <PostHorizontal
                        title={ffs[0].title}
                        desc={ffs[0].desc}
                        upvoteCount={ffs[0].upvoteCount}
                        commentCount={ffs[0].commentCount}
                        authorName={ffs[0].authorName}
                        dateCreated={ffs[0].dateCreated}
                        postPic={ffs[0].postPic}
                        authorPic={ffs[0].authorPic}
                        hashtags={ffs[0].hashtags}
                    />
                </Col>
            </div>
        )
    }
    return (
        <div className="container">
            {list}
            <Button variant="outline-success navbar-button new-posts-button-redirect" href="/posts/new">More new posts</Button>
        </div>);
}
export default HorizontalPostList;