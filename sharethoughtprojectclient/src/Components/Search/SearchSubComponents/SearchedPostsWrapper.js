import { Component } from "react";
import { Button } from 'react-bootstrap'

function GetPostsForSearchResult(postAmount, pageNumber) {
    const list = [];
    for (let index = 0; index < postAmount; index++) {
        list.push();
    }
    return list;
}

class SearchedPostsWrapper extends Component {
    
    render() {
        return (
            <div>
                <div>{GetPostsForSearchResult(5, this.props.pageNumber)}/</div>
                <Button>dupa</Button>
            </div>);
    }
}

export default SearchedPostsWrapper;