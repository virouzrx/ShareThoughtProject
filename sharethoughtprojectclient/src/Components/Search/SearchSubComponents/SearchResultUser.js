import { Component } from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import '../Search.css';

class SearchResultUser extends Component {

    render() {
        {console.log(this.props.CurrentPage)}
        return (
            <div className="user-searchresult">
                {this.props.CurrentPage}
            </div>);
    }
}

export default SearchResultUser;