import { Component } from "react";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import '../Search.css';

class SearchResultUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false
        };
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                isMobile: window.innerWidth < 800
            });
        }, false);
    }

    render() {
        var date = new Date(this.props.joined)
        var stringifiedDate = date.toLocaleDateString("es-PE");
        return (
            <div className="user-searchresult" style={{textDecoration: 'none'}}>
                <a href="/user/1" className="hyperlink-card">
                    <Row>
                        <Col className="searchresult-user-avatar-col"><img className="commentor-pic" src={`data:image/jpeg;base64,${this.props.imagePath}`} /></Col>
                        <Col>
                            <Row className="search-result-username" xs={6}>{this.props.username}</Row>
                            <Row className="user-searchresult-date">{stringifiedDate}</Row>
                            <Row className="user-searchresult-type"><div className="color-info-container user">{this.props.role}</div></Row>
                        </Col>
                        <Col>
                            <ButtonGroup aria-label="Basic example" className="user-stats" vertical={!this.state.isMobile} style={{ textAlign: 'left' }}>
                                <div className="color-info-container like-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                                    </svg><span className="votes-count">{this.props.postScore}</span>
                                </div>
                                <div className="color-info-container comment-amount-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="bi bi-chat-left-fill icon-placement adjusted-icon-placement" viewBox="0 0 16 16">
                                        <path
                                            d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                    </svg><span>{this.props.commentCount}</span>
                                </div>
                                <div className="color-info-container post-amount-block">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-body-text" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5Zm0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Z" />
                                    </svg><span className="votes-count">{this.props.postAmount}</span>
                                </div>
                            </ButtonGroup>
                        </Col>
                        <Col>
                            {this.props.description}
                        </Col>
                    </Row >
                </a >
            </div >);
    }
}

export default SearchResultUser;