import { Component } from "react";
import { Button, ButtonGroup } from 'react-bootstrap'
import { ArrowLeftCircleFill, ArrowRightCircleFill } from "react-bootstrap-icons";
import PostHorizontal from "../../Home/PostsContainers/SinglePostComponent/PostHorizontal";

function GetPostsForSearchResult(postAmount, pageNumber) {
    const list = [];
    for (let index = 0; index < postAmount; index++) {
        list.push(
            <PostHorizontal
                title={"Search post"}
                desc={"Lorem ipsum is dolores this is test sratatata"}
                upvoteCount={1}
                commentCount={3}
                authorName={"Jonas McŁowicz"}
                dateCreated={"21/04/2021"}
                postPic={"https://media.istockphoto.com/photos/hotair-balloons-picture-id619250406?b=1&k=20&m=619250406&s=170667a&w=0&h=yijHjU0GTp5zFl5WjrAxYguoXTa37p3lLiehWK15Bx4="}
                authorPic={"https://prsmeble.pl/wp-content/uploads/2013/10/300x201xperson.jpg.pagespeed.ic.jkTJYjUU9H.webp"}
                hashtags={["one", "two", "three"]}
                showInfo={true}
            />);
    }
    return list;
}

class SearchedPostsWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedPhrase: "",
            pageNumber: 1
        };
        this.increment = this.increment.bind(this);
    }
    increment = () => {
        this.setState({ pageNumber: this.state.pageNumber + 1 })
        console.log(this.state.pageNumber + 0);
    }

    decrement = () => {
        if (this.state.pageNumber > 1) {
            this.setState({ pageNumber: this.state.pageNumber - 1 })
        }
        console.log(this.state.pageNumber + 0);
    }
    render() {
        return (
            <div>
                <div>{GetPostsForSearchResult(5, this.props.pageNumber)}</div>
                <div className="search-pagination">
                    <ButtonGroup style={{marginBottom: '1em'}}>
                        <Button variant="outline-success" onClick={this.decrement}><ArrowLeftCircleFill /></Button>
                        <div className="color-info-container search-page-number" >{this.state.pageNumber}</div>
                        <Button variant="outline-success" onClick={this.increment}><ArrowRightCircleFill /></Button>
                    </ButtonGroup>
                </div>
            </div>);
    }
}

export default SearchedPostsWrapper;