import { Component } from "react";
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import SearchResultUser from "./SearchResultUser";
import '../Search.css';
import { Routes, Route } from "react-router-dom";
import Home from "../../Home/Home";
import Comment from "../../SinglePostPage/Comments/Comment";

function GeneratePaginationButtons(pageNumber, phrase) {
    const list = [];
    if (pageNumber === 1 || pageNumber === 2) {
        for (let index = 0; index < 5; index++) {
            if (index + 1 === pageNumber) {
                list.push(<Button variant="outline-success" className="current-page-button pagination-button" href={`${window.location.pathname}/${index + 1}`}>{index + 1}</Button>)
            }
            else {
                list.push(<Button variant="outline-success" className="pagination-button" href={`${window.location.pathname}/${index + 1}`}>{index + 1}</Button>)
            }
        }
        return <ButtonGroup>{list}</ButtonGroup>
    }
    else if (pageNumber >= 3) {
        list.push(<Button variant="outline-success" className="pagination-button" href={`${window.location.pathname}/${1}`}>1</Button>)
        list.push(<p className="multidot">...</p>)
        for (let index = 0; index < 3; index++) {
            if (pageNumber + index === pageNumber) {
                list.push(<Button variant="outline-success" className="current-page-button pagination-button" href={`${window.location.pathname}/${pageNumber + index}`}>{pageNumber + index}</Button>)
            }
            else {
                list.push(<Button variant="outline-success" className="pagination-button" href={`${window.location.pathname}/${pageNumber + index}`}>{pageNumber + index}</Button>)
            }
        }
        return <ButtonGroup>{list}</ButtonGroup>
    }
}

function GetUserForSearchResult(postAmount, pageNumber) {
    const list = [];
    for (let index = 0; index < postAmount; index++) {
        list.push(<SearchResultUser></SearchResultUser>);
    }
    return list;
}

class SearchedUserWrapper extends Component {
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

    render() {
        return (<div>
            {GetUserForSearchResult(5, this.props.pageNumber)}
            <Button onClick={this.increment}> Current page {this.state.pageNumber}</Button>
            <div className="search-pagination-wrapper">
                {GeneratePaginationButtons(this.state.pageNumber, this.props.searchedPhrase)}
            </div>
            <Routes>
                <Route path="users/:number" element={<Comment />} />
                <Route path="/" element={<Comment />} />
            </Routes>
        </div>);
    }
}

export default SearchedUserWrapper;
