import './Creators.css';

const CreatorHashtagWrapper = (props) => {
    return (  
        <div className="creators-hashtag-wrapper">
        {[...Array(props.mainHashtags.length)].map((x, i) =>
            <div key={i} class="creator-hashtag">{props.mainHashtags[i]}</div>
        )}
    </div>
    );
}
 
export default CreatorHashtagWrapper;