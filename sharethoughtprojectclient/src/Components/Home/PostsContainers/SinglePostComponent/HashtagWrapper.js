import '../../../Home/Home.css';

function HashtagWrapper(props) {
    return (
        <div class="hashtag-wrapper">
            {[...Array(props.hashtags.length)].map((x, i) =>
                <div key={i} class="hashtag">{props.hashtags[i]}</div>
            )}
        </div>);
}

export default HashtagWrapper;