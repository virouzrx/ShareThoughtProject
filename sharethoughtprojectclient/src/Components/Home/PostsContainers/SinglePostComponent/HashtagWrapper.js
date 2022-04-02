import '../../../Home/Home.css';

function HashtagWrapper(props) {
    
    return (
        <div className="hashtag-wrapper">
            {[...Array(props.hashtags.length)].map((x, i) =>
                <div key={i} className="hashtag">{props.hashtags[i].hashtagName}</div>
            )}
        </div>);
}

export default HashtagWrapper;