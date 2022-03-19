const SinglePostHashtagWrapper = (props) => {
    return (
    <div className="singlepost-hashtag-wrapper">
        {[...Array(props.mainHashtags.length)].map((x, i) =>
            <div key={i} className="creator-hashtag">{props.mainHashtags[i]}</div>
        )}
    </div>
    );
}

export default SinglePostHashtagWrapper;