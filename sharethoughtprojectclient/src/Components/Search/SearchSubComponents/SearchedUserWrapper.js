import { Component } from "react";
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import SearchResultUser from "./SearchResultUser";
import '../Search.css';


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

class SearchedUserWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedPhrase: "",
            pageNumber: 1
        };
        this.increment = this.increment.bind(this);
    }

    GetUserForSearchResult = (postAmount, pageNumber) => {
        const list = [];
        for (let index = 0; index < postAmount; index++) {
            list.push(<SearchResultUser CurrentPage={pageNumber}></SearchResultUser>);
        }
        return list;
    }

    increment = () => {
        this.setState({ pageNumber: this.state.pageNumber + 1 })
        console.log(this.state.pageNumber + 0);
    }

    render() {
        return (<div>
            {this.GetUserForSearchResult(5, this.state.pageNumber)}
            <Button onClick={this.increment}> Current page {this.state.pageNumber}</Button>
        </div>);
    }
}

export default SearchedUserWrapper;
