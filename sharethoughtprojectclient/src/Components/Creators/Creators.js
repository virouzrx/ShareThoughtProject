import { Component, useEffect, useState } from "react";
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { ArrowLeftCircleFill, ArrowRightCircleFill } from "react-bootstrap-icons";
import axios from "axios";
import SearchResultUser from '../Search/SearchSubComponents/SearchResultUser';
import './Creators.css'
import HashLoader from "react-spinners/HashLoader";


function Creators() {
    const [count, setCount] = useState(1);
    const [creators, setPosts] = useState([{}]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getSearchResult();
    }, [count]);

    useEffect(() => {
        getSearchResult();
    }, [count]);

    const getSearchResult = () => {
        setLoading(true);
        axios
            .get(`https://localhost:5001/api/v1/users/creators/${10}/${count}`)
            .then((response) => {
                setPosts(response.data);
                setLoading(false);
                document.getElementById("errorMessage").innerHTML = "";
                console.log(creators);
            })
            .catch((error) => {
                setLoading(false);
                setPosts(null);
                document.getElementById("errorMessage").innerHTML = "No creators found!"
                console.log(error);
            });
    };

    const decrement = () => {
        if (count === 1) {
            return 0;
        }
        else {
            setCount(count - 1);
        }
    }

    const increment = () => {
        if (creators === null) {
            return 0;
        }
        else {
            setCount(count + 1);
        }
    }

    const GenerateUsers = () => {
        if (creators !== null) {
            return (creators.map((creatorInfo) => (
                <Col>
                    <div key={creatorInfo.id}>
                        <SearchResultUser
                            title={creatorInfo.title}
                            desc={creatorInfo.description}
                            postScore={creatorInfo.postScore}
                            commentCount={creatorInfo.commentScore}
                            role={creatorInfo.role}
                            postAmount={creatorInfo.postAmount}
                            username={creatorInfo.userName}
                            dateCreated={creatorInfo.created}
                            imagePath={creatorInfo.avatarPath}
                            authorPic={creatorInfo.authorProfilePic}
                            joined={creatorInfo.joined}
                            hashtags={1}
                            showInfo={true}
                        />
                    </div>
                </Col>)))
        }
        else {
            return <p></p>
        }
    }

    if (isLoading) {
        return <div className="App">
            <div style={{ marginLeft: '-2em', textAlign: 'center', marginTop: '5em', opacity: '0.9' }}>
                <HashLoader color='#198754' loading={true} size={70} />
            </div>
        </div>;
    }
    else {
        return (
            <div>
                {GenerateUsers()}
                <div className="search-pagination">
                    <p id="errorMessage" style={{ marginBottom: '1em' }}></p>
                    <ButtonGroup style={{ marginBottom: '1em' }}>
                        <Button variant="outline-success" onClick={() => decrement()}><ArrowLeftCircleFill /></Button>
                        <div className="color-info-container search-page-number" >{count}</div>
                        <Button variant="outline-success" onClick={() => increment()}><ArrowRightCircleFill /></Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export default Creators;
