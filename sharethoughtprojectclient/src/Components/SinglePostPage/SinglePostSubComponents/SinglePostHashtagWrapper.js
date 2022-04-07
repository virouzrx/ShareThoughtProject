const SinglePostHashtagWrapper = (props) => {
    if (props.mainHashtags !== undefined) {
        return (
            <div className="singlepost-hashtag-wrapper">
                {props.mainHashtags.map((hashtag) => (
                    <div key={hashtag.id} className="creator-hashtag">{hashtag.hashtagName}</div>))}
            </div>
        );
    }
    else {
        return (<p></p>)
    }
}

export default SinglePostHashtagWrapper;