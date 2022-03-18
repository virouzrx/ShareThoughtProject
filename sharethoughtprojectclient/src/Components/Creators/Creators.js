import { Component } from "react";
import { Route, Routes } from 'react-router-dom';
import NewCreatorsWrapper from "./NewCreatorsWrapper";
import TopCreatorsWrapper from "./TopCreatorsWrapper";
import PopularCreatorsWrapper from "./PopularCreatorsWrapper";
import { ButtonGroup, Button, Container } from "react-bootstrap";
import './Creators.css'
import SuggestedCreatorsWrapper from "./SuggestedCreatorsWrapper";

function CheckForCurrentPath(path){
    return window.location.pathname.toLocaleLowerCase().includes(path) ? 'creators-current ' : '';
}

class Creators extends Component {
    constructor(props) {
        super(props);
        console.log(window.location.pathname)
    }

    render() {
        return (<div>
            <Container>
                <div className="feed-button-group">
                    <ButtonGroup aria-label="Basic example">
                        <Button className={CheckForCurrentPath("new")} variant="outline-success feed" href="/creators/new">New</Button>
                        <Button className={CheckForCurrentPath("popular")} variant="outline-success feed" href="/creators/popular">Popular</Button>
                        <Button className={CheckForCurrentPath("top")} variant="outline-success feed" href="/creators/top">Top</Button>
                        <Button className={CheckForCurrentPath("suggested")} variant="outline-success feed" href="/creators/suggested">Choosed for you</Button>
                    </ButtonGroup>
                </div>

                <Routes>
                    <Route path="popular" element={<PopularCreatorsWrapper />} />
                    <Route path="popular/:id" element={<PopularCreatorsWrapper />} />
                    <Route path="top" element={<TopCreatorsWrapper />} />
                    <Route path="top/timesort" element={<TopCreatorsWrapper />} />
                    <Route path="new/:id" element={<NewCreatorsWrapper />}/>
                    <Route path="new" element={<NewCreatorsWrapper />}/>
                    <Route path="suggested" element={<SuggestedCreatorsWrapper />} />
                    <Route path="suggested/:id" element={<SuggestedCreatorsWrapper />} />
                    <Route exact path="/" element={<NewCreatorsWrapper />} />
                </Routes>
            </Container>
        </div>);
    }
}


export default Creators;